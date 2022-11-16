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


//creo una database porque todavia no hice la base de datos real
// const database = {
//     users: [{
//         id: "123",
//         name: "juan",
//         password: "queso",
//         email: "juan@gmail.com",
//         entries: 0,
//         joined: new Date()
//     },
//     {
//         id: "124",
//         name:"sally",
//         password:"bananas",
//         email:"sally@gmail.com",
//         entries: "0",
//         joined: new Date()
//     }],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'juan@gmail.com'
//         }
//     ]
// }
//root route////////////////////////////////////////////////////

app.get('/', (req, res) => {res.send(database.users)})

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


/*

/ ---> res= this is working
/ signin --> POST(para que la contraseña este oculta)   = success o FAIL
/register --> POST  = NewUser
/profile/: userId --> GET = user
/image --> PUT  --> user updated (para el rank - cada vez que use la app suma 1)

*/