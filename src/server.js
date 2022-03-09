'use strict';

const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');


const basicAuth = require('./auth/middleware/basic')
const bearerAuth = require('./auth/middleware/bearerAuth')
const {User} = require('./auth/models/index')
// const UserModel = require('./auth/models/bearer.model')

const app = express();

app.use(express.json());

app.use(cors());


app.post('/signup' , signup);
app.post('/signin', basicAuth(User), signinHandler);
app.get('/user', bearerAuth(User), userHandler)

async function signup(req, res) {
    let { username, password } = req.body;
    console.log(`${username} and ${password}`);
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing >>> ', hashedPassword)
        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
    }
}

function signinHandler(req, res) {
    res.status(200).json(req.user);
}

function userHandler(req, res) {
    // send the user information to the client & create new repo
    res.status(200).json(req.user);

}

app.get('/' , (req,res) =>{
    res.send('home route')
})

function start(port){
    
    app.listen(port, () =>{
        console.log(`running on port ${port}`)
    })
    
    } 

app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app: app,
    start: start,
}