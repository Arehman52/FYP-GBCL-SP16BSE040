const express = require("express");

const Labs = require("../models/lab-backend-models/lab");
const LabChallenge = require("../models/lab-backend-models/labChallenge");
const LabTask = require("../models/lab-backend-models/labTask");
const LabMember = require("../models/lab-backend-models/labMember");
const router = express.Router();




router.delete("/DeleteThisLabChallenge/:Id", (req, res, next) => {
  LabChallenge.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "Lab Challenge Deleted!",
      result: result,
    });
  });
});

router.delete("/DeleteThisLabTask/:Id", (req, res, next) => {
  LabTask.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "Lab Task Deleted!",
      result: result,
    });
  });
});
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

// Fetch complete lab Members collection
router.get("/FetchCompleteLabMembers", (req, res, next) => {
  LabMember.find().then((documents) => {
    res.status(200).json({
      message: "this is a list of labs recieved from DB",
      CompleteLabMembers: documents,
    });

    console.log("   ==> {/RecieveLabsFromDB} Labs were downloaded.");
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



// GetAllLabTasksFromDB
router.get("/GetAllLabTasksFromDB", (req, res, next) => {
  LabTask.find().then((documents) => {
    res.status(200).json({
      message: "All Lab Tasks Downloaded.",
      labTasks: documents,
    });

    console.log("   ==> {/GetAllLabTasksFromDB} All Lab Tasks were downloaded.");
  });
});





// GetAllLabChallengesFromDB
router.get("/GetAllLabChallengesFromDB", (req, res, next) => {
  LabChallenge.find().then((documents) => {
    res.status(200).json({
      message: "All Lab Challenges Downloaded.",
      labChallenges: documents,
    });

    console.log("   ==> {/GetAllLabChallengesFromDB} All Lab Challenges were downloaded.");
  });
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




//=======================================================================YE WALI
router.post("/CreateLabTask", (req, res, next) => {
  const labTask = new LabTask({
    LabID: req.body.LabID,
    labTaskTitle: req.body.labTaskTitle,
    labTaskQuestion: req.body.labTaskQuestion,
    labTaskAnswer: req.body.labTaskAnswer,
    labTaskXPs: req.body.labTaskXPs
  });
  labTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Lab Task created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log("   ==> {/CreateLabTask} LabTastTitle == ", labTask.labTaskTitle);
});




router.post("/CreateLabChallenge", (req, res, next) => {
  const labChallenge = new LabChallenge({
    LabId: req.body.LabId,
    ChallengeQuestionType: req.body.ChallengeQuestionType,
    ChallengeQuestion: req.body.ChallengeQuestion,
    ChallengeOptionA: req.body.ChallengeOptionA,
    ChallengeOptionB: req.body.ChallengeOptionB,
    ChallengeOptionC: req.body.ChallengeOptionC,
    ChallengeOptionD: req.body.ChallengeOptionD,
    ChallengeXPs: req.body.ChallengeXPs,
    ChallengeAllowedTime: req.body.ChallengeAllowedTime
  });
  labChallenge
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Lab Challenge created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log("   ==> {/CreateLabChallenge} ChallengeQuestionType == ", labChallenge.ChallengeQuestionType);
});





module.exports = router;
