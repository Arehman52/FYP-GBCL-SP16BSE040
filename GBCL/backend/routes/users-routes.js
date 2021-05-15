const express = require("express");
const bcrypt = require("bcrypt");


const Users = require('../models/user');
const { __assign } = require("tslib");


const router = express.Router();


// app.get("/GetUsersListFromDB", (req, res, next) => {

//   Users.find().then( documents => {
//     res.status(200).json({
//       message: "this is a list of users recieved from DB",
//       usersInResponse: documents
//     });
//   });

//   // console.log("get  rEQUEST.");
//   // res.status(200).json("MESSAGadawdadE RECD");
// });

// UpdateThisUser


router.delete("/DeleteThisUser/:Id", (req, res, next)=>{

  Users.deleteOne({_id: req.params.Id}).then(
    result=>{
      res.status(200).json({
        message: "User Deleted!",
        result: result
      });
    });


});








router.put("/UpdateThisUser/:Id", (req, res, next)=>{
  const user  = new Users({
    _id: req.body._id,
    UserType: req.body.UserType,
    FirstNameOfUser: req.body.FirstNameOfUser,
    LastNameOfUser: req.body.LastNameOfUser,
    UniversityNameOfUser: req.body.UniversityNameOfUser,
    RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
    TitleOfUniversity: req.body.TitleOfUniversity,
    HECIDofUniversity: req.body.HECIDofUniversity,
    UserzAccessStatus: req.body.UserzAccessStatus,
    Username: req.body.Username,
    Password: req.body.Password
  });
  // console.log()
  console.log('USER: \n',user);
  // console.log('USER: \n');

  // Users.updateOne
  Users.updateOne({_id: req.params.Id} ,user).then(
    result=>{
      res.status(200).json({
        message: "User Updated!",
        result: result
      });
    });


});




//following is a POST request to create User.
router.post("/CreateUser", (req, res, next) => {


  const user  = new Users({
    UserType: req.body.UserType,
    FirstNameOfUser: req.body.FirstNameOfUser,
    LastNameOfUser: req.body.LastNameOfUser,
    UniversityNameOfUser: req.body.UniversityNameOfUser,
    RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
    TitleOfUniversity: req.body.TitleOfUniversity,
    HECIDofUniversity: req.body.HECIDofUniversity,
    UserzAccessStatus: req.body.UserzAccessStatus,
    Username: req.body.Username,
    Password: req.body.Password
  });
  user.save().then(
    result => {
      res.status(201).json({
        message: 'User has been created succefully! resposne from app.js file.',
        result: result
      });
    })
    .catch(err =>{
      res.status(500).json({
        error: err
      });
    });

    console.log("User's Data has been recieved at the server and saved in the Database.");
    console.log(user);


});





router.post("/FetchTHISUser", (req, res, next) => {


  Users.findOne({"Username": req.body.Username }).then( document => {
    res.status(200).json({
      message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
      user: document

    }).catch((err)=>{
      console.log(" 006 res.status(200) in /FetchTHISUser eeerrrororrorr\n",err);
    });
    console.log(" 003 USER HAS BEEN RETRIEVED FOR SIGNIN");

  }).catch((err)=>{
    console.log(" 004 theeeen eeerrrororrorr\n",err);
  });
});




//following is working properly in signup page for fetching users.
router.get("/getUniversitiesList", (req, res, next) => {

  Users.distinct("TitleOfUniversity").then( list => {
    res.status(200).json({
      // message: "this is a list of users recieved from DB",
      theList: list
    });
    console.log("SUCCESSFUL TIL HERE : Homepage-routes.js:62");

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
