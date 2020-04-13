const GRADES = [
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10a',
  '5.10b',
  '5.10c',
  '5.10d',
  '5.11a',
  '5.11b',
  '5.11c',
  '5.11d',
  '5.12a',
  '5.12b',
  '5.12c',
  '5.12d',
  '5.13a',
  '5.13b',
  '5.13c',
  '5.13d',
  '5.14a',
  '5.14b',
  '5.14c',
  '5.14d',
  '5.15a',
  '5.15b',
  '5.15c',
  '5.15d'
]

const isThisMonth = (date, todaysDate) => {
  const today = new Date(todaysDate)
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()
  return date.getMonth() === thisMonth && date.getFullYear() === thisYear
}

const dateString = (date) => `${date.getMonth()} ${date.getDate()}`

const getMidMonthDate = (date) => new Date(
  date.getFullYear(),
  date.getMonth(),
  15
)

const addOneMonth = (date) => {
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  if (month > 11) {
    month = 0
    year += 1
  }
  return new Date(year, month, date.getDate())
}

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

const getGradeCategories = (object) => {
  const highestIndex = GRADES.findIndex((grade) =>
    grade === object[object.length - 1].grade
  )
  const lowestIndex = GRADES.findIndex((grade) =>
    grade === object[0].grade
  )
  return GRADES.slice(lowestIndex, highestIndex + 1)
}

module.exports = {
  addOneMonth,
  isThisMonth,
  dateString,
  getMidMonthDate,
  getHigherGrade,
  sortArrayOfObjectsByGrade,
  sortTwoGrades,
  getGradeCategories
}