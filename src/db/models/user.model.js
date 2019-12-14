const { Schema, model } = require('mongoose')
const validator = require('validator')

const userSchema = new Schema({
   name: {
      type: String,
      minlength: 1,
      required: true
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
         validator: validator.isEmail,
         message: '{VALUE} is not a valid email'
      }
   },
   password: {
      type: String,
      minlength: 1,
      required: true
   }
})

userSchema.post('save', function (error, doc, next) {
   console.log(error);
   if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Email is already being used.'))
   }
   else if (error.name === 'ValidationError') {
      next(new Error(`${error.errors.email.value} is not a valid email.`))
   }
})

const User = model('User', userSchema)
module.exports = User