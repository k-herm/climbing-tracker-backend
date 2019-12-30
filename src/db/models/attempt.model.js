const { Schema, model } = require('mongoose')

const attemptSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  projectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  falls: {
    type: Number,
    default: 0
  },
  takes: {
    type: Number,
    default: 0
  },
  attemptType: {
    type: String,
    required: true
  }
})

const Attempt = model('Attempt', attemptSchema)
module.exports = Attempt