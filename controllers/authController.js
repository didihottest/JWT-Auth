const User = require('../models/User')

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

exports.signup_post = async (req, res)=>{
  const {email, password}= req.body;
  try {
    const user = await User.create({email, password})
    res.status(201).json(user)
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

