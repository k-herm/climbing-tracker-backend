const { climbsGradeAttemptCountsAgg } = require('./climb.queries')
const { attemptsProjectCountsAgg } = require('./attempt.queries')

const {
  dateString,
  isThisMonth,
  getHigherGrade,
  sortArrayOfObjectsByGrade
} = require('./utils')

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

const getGradesChart = async (userId) => {
  const climbsAgg = await climbsGradeAttemptCountsAgg(userId)
  const attemptsAgg = await attemptsProjectCountsAgg(userId)

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
    gradesChart,
    otherData: { highestCount }
  }
}

const getClimbStyleChart = (climbs, projects, attempts) => {
  const yearRange = []
  const climbsData = climbs.map(climb => {
    const year = climb.completedDate.getFullYear()
    if (!yearRange.includes(year)) {
      yearRange.push(year)
    }
    return ({
      grade: climb.grade,
      date: climb.completedDate,
      routeStyle: climb.routeStyle,
      climbStyle: climb.climbStyle,
      attempt: climb.attempt,
      send: climb.send
    })
  })

  projects.forEach(project => {
    const projectAttempts = attempts.filter(attempt =>
      attempt.projectId.toString() === project._id.toString()
    )
    projectAttempts.forEach(attempt => {
      const year = attempt.date.getFullYear()
      if (!yearRange.includes(year)) {
        yearRange.push(year)
      }
      climbsData.push({
        grade: project.grade,
        date: attempt.date,
        routeStyle: project.routeStyle,
        climbStyle: project.climbStyle,
        attempt: attempt.attemptType,
        send: attempt.send
      })
    })
  })

  return {
    climbStyleChart: climbsData.sort((a, b) => a.date - b.date),
    otherData: { yearRange }
  }
}

module.exports = {
  getNumericStatistics,
  getGradesChart,
  getClimbStyleChart
}