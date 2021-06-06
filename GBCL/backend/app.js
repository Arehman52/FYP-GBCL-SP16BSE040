const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Users = require('./models/user');
const UsersRoutes = require('./routes/users-routes');
const StudentLabDataRoutes = require('./routes/student-lab-data-routes');
const LabsRoutes = require('./routes/labs-routes');



// mongodb+srv://abdurrehman:<password>@cluster0.jlslm.mongodb.net/<dbname>?retryWrites=true&w=majority
const app = express();


// following line establishes the connection with GBCLDatabase.
mongoose.connect("mongodb+srv://abdurrehman:MvceaEr8JnRkWkl7@cluster0.jlslm.mongodb.net/GBCLDatabse",{ useNewUrlParser: true,
useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("FAILED to connect with the DB!!!, Errors are as below:");
    console.log(err);
  });



  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");


  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  next();

});

// /api/Homepage/GetUsersListFromDB



// Db.collection.distinct


// https://www.hec.gov.pk/_catalogs/masterpage/display%20templates/content%20web%20parts/hec-university/item_universities_sortable.js?ctag=4109$$15.0.5023.1000


app.get("https://www.hec.gov.pk/_catalogs/masterpage/display%20templates/content%20web%20parts/hec-university/item_universities_sortable.js?ctag=4109$$15.0.5023.1000", (req, res, next) => {
  // Labs.find().then((documents) => {

  (result)=>{
    res.status(200).json({
        result: result
      });
  }



});








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
















//TESTING=========================================================================================================
//used in Student/slab-dashboard/leaderboard's  test-leadercoard-sevice.ts file
// app.get("/api/fetchLatdestLeaderboardData", (req, res, next) => {

//   TestLeaderboard.find().then( documents => {
//     res.status(200).json({
//       message: "this is a list of users recieved from DB",
//       users: documents
//     });
//     console.log("SUCCESSFUL TIL HERE");
//     // console.log(documents);

//   });
// });




























// app.get("/api/GetUniversitiesListFromDB", (req, res, next) => {

//   Users.find().then( documents => {
//     res.status(200).json({
//       message: "If this message is displayed, means universities are retrieved from mongoDB",
//       usersInResponse: documents
//     });
//   });

//   // console.log("get  rEQUEST.");
//   // res.status(200).json("MESSAGadawdadE RECD");
// });





app.get("/", (req, res, next) => {
  res.status(200).json("Server is running!");
});

// app.use(express.static(__dirname + '/dist/gbcl'));
// app.get("/*", (req, res, next) => {
//   res.sendFile(path.join(__dirname+'/dist/gbcl/index.html'));
// });

let cors = require('cors')
app.use(cors())

//-->  /api/Homepage + [/CreateUser && /FetchTHISUser]
app.use("/api/Users", UsersRoutes);
app.use("/api/Labs", LabsRoutes);
app.use("/api/StudentLabData", StudentLabDataRoutes);

module.exports = app;


