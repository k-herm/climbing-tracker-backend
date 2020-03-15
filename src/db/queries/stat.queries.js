const sortGrades = (gradesArray) => {
  const getLetter = (grade) => {
    let letter = ''
    if (/[a-d]/.test(grade)) {
      letter = grade.slice(-1)
    }
    return letter
  }

  gradesArray.sort((a, b) => {
    const letter1 = getLetter(a)
    const letter2 = getLetter(b)
    const grade1 = parseInt(a.replace("5.", ""))
    const grade2 = parseInt(b.replace("5.", ""))
    if (grade1 - grade2 < 0) return -1;
    else if (grade1 - grade2 > 0) return 1;

    if (letter1 < letter2) return -1;
    else if (letter1 > letter2) return 1;
    else return 0;
  })

  return gradesArray;
}

const getTotalVertical = (climbs, projects, attempts) => {
  let total = climbs.reduce((acc, curr) => acc + curr.totalLength, 0)
  projects.forEach(project => {
    if (project.completedDate) total += project.totalLength
    const totalAttempts = attempts.filter(attempt => attempt.projectId === project._id).length
    total += project.totalLength * totalAttempts
  })

  return total
}

const getPitchesThisMonth = (climbs, projects, attempts, todaysDate) => {
  const isThisMonth = (date) => {
    const today = new Date(todaysDate)
    const thisMonth = today.getMonth()
    const thisYear = today.getFullYear()
    return date.getMonth() === thisMonth && date.getFullYear() === thisYear
  }

  const getNumberPitches = (arr) =>
    arr.reduce((acc, curr) => acc + curr.numberPitches, 0)

  let total = 0

  climbs.forEach(climb => {
    const climbDate = new Date(climb.completedDate)
    if (isThisMonth(climbDate)) {
      total += getNumberPitches(climb.pitches)
    }
  })

  projects.forEach(project => {
    if (project.completedDate) {
      const completedDate = new Date(project.completedDate)
      if (isThisMonth(completedDate)) {
        total += getNumberPitches(project.pitches)
      }
    }

    attempts.forEach(attempt => {
      if (attempt.projectId === project._id && isThisMonth(attempt.date)) {
        total += getNumberPitches(project.pitches)
      }
    })
  })

  return total
}

const getTotalDaysThisYear = (climbs, projects, attempts, todaysDate) => {
  const today = new Date(todaysDate);
  const thisYear = today.getFullYear();

  const totalDays = []

  const dateString = (date) => `${date.getMonth()} ${date.getDate()}`

  const isNewDate = (date) =>
    date.getFullYear() === thisYear && !totalDays.includes(dateString(date))

  climbs.forEach(climb => {
    const climbDate = new Date(climb.completedDate)
    if (isNewDate(climbDate)) {
      totalDays.push(dateString(climbDate))
    }
  })

  projects.forEach(project => {
    if (project.completedDate) {
      const projectDate = new Date(project.completedDate)
      if (isNewDate(projectDate)) {
        totalDays.push(dateString(projectDate))
      }
    }
  })

  attempts.forEach(attempt => {
    const attemptDate = new Date(attempt.date)
    if (isNewDate(attemptDate)) {
      totalDays.push(dateString(attemptDate))
    }
  })

  return totalDays.length
}

const getHighestRedpointGrade = (climbs, projects) => {
  const climbRedpoints = climbs.filter(climb => climb.send && climb.attempt !== 'Top Rope')
    .map(climb => climb.grade);

  const projectRedpoints = projects.filter(project => project.completedDate)
    .map(project => project.grade)

  const totalRedpoints = [...climbRedpoints, ...projectRedpoints]

  const allGrades = sortGrades(totalRedpoints)
  if (allGrades.length) return allGrades[allGrades.length - 1]
  return null
}

module.exports = {
  getTotalVertical,
  getPitchesThisMonth,
  getTotalDaysThisYear,
  getHighestRedpointGrade,
  sortGrades
}