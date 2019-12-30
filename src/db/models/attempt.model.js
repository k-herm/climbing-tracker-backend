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
  },
  send: {
    type: Boolean,
    default: false
  }
})

const Attempt = model('Attempt', attemptSchema)
module.exports = Attempt