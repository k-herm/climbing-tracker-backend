const {
  climbsGradeAttemptCountsAgg,
  getClimbsAgg
} = require('./climb.queries')
const {
  attemptsProjectCountsAgg,
  attemptsToProjectsAgg
} = require('./attempt.queries')

const {
  dateString,
  isThisMonth,
  getHigherGrade,
  sortArrayOfObjectsByGrade,
  getMidMonthDate,
  addOneMonth,
  getGradeCategories
} = require('./utils')

// so far looping through data is faster than 8 agg queries
const getNumericStatistics = (climbs, projects, attempts, date) => {
  const data = {
    totalVertical: 0,
    highestRedpointGrade: '',
    totalDaysThisYear: 0,
    pitchesThisMonth: 0
  }

  const todaysDate = new Date(date)
  const totalCalendarDays = []
  const thisYear = todaysDate.getFullYear()

  const getNumberPitches = (arr) =>
    arr.reduce((acc, curr) => acc + curr.numberPitches, 0)

  const isNewDate = (date) =>
    date.getFullYear() === thisYear && !totalCalendarDays.includes(dateString(date))


  climbs.forEach(climb => {
    const climbDate = new Date(climb.completedDate)
    //vertical
    data.totalVertical += climb.totalLength
    //days
    if (isNewDate(climbDate)) {
      totalCalendarDays.push(dateString(climbDate))
      data.totalDaysThisYear += 1
    }
    //pitches
    if (isThisMonth(climbDate, todaysDate)) {
      data.pitchesThisMonth += getNumberPitches(climb.pitches)
    }
    //redpoint
    if (climb.send && climb.attempt !== 'Top Rope') {
      data.highestRedpointGrade = getHigherGrade(data.highestRedpointGrade, climb.grade)
    }
  })

  projects.forEach(project => {
    const projectPitches = getNumberPitches(project.pitches)
    if (project.completedDate) {
      //redpoint
      data.highestRedpointGrade = getHigherGrade(data.highestRedpointGrade, project.grade)
    }

    const totalAttempts = attempts.filter(attempt =>
      attempt.projectId.toString() === project._id.toString()
    )
    //vertical
    data.totalVertical += totalAttempts.length * project.totalLength
    totalAttempts.forEach(attempt => {
      const attemptDate = new Date(attempt.date)
      //days
      if (isNewDate(attemptDate)) {
        totalCalendarDays.push(dateString(attemptDate))
        data.totalDaysThisYear += 1
      }
      //pitches
      if (isThisMonth(attemptDate, todaysDate)) {
        data.pitchesThisMonth += projectPitches
      }
    })
  })

  data.highestRedpointGrade =
    data.highestRedpointGrade === '' ? null : data.highestRedpointGrade

  return data
}

const getGradesChartData = (userId) => {
  const climbsAgg = climbsGradeAttemptCountsAgg(userId)
  const attemptsAgg = attemptsProjectCountsAgg(userId)
  return Promise.all([climbsAgg, attemptsAgg])
}

const getGradesChart = async (userId) => {
  const results = await getGradesChartData(userId)
  const climbsAgg = results[0]
  const attemptsAgg = results[1]

  const projectsAgg = attemptsAgg.map((project) => ({
    grade: project.projectData[0].grade,
    count: project.count,
    attempts: project.attempts.map((attempt) => {
      const send = attempt.send.find(bool => bool._id === true)
      return {
        attemptType: attempt._id,
        count: attempt.count,
        sendCount: send ? send.count : 0
      }
    })
  }))

  const gradesChart = climbsAgg.map(grade => ({
    grade: grade._id,
    count: grade.count,
    attempts: grade.attempts.map(attempt => {
      const send = attempt.send.find(bool => bool._id === true)
      return {
        attemptType: attempt._id,
        count: attempt.count,
        sendCount: send ? send.count : 0
      }
    })
  }))

  projectsAgg.forEach((project) => {
    const climb = gradesChart.find((grade) => project.grade === grade.grade)
    if (climb) {
      climb.count += project.count
      project.attempts.forEach((attempt) => {
        const foundAttempt = climb.attempts.find((type) => type.attemptType === attempt.attemptType)
        if (foundAttempt) {
          foundAttempt.count += attempt.count
          foundAttempt.sendCount += attempt.sendCount
        } else {
          climb.attempts.push(attempt)
        }
      })
    } else {
      gradesChart.push(project)
    }
  })

  sortArrayOfObjectsByGrade(gradesChart, 'grade')
  const highestCount = gradesChart.reduce((highest, curr) => (
    curr.count > highest ? curr.count : highest
  ), 0)

  return {
    chartData: gradesChart,
    otherData: {
      highestCount,
      gradeRange: getGradeCategories(gradesChart)
    }
  }
}

const getDateCategories = (climbsData, projectData) => {
  const firstClimbsDate = climbsData.length && climbsData[0].date
  const lastClimbsDate = climbsData.length && climbsData[climbsData.length - 1].date
  const firstProjectDate = projectData.length && projectData[0].date
  const lastProjectDate = projectData.length && projectData[projectData.length - 1].date

  let firstDate
  let lastDate
  if (firstClimbsDate && firstProjectDate) {
    firstDate = firstClimbsDate < firstProjectDate ? firstClimbsDate : firstProjectDate
  } else if (firstClimbsDate) {
    firstDate = firstClimbsDate
  } else {
    firstDate = firstProjectDate
  }
  if (lastClimbsDate && lastProjectDate) {
    lastDate = lastClimbsDate > lastProjectDate ? lastClimbsDate : lastProjectDate
  } else if (lastClimbsDate) {
    lastDate = lastClimbsDate
  } else {
    lastDate = lastProjectDate
  }

  const dateRange = []
  let currDate = getMidMonthDate(firstDate)
  const endDate = getMidMonthDate(lastDate)

  while (currDate <= endDate) {
    dateRange.push(currDate)
    currDate = addOneMonth(currDate)
  }
  dateRange.push(currDate)

  return dateRange
}

const getClimbStyleChartData = (userId, filter) => {
  const climbsData = getClimbsAgg(userId, {
    _id: 0,
    grade: 1,
    date: '$completedDate',
    routeStyle: 1,
    climbStyle: 1,
    attempt: 1,
    send: 1
  }, filter)

  const projectData = attemptsToProjectsAgg(userId, {
    _id: 0,
    grade: 1,
    date: 1,
    send: 1,
  }, filter)

  return Promise.all([climbsData, projectData])
}

const getClimbStyleChart = async (userId, filter) => {
  const results = await getClimbStyleChartData(userId, filter)
  const climbsData = results[0]
  const projectData = results[1]

  const allData = climbsData.concat(projectData)

  let dateRange = []
  if (allData.length) {
    dateRange = getDateCategories(climbsData, projectData)
  }

  sortArrayOfObjectsByGrade(allData, 'grade')
  const gradeRange = allData.length ? getGradeCategories(climbsData) : []
  const tradData = allData.filter(climb => climb.climbStyle === 'Trad')
  const sportData = allData.filter(climb => climb.climbStyle === 'Sport')

  return {
    chartData: {
      sport: sportData,
      trad: tradData,
    },
    otherData: {
      dateRange,
      gradeRange
    }
  }
}

module.exports = {
  getNumericStatistics,
  getGradesChart,
  getClimbStyleChart
}