const express = require("express");

const Labs = require("../models/lab");
const router = express.Router();






router.delete("/DeleteThisLab/:Id", (req, res, next) => {
  Labs.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "Lab Deleted!",
      result: result,
    });
  });
});



router.put("/UpdateThisLab/:Id", (req, res, next) => {
  const lab = new Labs({
    _id: req.body._id,
    LabTitle: req.body.LabTitle,
    LabInstructor: req.body.LabInstructor,
    LabProgram: req.body.LabProgram,
    LabClass: req.body.LabClass,
    UniversityNameOfLab: req.body.UniversityNameOfLab
  });

  Labs.updateOne({ _id: req.params.Id }, lab).then((result) => {
    res.status(200).json({
      message: "Lab Updated!",
      result: result,
    });
  });
  // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
});



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




router.post("/FetchTHISLab", (req, res, next) => {
  Labs.findOne({ _id: req.body._id })
    .then((lab) => {
      console.log("Lab....", lab);
      res.status(200).json({
        message: "Lab Fetched: "+lab.LabTitle,
        lab: lab,
      });

      console.log("   ==> {/FetchTHISLab} _id == ", req.body._id);
    })
    .catch((err) => {
      console.log(" 004 theeeen eeerrrororrorr\n", err);
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
