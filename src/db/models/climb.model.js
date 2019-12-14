import { Schema, model } from 'mongoose'

const climbSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,

   },
   name: {
      type: String,
      required: false
   }
})

export const Climb = model('Climb', climbSchema)