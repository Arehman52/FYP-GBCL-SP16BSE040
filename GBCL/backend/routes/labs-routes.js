const express = require("express");

const Labs = require("../models/lab");
const router = express.Router();







// RecieveLabsFromDB
router.get("/RecieveLabsFromDB", (req, res, next) => {
  Labs.find().then((documents) => {
    res.status(200).json({
      message: "this is a list of labs recieved from DB",
      labs: documents,
    });

    console.log("   ==> {/RecieveLabsFromDB} Labs were downloaded.");
  });
});







router.post("/CreateLab", (req, res, next) => {
  const lab = new Labs({
    LabTitle: req.body.LabTitle,
    LabInstructor: req.body.LabInstructor,
    LabProgram: req.body.LabProgram,
    LabClass: req.body.LabClass,
    UniversityNameOfLab: req.body.UniversityNameOfLab
  });
  lab.save()
    .then((result) => {
      res.status(201).json({
        message: "Lab has been created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log("   ==> {/CreateLab} LabTitle == ", lab.LabTitle);
});

module.exports = router;
