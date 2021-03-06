const { Schema, model } = require('mongoose')

const climbSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: true
   },
   name: {
      type: String,
   },
   location: {
      type: String
   },
   completedDate: {
      type: Date,
      default: new Date()
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
   },
   attempt: {
      type: String,
      required: true
   },
   send: {
      type: Boolean,
      required: true
   },
   indoor: {
      type: Boolean
   }
})

const Climb = model('Climb', climbSchema)
module.exports = Climb