
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000

const { users } = require('./state')

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

/* BEGIN - create routes here */

// GET Method to get all users 
app.get('/users', (req, res) => {

  res.json(users)
})

//GET - First Member 
app.get('/users/1', (req, res) => {
  
  res.json(users[0])
})

//POST - Add New User
app.post('/users', (req, res) => {
  users.push({"_id": "6","name":"Dana Scully","occupation":"FBI Agent","avatar":"https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg"})
  res.json(users)
  })
 
// PUT - Update User
app.put("/users/1", (req, res) => {
  users[0].occupation = "Special Agent";
  res.json(users[0]);
  });

//  DELETE - Delete User
app.delete("/users/1", (req, res) => {
    users.shift();
    res.send("User Deleted");
  });

//BODY-PARSER MODULE

app.post('/users', (req, res) => {
  let counter = users.length + 1
  const newUser = req.body
  newUser._id = counter
  users.push(newUser)
  res.json(users)
  
  })
// //Get User - GET PV
app.get('/users/:userId', (req, res) => {
  let getId = users.filter(user => user._id === parseInt(req.params.userId))
  res.json(getId)
})

// //Update user - PUT PV
app.put('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId))
  
  if (found) {
      const updUsers = req.body
      users.forEach(user => {
        if(user._id === parseInt(req.params.userId)) {
          user.name = updUsers.name

          res.json({msg : 'Member Updated', user})
        }
      })
  } else {
    res.status(400).json({msg: `No member with that id of ${req.params.id}`})
  }
})

// //Delete User - Delete PV
app.delete('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId))

  if (found) {
    res.json(users.filter(user => user._id !== parseInt(req.params.userId)))
  } else {
    res.status(400).json({msg : `No member with the id of ${req.params.id}`})
  }
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))