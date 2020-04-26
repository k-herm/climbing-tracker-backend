const {
  getNumericStatistics,
  getGradesChart
} = require('../stat.queries')
const {
  climbs,
  climbsAgg,
  projects,
  attempts,
  attemptsAgg,
  gradesChart
} = require('../mockData')
const { climbsGradeAttemptCountsAgg } = require('../climb.queries')
const { attemptsProjectCountsAgg } = require('../attempt.queries')

jest.mock('../climb.queries')
jest.mock('../attempt.queries')

// describe('getNumericStatistics', () => {
//   it('should aggregate all data', () => {
//     const todaysDate = "January 10, 2020"
//     const data = getNumericStatistics(climbs, projects, attempts, todaysDate)
//     expect(data).toEqual({
//       totalVertical: 150,
//       highestRedpointGrade: '5.12a',
//       totalDaysThisYear: 4,
//       pitchesThisMonth: 7
//     })
//   })
// })

describe('getGradesBarChart', () => {
  it('should aggregate data', async () => {
    climbsGradeAttemptCountsAgg.mockReturnValue(climbsAgg)
    attemptsProjectCountsAgg.mockReturnValue(attemptsAgg)

    const expectedResult = gradesChart
    const userId = '1'
    const chart = await getGradesChart(userId)
    expect(chart).toEqual(expectedResult)
  })
})