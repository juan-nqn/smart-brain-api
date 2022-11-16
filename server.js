const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex') 

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'holahola2',
      database : 'smart-brain'
    }
  });

postgres.select('*').from('users').then(data => {
    console.log(data);
});


const app=express();

app.use(express.json());
app.use(cors());



//root route////////////////////////////////////////////////////

app.get('/', (req, res) => {res.send('it is working')})

//signin//////////////////////////////////////////

app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt)})

//REGISTER/////////////////////////////////////

app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) })

//PROFILE USER ID////////////////////////////////////////////////////////

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, postgres)})

//IMAGE USER COUNT//////////////////////////////////////////////////////

app.put('/image', (req, res) =>  {image.handleImagePut(req, res, postgres)})
app.post('/imageurl', (req, res) =>  {image.handleApiCall(req, res)})
////////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3001, ()=> {
    console.log(`app is running good bro #{process.env.PORT}`)
});


