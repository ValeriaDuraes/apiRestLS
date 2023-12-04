const mongoose = require('mongoose')
const Users = require('./models/Users')
const express = require("express")
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }), 
)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Hello Express!"})
})

// ROTAS
//Create - POST
app.post('/users', async (req, res) =>{
  const { name, email, cpf, approved } = req.body

  const user = {
    name,
    email,
    cpf,
    approved,
  }

  try {
    await Users.create(user)
    res.status(201).json({message: "User created successfully!"})
  } catch (error) {
    res.status(500).json({erro: error})
  }
})

// Read - GET
app.get('/users', async (req, res) =>{
  try {
    const users = await Users.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({erro: error})
  }
})

// Read Id - GET 
app.get('/users/:id', async (req, res) => {
  const id = req.params.id

  try{
    const users = await Users.findOne({ _id: id })  
    res.status(200).json(users)
  } catch {
    res.status(500).json({ erro:error })
  }
})

mongoose.connect('mongodb+srv://valleriaduraes:deVeloper-1992@apirestregisterusers.yqfslcd.mongodb.net/?retryWrites=true&w=majority',
)
.then(() => {
  console.log("Connection with MongoDB successfully established!")
  app.listen(3000)
})
.catch((err) => console.log(err))

// mongodb+srv://valleriaduraes:<password>@apirestregisterusers.yqfslcd.mongodb.net/?retryWrites=true&w=majority

