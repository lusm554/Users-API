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

app.listen(3000)