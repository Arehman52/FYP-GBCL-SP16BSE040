const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, UPDATE, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.get("/api/GetUsersListFromDB", (req, res, next) => {
  console.log("get  rEQUEST.");
  res.status(200).json("MESSAGE RECD");
});


//following is a POST request to create User.
app.post("/api/CreateUser", (req, res, next) => {
  // res.send('Hello from  express!');
  const user = req.body;
  console.log("User's Data has been recieved at the server. \nUser: \n"+user);
  res.status(201).json({
    message: 'User has been created succefully! resposne from app.js file.'
  })
});


module.exports = app;


