const isThisMonth = (date, todaysDate) => {
  const today = new Date(todaysDate)
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()
  return date.getMonth() === thisMonth && date.getFullYear() === thisYear
}

const dateString = (date) => `${date.getMonth()} ${date.getDate()}`

const sortTwoGrades = (a, b) => {
  const getLetter = (grade) => {
    let letter = ''
    if (/[a-d]/.test(grade)) {
      letter = grade.slice(-1)
    }
    return letter
  }

  const letter1 = getLetter(a)
  const letter2 = getLetter(b)
  const grade1 = parseInt(a.replace("5.", ""))
  const grade2 = parseInt(b.replace("5.", ""))
  if (grade1 - grade2 < 0) return -1
  else if (grade1 - grade2 > 0) return 1

  if (letter1 < letter2) return -1
  else if (letter1 > letter2) return 1
  else return 0
}

const getHigherGrade = (a, b) => {
  const val = sortTwoGrades(a, b)
  switch (val) {
    case -1: return b
    case 0: return a
    case 1: return a
  }
}

const sortArrayOfObjectsByGrade = (gradesArray, key) =>
  gradesArray.sort((a, b) => sortTwoGrades(a[key], b[key]))

module.exports = {
  isThisMonth,
  dateString,
  getHigherGrade,
  sortArrayOfObjectsByGrade,
  sortTwoGrades
}