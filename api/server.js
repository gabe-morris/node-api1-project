// BUILD YOUR SERVER HERE
const Users = require('./users/model')
const express = require('express')
const server = express()
server.use(express.json());

//[POST] a new user
server.post('/api/users', (req,res) => {
    let body = req.body;
    if(body.name == null || body.bio == null){
        res.status(400).json({message: 'Please provide name and bio for the user'})
        return;
    }
    Users.insert(body).then(user => {
        res.status(201).json(user)
    });
})
//[GET] users
server.get('/api/users',(req,res) =>{
    Users.find().then(users => res.status(200).json(users));
})
//[GET] a specified user
//[DELETE] a specified user
//[PUT] an update in for a specified user
module.exports = server; // EXPORT YOUR SERVER instead of {}
