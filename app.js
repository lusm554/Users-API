const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// get list of data
app.get('/api/users', (req, res) => {
    let content = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(content)

    res.send(users)
})

// get user by id 
app.get('/api/users/:id', (req, res) => {
    let id = req.params.id
    let content = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(content)

    let user = users.find((user) => user.id == id)

    user ? res.send(user) : res.status(404).send()
})

// receive data from client 
app.post('/api/users', (req, res) => {
    if(!req.body) res.sendStatus(400)

    let userName = req.body.userName 
    let userAge = req.body.userAge

    let data = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(data)

    // get max id
    let maxId = Math.max( ...users.map(user => user.id) )

    let newUser = {id: maxId+1, name: userName, age: userAge}

    // add user to arr
    users.push(newUser)
    data = JSON.stringify(users, null, 2)

    // rewrite file with new user 
    fs.writeFileSync('users.json', data)

    res.send(newUser)
})

// delete user by id    
app.delete('/api/users/:id', (req, res) => {
    let id = req.params.id

    let data = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(data)

    // find id for delete user 
    let deleteUser = users.find(user => user.id == id)

    if(!deleteUser) {
        return res.sendStatus(404)
    }

    // get new list users 
    data = users.filter(user => user.id != deleteUser.id)

    data = JSON.stringify(data, null, 2)

    fs.writeFileSync('users.json', data)
    
    // send deleted user 
    res.send(deleteUser)
})

app.listen(3000)