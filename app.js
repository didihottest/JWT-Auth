const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes')
const app = express();

// middleware
app.use(express.static('public'));
// Get request raw json from postman / api
app.use(express.json());
// use express bodyparser to pass data from body
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000), console.log("server is running at port 3000"))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)