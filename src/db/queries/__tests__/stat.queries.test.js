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

describe('getPitchesThisMonth', () => {
  const realDate = Date
  afterEach(() => global.Date = realDate)

  it('should get the correct number of pitches', () => {
    const mockDate = new Date("January 10, 2020")
    global.Date = class extends Date {
      constructor(date) {
        if (date) return super(date)
        return mockDate
      }
    }

    const pitches = getPitchesThisMonth(climbs, projects, attempts)
    expect(pitches).toBe(8)
  })

})