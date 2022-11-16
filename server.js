const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex') 

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const juan = knex ({
    client: 'pg',
    connection: {
      host : 'postgres://juan:mXI4Vl80Wi2z4gvee064SkX8Z9jFgoVZ@dpg-cdqfr6qrrk09t4bf8vrg-a/smartbrain_ytzt',
      port : 5432,
      user : 'juan',
      password : 'mXI4Vl80Wi2z4gvee064SkX8Z9jFgoVZ',
      database : 'smartbrain_ytzt'
    }
  });

juan.select('*').from('users').then(data => {
    console.log(data);
});


const app=express();

app.use(express.json());
app.use(cors());



//root route////////////////////////////////////////////////////

app.get('/', (req, res) => {res.send('it is working')})

//signin//////////////////////////////////////////

app.post('/signin', (req, res) => { signin.handleSignin(req, res, juan, bcrypt)})

//REGISTER/////////////////////////////////////

app.post('/register', (req, res) => { register.handleRegister(req, res, juan, bcrypt) })

//PROFILE USER ID////////////////////////////////////////////////////////

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, juan)})

//IMAGE USER COUNT//////////////////////////////////////////////////////

app.put('/image', (req, res) =>  {image.handleImagePut(req, res, juan)})
app.post('/imageurl', (req, res) =>  {image.handleApiCall(req, res)})
////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3001, ()=> {
    console.log(`app is running good bro #{process.env.PORT}`)
});


