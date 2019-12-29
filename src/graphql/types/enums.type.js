const { GraphQLEnumType, GraphQLInputObjectType } = require('graphql')

const gradeValues = {
  name: 'GradeEnum',
  values: {
    '_5_6': { value: '5.6' },
    '_5_7': { value: '5.7' },
    '_5_8': { value: '5.8' },
    '_5_9': { value: '5.9' },
    '_5_10a': { value: '5.10a' },
    '_5_10b': { value: '5.10b' },
    '_5_10c': { value: '5.10c' },
    '_5_10d': { value: '5.10d' },
    '_5_11a': { value: '5.11a' },
    '_5_11b': { value: '5.11b' },
    '_5_11c': { value: '5.11c' },
    '_5_11d': { value: '5.11d' },
    '_5_12a': { value: '5.12a' },
    '_5_12b': { value: '5.12b' },
    '_5_12c': { value: '5.12c' },
    '_5_12d': { value: '5.12d' },
    '_5_13a': { value: '5.13a' },
    '_5_13b': { value: '5.13b' },
    '_5_13c': { value: '5.13c' },
    '_5_13d': { value: '5.13d' },
    '_5_14a': { value: '5.14a' },
    '_5_14b': { value: '5.14b' },
    '_5_14c': { value: '5.14c' },
    '_5_14d': { value: '5.14d' },
    '_5_15a': { value: '5.15a' },
    '_5_15b': { value: '5.15b' },
    '_5_15c': { value: '5.15c' },
    '_5_15d': { value: '5.15d' }
  }
}
const GradeEnum = new GraphQLEnumType(gradeValues)


const routeStyleValues = {
  name: 'RouteStyleEnumT',
  values: {
    crack: { value: 'Crack' },
    crimpy: { value: 'Crimpy' },
    technical: { value: 'Technical' },
    pumpy: { value: 'Pumpy' },
    offwidth: { value: 'Offwidth' },
    fingers: { value: 'Fingers' },
    offFingers: { value: 'Off-Fingers' },
    hands: { value: 'Hands' },
    offHands: { value: 'Off-Hands' },
    fists: { value: 'Fists' },
    offFists: { value: 'Off-Fists' }
  }
}
const RouteStyleEnum = new GraphQLEnumType(routeStyleValues)


const attemptValues = {
  name: 'AttemptEnum',
  values: {
    topRope: { value: 'Top Rope' },
    redpoint: { value: 'Redpoint' },
    flash: { value: 'Flash' },
    onsight: { value: 'Onsight' }
  }
}
const AttemptEnum = new GraphQLEnumType(attemptValues)


module.exports = {
  GradeEnum,
  RouteStyleEnum,
  AttemptEnum,
}