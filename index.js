const { response } = require('express')
const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3001
app.use(express.json())
const users = []

const myCheckUser = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex( user => user.id === id)
    
    if (index < 0) {
        return response.status(404).json({message: 'User not found'})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})


app.put('/users/:id',myCheckUser, (request, response) => {
   const index = request.userIndex = index

    const {name, age} = request.body
    const updateUser = {id, name, age}

    users[index] = updateUser
    return response.json(updateUser)
})

app.delete('/users/:id', myCheckUser , (request, response) => {
    const index = request.userIndex = index
    const id = request.userId
    users.splice(index, 1)
    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})