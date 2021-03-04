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
    "GET,POST,PATCH,PUT,DELETE");

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




// Db.collection.distinct














//
// ===========================================MUZZI CODE BELOW
//
//
// exports.userLogin= (req,res,next) =>
// {
//   //console.log("sucesfully");
//   let fethcedUser;
//   User.findOne({cnicNumber:req.body.cnicNumber})
//     .then(user =>
//     {
//       if(!user)
//       {
//         return res.status(401).json(
//         {
//           message: "Authentication Failed"
//         });
//       }
//       fethcedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//       .then(result =>
//           {
//             if(!result)
//             {
//               return res.status(401).json(
//                 {
//                   message: "Invalid Authentication Credentials"
//                 });
//             }
//             //the second parameter "'secret_this_should_be_longer'" this would be changed in our real application for security purpose...and it is used in self created middleware check-auth
//             const token = jwt.sign({cnicNumber: fethcedUser.cnicNumber, userId: fethcedUser._id, accountStatus: fethcedUser.accountStatus},
//               process.env.JWT_KEY,
//               {expiresIn: "1h"});
//             res.status(200).json(
//               {
//                 token : token,
//                 expiresIn: 3600,
//                 userId: fethcedUser._id,
//                 accountStatus: fethcedUser.accountStatus
//                 //message: "Succesfull"
//               });
//           })
//           .catch(error =>
//             {
//               return res.status(401).json(
//                 {
//                   message: "Authentication Failed"
//                 });
//             });
//     }
// ===========================================MUZZI CODE ABOVE

















app.post("/api/FetchTHISUser", (req, res, next) => {


  Users.findOne({"Username": req.body.Username }).exec().then( document => {
    res.status(200).json({
      message: "USER HAS BEEN Attiqa aya abbb?? RETRIEVED FOR SIGNIN",
      user: document

    }).catch((err)=>{
      console.log("JSoooooooN",err);
    });;
    console.log("USER HAS BEEN RETRIEVED FOR SIGNIN");

  }).catch((err)=>{
    console.log("theeeen eeerrrororrorr",err);
  });
});





app.get("/api/RecieveUsersFromDB", (req, res, next) => {

  Users.find().then( documents => {
    res.status(200).json({
      message: "this is a list of users recieved from DB",
      users: documents
    });
    console.log("SUCCESSFUL TIL HERE");
    // console.log(documents);

  });
});




























app.get("/api/GetUniversitiesListFromDB", (req, res, next) => {

  Users.find().then( documents => {
    res.status(200).json({
      message: "If this message is displayed, means universities are retrieved from mongoDB",
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

