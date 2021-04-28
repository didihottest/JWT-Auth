const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email:{
    type: String,
    required: [true, 'Please Enter an Email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password:{
    type: String, 
    required: [true, 'Please enter the password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
})
// run function after save userschema to db
// userSchema.post('save', (doc, next)=>{
//   console.log(doc);
//   next();
// })

// run function before save userschema to db
userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const user = mongoose.model('user', userSchema)

module.exports = user