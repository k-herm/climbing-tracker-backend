const {
  sortArrayOfObjectsByGrade
} = require('../utils')
const { gradesArray, sortedArray } = require('../mockData')

describe('sortArrayOfObjectsByGrades', () => {
  it('should sort the array of objects correctly', () => {
    const result = sortArrayOfObjectsByGrade(gradesArray, 'grade')
    expect(result).toEqual(sortedArray)
  })
})