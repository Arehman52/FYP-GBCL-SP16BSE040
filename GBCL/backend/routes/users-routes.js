const express = require("express");


const Users = require('../models/user');
const router = express.Router();


router.delete("/DeleteThisUser/:Id", (req, res, next)=>{

  Users.deleteOne({_id: req.params.Id}).then(
    result=>{
      res.status(200).json({
        message: "User Deleted!",
        result: result
      });
    });


});




router.put("/updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged/:OldTitle", (req, res, next)=>{
  // const Updateduser  = new Users({
  //   _id: req.body._id,
  //   UserType: req.body.UserType,
  //   FirstNameOfUser: req.body.FirstNameOfUser,
  //   LastNameOfUser: req.body.LastNameOfUser,
  //   UniversityNameOfUser: req.body.UniversityNameOfUser,
  //   RegistrationNumberOfUser: req.body.RegistrationNumberOfUser,
  //   TitleOfUniversity: req.body.TitleOfUniversity,
  //   HECIDofUniversity: req.body.HECIDofUniversity,
  //   UserzAccessStatus: req.body.UserzAccessStatus,
  //   Username: req.body.Username,
  //   Password: req.body.Password
  // });



    //1stly
  //this will change UniversityNameOfUser for all matching students and teachers
  queryConditions = {"TitleOfUniversity": null, "UniversityNameOfUser": req.params.OldTitle };
  Users.updateMany(queryConditions, {UniversityNameOfUser: req.body.TitleOfUniversity}).then(
    result=>{
      console.log(result);
      res.status(200).json({
        message: "For All Users\' UniversityNameOfUser field Changed because Title of their University is updated!",
        result: result
      });
    });
    console.log('   ==> req.params.OldTitle == ',req.params.OldTitle);
    // console.log('   ==> {/UpdateTitleOfUniversityANDUsersUniversityName/:OldTitle == ',Updateduser.Username);



    //2ndly
  //this will change TitleOfUniversity for that UNIVERSITY
  // Users.updateOne({TitleOfUniversity: req.params.OldTitle} ,Updateduser).then(
  //   result=>{
  //     res.status(200).json({
  //       message: "TitleOfUniversity and UniversityNameOfUser Updated everywhere!",
  //       result: result
  //     });
  //   });
    // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
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

  Users.updateOne({_id: req.params.Id} ,user).then(
    result=>{
      res.status(200).json({
        message: "User Updated!",
        result: result
      });
    });
    // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
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


    console.log('   ==> {/CreateUser} Username == ',user.Username);

});





router.post("/FetchThisUniversityByItsTitle", (req, res, next) => {


console.log('TitleOfUniversity:: REQ.BODY ==',req.body.TitleOfUniversity);
// console.log('TitleOfUniversity:: REQ.BODY ==',req.body);
  Users.findOne({"TitleOfUniversity": req.body.TitleOfUniversity }).then( document => {
    console.log('DOOCCUUMMEENNTTT::....',document);
    res.status(200).json({
      message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
      user: document

    });

    console.log('   ==> {/FetchThisUniversityByItsTitle} TitleOfUniversity == ',req.body.TitleOfUniversity);

  }).catch((err)=>{
    console.log(" 004 theeeen eeerrrororrorr\n",err);
  });
});


router.post("/FetchTHISUser", (req, res, next) => {


  Users.findOne({"Username": req.body.Username }).then( document => {
    console.log('document::....',document);
    res.status(200).json({
      message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
      user: document

    });

    console.log('   ==> {/FetchTHISUser} Username == ',req.body.Username);

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
    console.log('   ==> {/getUniversitiesList} :: Universities List was downloaded.');

  });
});




//following is working properly in signup page for fetching users.
router.get("/RecieveUsersFromDB", (req, res, next) => {

  Users.find().then( documents => {
    res.status(200).json({
      message: "this is a list of users recieved from DB",
      users: documents
    });

    console.log('   ==> {/RecieveUsersFromDB} Users were downloaded.');
  });
});




module.exports = router;
