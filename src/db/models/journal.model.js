const { Schema, model } = require('mongoose')

const journalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  climbId: {
    type: Schema.Types.ObjectId
  },
  projectId: {
    type: Schema.Types.ObjectId
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    default: new Date()
  },
  comment: {
    type: String,
    required: true
  }
})

const Journal = model('Journal', journalSchema)
module.exports = Journal