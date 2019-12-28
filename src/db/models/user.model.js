const { Schema, model } = require('mongoose')
const validator = require('validator')
const { randomBytes } = require('crypto')

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
   },
   token: {
      type: String
   },
   resetToken: {
      type: String
   },
   resetTokenExpiry: {
      type: Number
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

userSchema.methods.generateToken = function () {
   let user = this
   user.token = randomBytes(12).toString('base64')
   return user.save().then(() => user.token)
}

const User = model('User', userSchema)
module.exports = User