const { GraphQLEnumType, GraphQLInputObjectType } = require('graphql')

const gradeValues = {
  name: 'Grade',
  values: {
    '5.6': { value: '5.6' },
    '5.7': { value: '5.7' },
    '5.8': { value: '5.8' },
    '5.9': { value: '5.9' },
    '5.10a': { value: '5.10a' },
    '5.10b': { value: '5.10b' },
    '5.10c': { value: '5.10c' },
    '5.10d': { value: '5.10d' },
    '5.11a': { value: '5.11a' },
    '5.11b': { value: '5.11b' },
    '5.11c': { value: '5.11c' },
    '5.11d': { value: '5.11d' },
    '5.12a': { value: '5.12a' },
    '5.12b': { value: '5.12b' },
    '5.12c': { value: '5.12c' },
    '5.12d': { value: '5.12d' },
    '5.13a': { value: '5.13a' },
    '5.13b': { value: '5.13b' },
    '5.13c': { value: '5.13c' },
    '5.13d': { value: '5.13d' },
    '5.14a': { value: '5.14a' },
    '5.14b': { value: '5.14b' },
    '5.14c': { value: '5.14c' },
    '5.14d': { value: '5.14d' },
    '5.15a': { value: '5.15a' },
    '5.15b': { value: '5.15b' },
    '5.15c': { value: '5.15c' },
    '5.15d': { value: '5.15d' }
  }
}

const Grade = new GraphQLEnumType(gradeValues)
const GradeInput = new GraphQLInputObjectType(gradeValues)

const routeStyleValues = {
  name: 'Route Style',
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

const RouteStyle = new GraphQLEnumType(routeStyleValues)
const RouteStyleInput = new GraphQLInputObjectType(routeStyleValues)

const attemptValues = {
  name: 'Attempt Type',
  values: {
    topRope: { value: 'Top Rope' },
    redpoint: { value: 'Redpoint' },
    flash: { value: 'Flash' },
    onsight: { value: 'Onsight' }
  }
}

const Attempt = new GraphQLEnumType(attemptValues)
const AttemptInput = new GraphQLInputObjectType(attemptValues)

module.exports = {
  Grade,
  GradeInput,
  RouteStyle,
  RouteStyleInput,
  Attempt,
  AttemptInput
}