// const sortGrades = (gradesArray) => {
//   gradesArray.sort((a, b) => {
//     let c = a.split(" ");
//     let d = b.split(" ");
//     const grade1 = parseInt(c[0].replace("5.", ""));
//     const grade2 = parseInt(d[0].replace("5.", ""));
//     if (grade1 - grade2 < 0) return -1;
//     else if (grade1 - grade2 > 0) return 1;

//     if (c[1] < d[1]) return -1;
//     else if (c[1] > d[1]) return 1;
//     else return 0;
//   })
//   return gradesArray;
// }

const getTotalVertical = (climbs, projects, attempts) => {
  let total = climbs.reduce((acc, curr) => acc + curr.totalLength, 0)
  projects.forEach(project => {
    if (project.completedDate) total += project.totalLength
    const totalAttempts = attempts.filter(attempt => attempt.projectId === project._id).length
    total += project.totalLength * totalAttempts
  })

  return total
}

const getPitchesThisMonth = (climbs, projects, attempts) => {
  const isThisMonth = (date) => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
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

// const getTotalDaysThisYear = (climbs, projects) => {
//   const today = new Date();
//   const thisYear = today.getFullYear();

//   const allDays = []

//   if (climbs.length > 0) {
//     climbs.forEach(climb => {
//       const climbDate = new Date(climb.createdAt)
//       climbDate.getFullYear() === thisYear && allDays.push(climbDate)
//     });
//   }

//   if (projects.length > 0) {
//     projects.forEach(project => {
//       if (project.completedDate) {
//         const completeDate = new Date(project.completedDate)
//         completeDate.getFullYear() === thisYear && allDays.push(completeDate)
//       }
//       project.attempts.forEach(attempt => {
//         const attemptDate = new Date(attempt.createdAt)
//         attemptDate.getFullYear() === thisYear && allDays.push(attemptDate)
//       })
//     });
//   }

//   allDays.sort();

//   const filteredDays = allDays.filter((date, i, arr) => {
//     if (i < 1) return true
//     return !(date.getMonth() === arr[i - 1].getMonth() && date.getDate() === arr[i - 1].getDate())
//   })

//   return filteredDays.length
// }

// const getHighestRedpointGrade = (climbs, projects) => {
//   let redpoints = []
//   if (climbs.length > 0) {
//     redpoints = climbs.filter(climb =>
//       climb.sendType === "Redpoint" || climb.sendType === "Onsight")
//       .map(climb => climb.grade);
//   }

//   if (projects.length > 0) {
//     redpoints.concat(
//       projects.filter(project => project.completedDate)
//         .map(project => project.grade)
//     )
//   }

//   const allGrades = sortGrades(redpoints);
//   if (allGrades.length > 0) return allGrades[allGrades.length - 1]
//   return null
// }

module.exports = {
  getTotalVertical,
  getPitchesThisMonth,
  // getTotalDaysThisYear,
  // getHighestRedpointGrade
}