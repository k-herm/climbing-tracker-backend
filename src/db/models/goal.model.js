const { Schema, model } = require('mongoose')

const goalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId
  },
  grade: {
    type: String,
    required: true
  },
  climbsToComplete: {
    type: Number,
    default: 1
  },
  climbStyle: {
    type: String
  }
})

const Goal = model('Goal', goalSchema)
module.exports = Goal