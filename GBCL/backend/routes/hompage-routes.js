const express = require("express");

const Users = require('../models/user');


const router = express.Router();




//following is a POST request to create User.
router.post("/CreateUser", (req, res, next) => {

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


router.post("/FetchTHISUser", (req, res, next) => {


  Users.findOne({"Username": req.body.Username }).then( document => {
    res.status(200).json({
      message: " 001 USER HAS BEEN aiqa aya abbb?? RETRIEVED FOR SIGNIN",
      user: document

    });
    console.log(" 003 USER HAS BEEN RETRIEVED FOR SIGNIN");

  }).catch((err)=>{
    console.log(" 004 theeeen eeerrrororrorr",err);
  });
});




//following is working properly in signup page for fetching users.
router.get("/RecieveUsersFromDB", (req, res, next) => {

  Users.find().then( documents => {
    res.status(200).json({
      message: "this is a list of users recieved from DB",
      users: documents
    });
    console.log("SUCCESSFUL TIL HERE : Homepage-routes.js:62");
    // console.log(documents);

  });
});




module.exports = router;
