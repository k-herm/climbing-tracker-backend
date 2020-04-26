const {
  climbsGradeAttemptCountsAgg,
  getClimbsAgg,
  totalVerticalClimbsAgg,
  totalDaysClimbsAgg,
  totalPitchesClimbsAgg
} = require('./climb.queries')
const {
  attemptsProjectCountsAgg,
  attemptsToProjectsAgg,
  totalVerticalAttemptsAgg,
  totalDaysAttemptsAgg,
  totalPitchesAttemptsAgg,
} = require('./attempt.queries')

const {
  getHigherGrade,
  sortArrayOfObjectsByGrade,
  getMidMonthDate,
  addOneMonth,
  getGradeCategories
} = require('./utils')

const getNumericStatsData = (userId, date) => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const thisYear = new Date(year, 1, 1)
  const thisMonth = new Date(year, month, 1)

  const totalVerticalClimbs = totalVerticalClimbsAgg(userId)
  const totalDaysClimbs = totalDaysClimbsAgg(userId, thisYear)
  const totalPitchesClimbs = totalPitchesClimbsAgg(userId, thisMonth)
  const redpointGradesClimbs = getClimbsAgg(userId, {
    _id: 0,
    grade: 1
  }, {
    send: true,
    attempt: { $not: /Top Rope/ }
  })

  const totalVerticalAttempts = totalVerticalAttemptsAgg(userId)
  const totalDaysAttempts = totalDaysAttemptsAgg(userId, thisYear)
  const totalPitchesAttempts = totalPitchesAttemptsAgg(userId, thisMonth)
  const redpointGradesAttempts = attemptsToProjectsAgg(userId, {
    _id: 0,
    grade: 1
  }, {
    send: true,
    attemptType: { $not: /Top Rope/ }
  })



  return Promise.all([
    totalVerticalClimbs,
    redpointGradesClimbs,
    totalDaysClimbs,
    totalPitchesClimbs,
    totalVerticalAttempts,
    redpointGradesAttempts,
    totalDaysAttempts,
    totalPitchesAttempts
  ])
}

const getNumericStatistics = async (userId, date) => {
  const result = await getNumericStatsData(userId, date)

  const totalVerticalClimbs = result[0][0].totalLengthSum
  const redpointGradesClimbs = result[1]
  sortArrayOfObjectsByGrade(redpointGradesClimbs, 'grade')
  const highestRedpointClimbs = redpointGradesClimbs.length && redpointGradesClimbs[redpointGradesClimbs.length - 1].grade
  const totalDaysClimbs = result[2][0].totalDaysSum
  const totalPitchesClimbs = result[3][0].totalPitchesSum


  const totalVerticalAttempts = result[4][0].totalLengthSum
  const redpointGradesAttempts = result[5]
  sortArrayOfObjectsByGrade(redpointGradesAttempts, 'grade')
  const highestRedpointAttempts = redpointGradesAttempts.length && redpointGradesAttempts[redpointGradesAttempts.length - 1].grade
  const totalDaysAttempts = result[6][0].totalDaysSum
  const totalPitchesAttempts = result[7][0].totalPitchesSum

  const data = {
    totalVertical: totalVerticalClimbs + totalVerticalAttempts,
    highestRedpointGrade: getHigherGrade(highestRedpointClimbs, highestRedpointAttempts) || null,
    totalDaysThisYear: totalDaysClimbs + totalDaysAttempts,
    pitchesThisMonth: totalPitchesClimbs + totalPitchesAttempts
  }

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
    routeStyle: 1,
    climbStyle: 1,
    attempt: '$attemptType',
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