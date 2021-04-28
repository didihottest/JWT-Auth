const User = require('../models/User')
const jwt = require('jsonwebtoken')

//handle validations errors
const handleErrors = (error) => {
  let errors = {email: '', password: ''}

  if (error.code === 11000) {
    errors.email = "That email is already registered"
    return errors
  }
  // console.log(error)
  if (error.message.includes('user validation failed')){
    Object.values(error.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message
    })
  }
  return errors
}


exports.signup_get = (req, res)=>{
  res.render('signup')
}

exports.login_get = (req, res)=>{
  res.render('login')
}
// set token expire time
const maxAge = 3 * 24 * 60 * 60
const createToken = (id)=>{
  //{id is value}, {'secret is encrypt key (value secret can be changed as you like'}, { expiresIn is for max age of token }
  return jwt.sign({id}, 'secret', {
    expiresIn: maxAge
  })
}

exports.signup_post = async (req, res)=>{
  const {email, password}= req.body;
  try {
    const user = await User.create({email, password})
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user:user._id})
  } catch (error) {
    if (error) {
      const errorMessage = handleErrors(error)
      console.log(errorMessage)
      res.status(400).json({
        error:errorMessage
      })
    }   
  }
}

exports.login_post = (req, res)=>{
  const {email, password}= req.body;

}

