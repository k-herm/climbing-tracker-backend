const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   location: {
      type: String
   },
   completedDate: {
      type: Date
   },
   grade: {
      type: String,
      required: true
   },
   pitches: {
      type: Array,
      required: true
   },
   totalLength: {
      type: Number,
      default: 25
   },
   routeStyle: {
      type: Array
   },
   climbStyle: {
      type: String
   }
})

const Project = model('Project', projectSchema)
module.exports = Project