const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/api/users', (req, res) => {
    let content = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(content)

    res.send(users)
})

app.listen(3000)