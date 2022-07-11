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
//[GET] all users
server.get('/api/users',(req,res) =>{
    Users.find().then(users => {
        if(users == null) {
            res.status(500).json({message: "the users information could not be retrieved"})
            return;
        }else{
            res.status(200).json(users);
        }
    });
})
//[GET] a specified user
server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;
    Users.findById(id).then(user => {
        if(user == null){
            res.status(404).json({message: 'the user with the specified ID does not exist'})
        }else{
            res.status(201).json(user)
        }
    })
})
//[DELETE] a specified user
server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id;
    Users.remove(id).then(user =>{
        if(user == null){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }else {
            res.status(201).json(user)
        }
    });
})
//[PUT] an update in for a specified user
module.exports = server; // EXPORT YOUR SERVER instead of {}