let bcrypt = require('bcryptjs')
let mongoose = require('mongoose')

let dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: String,
  age: Number
})

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1
  },
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  },
  profileUrl: String,
  dogs: [dogSchema]
})

// Use bcrypt to hash password
userSchema.pre('save', function (next) {
  if (this.isNew) {
    // New, as opposed to modified
    this.password = bcrypt.hashSync(this.password, 12)
  }

  next()
})

// Ensure that password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password
    delete user.__v
    return user
  }
})

// Create a helper function to compare the password hashes
userSchema.methods.isValidPassword = function (typedPassword) {
  return bcrypt.compareSync(typedPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
