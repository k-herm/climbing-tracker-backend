const Project = require('../models/project.model')
const Climb = require('../models/climb.model')
const Attempt = require('../models/attempt.model')
const {
  dateString,
  isThisMonth,
  getHigherGrade,
  sortArrayOfObjectsByGrade
} = require('../utils')

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

    const totalAttempts = attempts.filter(attempt => attempt.projectId === project._id)
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

const climbsGradeAttemptCountsAgg = (userId) => (
  Climb.aggregate()
    .match({ userId, send: true })
    .group({
      _id: { grade: '$grade', attempt: '$attempt' },
      count: { $sum: 1 }
    })
    .group({
      _id: '$_id.grade',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count'
        }
      }
    })
)

const attemptsProjectCountsAgg = (userId) => (
  Attempt.aggregate()
    .match({ userId, falls: 0, takes: 0 })
    .group({
      _id: { project: '$projectId', attempt: '$attemptType' },
      count: { $sum: 1 }
    })
    .group({
      _id: '$_id.project',
      count: { $sum: '$count' },
      attempts: {
        $addToSet: {
          _id: '$_id.attempt',
          count: '$count'
        }
      }
    })
    .lookup({
      from: 'projects',
      localField: '_id',
      foreignField: '_id',
      as: 'projectData'
    })
)

const getChartData = async (userId, projects) => {
  //need to include project data
  const climbsAgg = await climbsGradeAttemptCountsAgg(userId)
  const attemptsAgg = await attemptsProjectCountsAgg(userId)

  const gradesChart = climbsAgg.map(grade => ({
    grade: grade._id,
    count: grade.count,
    attempts: grade.attempts.map(attempt => ({
      attemptType: attempt._id,
      count: attempt.count
    }))
  }))

  const projectsAgg = attemptsAgg.map((project) => ({
    grade: project.projectData[0].grade,
    count: project.count,
    attempts: project.attempts.map((attempt) => ({
      attemptType: attempt._id,
      count: attempt.count
    }))
  }))

  // projectsAgg.forEach(project => {
  //   const res = gradesChart.find((climb) => climb.grade === project.grade)
  //   res.count += project.count

  // })
  sortArrayOfObjectsByGrade(gradesChart, 'grade')
  // const styleCounts = async ()


  console.log(JSON.stringify(projectsAgg, null, 2));
  return {
    gradesChart
  }
}


// const getTotalVertical = (climbs, projects, attempts) => {
//   let total = climbs.reduce((acc, curr) => acc + curr.totalLength, 0)
//   projects.forEach(project => {
//     if (project.completedDate) total += project.totalLength
//     const totalAttempts = attempts.filter(attempt => attempt.projectId === project._id).length
//     total += project.totalLength * totalAttempts
//   })

//   return total
// }

// const getPitchesThisMonth = (climbs, projects, attempts, todaysDate) => {
//   const isThisMonth = (date) => {
//     const today = new Date(todaysDate)
//     const thisMonth = today.getMonth()
//     const thisYear = today.getFullYear()
//     return date.getMonth() === thisMonth && date.getFullYear() === thisYear
//   }

//   const getNumberPitches = (arr) =>
//     arr.reduce((acc, curr) => acc + curr.numberPitches, 0)

//   let total = 0

//   climbs.forEach(climb => {
//     const climbDate = new Date(climb.completedDate)
//     if (isThisMonth(climbDate)) {
//       total += getNumberPitches(climb.pitches)
//     }
//   })

//   projects.forEach(project => {
//     if (project.completedDate) {
//       const completedDate = new Date(project.completedDate)
//       if (isThisMonth(completedDate)) {
//         total += getNumberPitches(project.pitches)
//       }
//     }

//     attempts.forEach(attempt => {
//       if (attempt.projectId === project._id && isThisMonth(attempt.date)) {
//         total += getNumberPitches(project.pitches)
//       }
//     })
//   })

//   return total
// }

// const getTotalDaysThisYear = (climbs, projects, attempts, todaysDate) => {
//   const today = new Date(todaysDate);
//   const thisYear = today.getFullYear();

//   const totalDays = []

//   const dateString = (date) => `${date.getMonth()} ${date.getDate()}`

//   const isNewDate = (date) =>
//     date.getFullYear() === thisYear && !totalDays.includes(dateString(date))

//   climbs.forEach(climb => {
//     const climbDate = new Date(climb.completedDate)
//     if (isNewDate(climbDate)) {
//       totalDays.push(dateString(climbDate))
//     }
//   })

//   projects.forEach(project => {
//     if (project.completedDate) {
//       if (isNewDate(project.completedDate)) {
//         totalDays.push(dateString(project.completedDate))
//       }
//     }
//   })

//   attempts.forEach(attempt => {
//     if (isNewDate(attempt.date)) {
//       totalDays.push(dateString(attempt.date))
//     }
//   })

//   return totalDays.length
// }

// const getHighestRedpointGrade = (climbs, projects) => {
//   const climbRedpoints = climbs.filter(climb => climb.send && climb.attempt !== 'Top Rope')
//     .map(climb => climb.grade);

//   const projectRedpoints = projects.filter(project => project.completedDate)
//     .map(project => project.grade)

//   const totalRedpoints = [...climbRedpoints, ...projectRedpoints]

//   const allGrades = sortGrades(totalRedpoints)
//   if (allGrades.length) return allGrades[allGrades.length - 1]
//   return null
// }

module.exports = {
  // getTotalVertical,
  // getPitchesThisMonth,
  // getTotalDaysThisYear,
  // getHighestRedpointGrade,
  // sortGrades,
  getNumericStatistics,
  getChartData
}