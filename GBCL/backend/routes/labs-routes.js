const express = require("express");

const Labs = require("../models/lab-backend-models/lab");
const LabNumbers = require("../models/lab-backend-models/LabNumbers");
const LabChallenge = require("../models/lab-backend-models/labChallenge");
const LabTask = require("../models/lab-backend-models/labTask");
// const LabMember = require("../models/junk/labMember");
const router = express.Router();

// router.delete("/DeleteLabChallengesWhereLabJoinCode/:_id", (req, res, next) => {
//   LabChallenge.delete({ LabJoinCode: req.params._id }).then((result) => {
//     res.status(200).json({
//       message: "Lab Challenge Deleted!",
//       result: result,
//     });
//   });
// });
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
    LabInstructorFN: req.body.LabInstructorFN,
    LabInstructorLN: req.body.LabInstructorLN,
    LabProgram: req.body.LabProgram,
    LabClass: req.body.LabClass,
    UniversityNameOfLab: req.body.UniversityNameOfLab,
  });

  Labs.updateOne({ _id: req.params.Id }, lab).then((result) => {
    res.status(200).json({
      message: "Lab Updated!",
      result: result,
    });
  });
  // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
});



router.put("/ChangeUniversityNameOfLabOfThisUnizLabs/:oldUniversityNameOfLab", (req, res, next) => {

  Labs.updateMany({ UniversityNameOfLab:req.params.oldUniversityNameOfLab  }, {UniversityNameOfLab: req.body.UniversityNameOfLab}).then((result) => {
    res.status(200).json({
      message: "University Name Of Lab Updated to : "+req.body.UniversityNameOfLab+"!",
      result: result,
    });
  });
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

// getAllLabsOfThisUniversity
router.get("/getAllLabs", (req, res, next) => {
  Labs.find().then((documents) => {
    res.status(200).json({
      message: "These are all labs.",
      allLabs: documents,
    });
  });
});

// getAllLabsOfThisUniversity
router.post("/fetchLabNumbersOfThisLab", (req, res, next) => {
  LabNumbers.find({ LabJoinCode: req.body.LabJoinCode }).then((documents) => {
    res.status(200).json({
      message: "These are all fetched Lab Numbers Of This Lab ",
      FetchedLabNumbers: documents,
    });
    console.log("/fetchLabNumbersOfThisLab : ", documents);
    console.log("req.body.LabJoinCode : ", req.body.LabJoinCode);
  });
});

// getAllLabsOfThisUniversity
router.post("/getAllLabsOfThisUniversity", (req, res, next) => {
  Labs.find({ UniversityNameOfLab: req.body.UniversityNameOfLab }).then(
    (documents) => {
      res.status(200).json({
        message:
          "These are all labs of this university only : == " +
          req.body.UniversityNameOfLab,
        allLabsOfThisUniversity: documents,
      });
      console.log("These are all labs of this university :", documents);
    }
  );
});

router.post("/FetchTHISLab", (req, res, next) => {
  Labs.findOne({ _id: req.body._id })
    .then((lab) => {
      console.log("Lab....", lab);
      res.status(200).json({
        message: "Lab Fetched: " + lab.LabTitle,
        lab: lab,
      });

      console.log("   ==> {/FetchTHISLab} _id == ", req.body._id);
    })
    .catch((err) => {
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

router.post("/createNewLabNumber", (req, res, next) => {
  const labNumber = new LabNumbers({
    LabJoinCode: req.body.LabJoinCode,
    LabNumber: req.body.LabNumber,
    LabTaskIds: req.body.LabTaskIds,
  });
  labNumber
    .save()
    .then((result) => {
      res.status(201).json({
        message:
          "Lab NUMBER: " + req.body.LabNumber + " has been created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log("   ==> {/createNewLabNumber} ");
});

router.post("/CreateLab", (req, res, next) => {
  const lab = new Labs({
    LabTitle: req.body.LabTitle,
    LabInstructor: req.body.LabInstructor,
    LabInstructorFN: req.body.LabInstructorFN,
    LabInstructorLN: req.body.LabInstructorLN,
    LabProgram: req.body.LabProgram,
    LabClass: req.body.LabClass,
    UniversityNameOfLab: req.body.UniversityNameOfLab,
  });
  lab
    .save()
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





///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////  RESETTING DATABASE
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

router.get("/ResetEntrireDatabase/", (req, res, next) => {
  LabChallenge.deleteMany().then((result) => {
    // res.status(200).json({
    //   message: "Entire Lab Challenge DELETED ResetEntrireDatabase!",
    //   result: result,
    // });
  });
  Labs.deleteMany().then((result) => {
    // res.status(200).json({
    //   message: "Entire Lab Challenge DELETED ResetEntrireDatabase!",
    //   result: result,
    // });
  });
  LabTask.deleteMany().then((result) => {
    res.status(200).json({
      message:
        "Entire Databse Ressetted For Labs, Lab Tasks and Lab Challenges!",
      result: result,
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////  RESSETTING DATABASE
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//ResetAllChallenegesAttemptedByArraysOfThisStudentForThisLab

router.put("/updateThisLabNumberOfThisLab/", (req, res, next) => {
  LabNumbers.updateOne(
    {
      LabJoinCode: req.body.LabJoinCode,
      LabNumber: req.body.LabNumber,
    },
    { LabTaskIds: req.body.LabTaskIds }
  ).then((result) => {
    res.status(200).json({
      message: "/updated This Lab Number Of This Lab !!",
      result: result,
    });
  });
});

router.put(
  "/ResetAllChallenegezAttemptedByArraysOfALLLstudzOfThisLab/",
  (req, res, next) => {
    LabChallenge.updateMany(
      { LabJoinCode: req.body.LabJoinCode },
      { AttemptedByStudents: [] }
    ).then((result) => {
      res.status(200).json({
        message: "ResetAllChallenegezAttemptedByArraysOfALLLstudzOfThisLab !!",
        result: result,
      });
    });
  }
);
router.put(
  "/ResetAllLabTaskzAttemptedByArraysOfALLLstudzOfThisLab/",
  (req, res, next) => {
    LabTask.updateMany(
      { LabJoinCode: req.body.LabJoinCode },
      { AttemptedByStudents: [] }
    ).then((result) => {
      res.status(200).json({
        message: "ResetAllLabTaskzAttemptedByArraysOfALLLstudzOfThisLab !!",
        result: result,
      });
    });
  }
);

// router.get("/ResetChallengesAttemptedByArrays/", (req, res, next) => {
//   LabChallenge.updateMany({},{AttemptedByStudents: []}).then((result) => {
//     res.status(200).json({
//       message: "Reset Complete ResetChallengesAttemptedByArrays/!",
//       result: result
//     });
//   });
// });

module.exports = router;
