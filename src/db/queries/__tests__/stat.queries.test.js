const {
  getTotalVertical,
  getPitchesThisMonth,
  getTotalDaysThisYear,
  getHighestRedpointGrade,
  sortGrades
} = require('../stat.queries')
const { climbs, projects, attempts } = require('../mockData')

describe('getTotalVertical', () => {
  it('should calculate correct total', () => {
    const total = getTotalVertical(climbs, projects, attempts)
    expect(total).toBe(165)
  })
})

describe('getPitchesThisMonth', () => {
  it('should get the correct number of pitches', () => {
    const todaysDate = new Date("January 10, 2020")
    const pitches = getPitchesThisMonth(climbs, projects, attempts, todaysDate)
    expect(pitches).toBe(8)
  })
})

describe('getTotalDaysThisYear', () => {
  it('should get the correct days', () => {
    const todaysDate = new Date("January 10, 2020")
    const days = getTotalDaysThisYear(climbs, projects, attempts, todaysDate)
    expect(days).toBe(4)
  })
})

describe('sortGrades', () => {
  const gradesArray = [
    '5.12d', '5.9', '5.12a', '5.10a', '5.10b', '5.6', '5.10a'
  ]
  const sortedArray = [
    '5.6', '5.9', '5.10a', '5.10a', '5.10b', '5.12a', '5.12d'
  ]

  const result = sortGrades(gradesArray)
  expect(result).toEqual(sortedArray)
})

describe('getHighestRedpointGrade', () => {
  const grade = getHighestRedpointGrade(climbs, projects)
  expect(grade).toBe('5.12a')
})