const { Schema, model } = require('mongoose')

const attemptSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: new Date()
  },
  attemptType: {
    type: String,
    required: true
  },
  send: {
    type: Boolean,
    required: true
  }
})

const Attempt = model('Attempt', attemptSchema)
module.exports = Attempt