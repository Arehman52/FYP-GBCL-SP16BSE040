const express = require('express');

const app = express();

app.use("/api/UsersRegistration",(req, res, next)=>{
  res.send('Hello from  express!');
  });


module.exports = app;


