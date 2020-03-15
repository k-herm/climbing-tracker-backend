const {
  getTotalVertical,
  getPitchesThisMonth
} = require('../stat.queries')
const { climbs, projects, attempts } = require('../mockData')

describe('getTotalVertical', () => {
  it('should calculate correct total', () => {
    const total = getTotalVertical(climbs, projects, attempts)
    expect(total).toBe(165)
  })
})

describe('getPitchesThisMonth')