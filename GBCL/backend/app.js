const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/user');



// mongodb+srv://abdurrehman:<password>@cluster0.jlslm.mongodb.net/<dbname>?retryWrites=true&w=majority
const app = express();


// following line establishes the connection with GBCLDatabase.
mongoose.connect("mongodb+srv://abdurrehman:MvceaEr8JnRkWkl7@cluster0.jlslm.mongodb.net/GBCLDatabse?retryWrites=true&w=majority",{ useNewUrlParser: true,
useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("FAILED to connect with the DB!!!, Errors are as below:");
    console.log(err);
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization");

  res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS");

  next();

});


app.get("/api/GetUsersListFromDB", (req, res, next) => {

  Users.find().then( documents => {
    res.status(200).json({
      message: "this is a list of users recieved from DB",
      usersInResponse: documents
    });
  });

  // console.log("get  rEQUEST.");
  // res.status(200).json("MESSAGadawdadE RECD");
});



//following is a POST request to create User.
app.post("/api/CreateUser", (req, res, next) => {

  const user = new Users({
    UserType: req.body.UserType,
    FirstNameOfUser: req.body.FirstNameOfUser,
    LastNameOfUser: req.body.LastNameOfUser,
    UniversityNameOfUser: req.body.UniversityNameOfUser,
    RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
    TitleOfUniversity: req.body.TitleOfUniversity,
    HECIDofUniversity: req.body.HECIDofUniversity,
    Username: req.body.Username,
    Password: req.body.Password
  });

  user.save();
  console.log("User's Data has been recieved at the server and saved in the Database.");
  // console.log(user);
  res.status(201).json({
    message: 'User has been created succefully! resposne from app.js file.'
  })
});

app.get("/", (req, res, next) => {
  res.status(200).json("Server is running!");
});

module.exports = app;


