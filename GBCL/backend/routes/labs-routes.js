const express = require("express");

const Labs = require("../models/lab-backend-models/lab");
const LabChallenge = require("../models/lab-backend-models/labChallenge");
const LabTask = require("../models/lab-backend-models/labTask");
// const LabMember = require("../models/junk/labMember");
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





router.put("/UpdateThisLabChallenge/:Id", (req, res, next) => {
  const labChallenge = new LabChallenge({
    _id: req.body._id,
    LabJoinCode: req.body.LabJoinCode,
    ChallengeQuestionType: req.body.ChallengeQuestionType,
    ChallengeQuestion: req.body.ChallengeQuestion,
    ChallengeOptionA: req.body.ChallengeOptionA,
    ChallengeOptionB: req.body.ChallengeOptionB,
    ChallengeOptionC: req.body.ChallengeOptionC,
    ChallengeOptionD: req.body.ChallengeOptionD,
    ChallengeCorrectOption: req.body.ChallengeCorrectOption,
    ChallengeXPs: req.body.ChallengeXPs,
    ChallengeAllowedTime: req.body.ChallengeAllowedTime,
    AttemptedByStudents: req.body.AttemptedByStudents
  });

  LabChallenge.updateOne({ _id: req.params.Id }, labChallenge).then((result) => {
    res.status(200).json({
      message: "Lab Challenge of type: "+req.body.ChallengeQuestionType+" Updated!",
      result: result,
    });
  });
  console.log('   ==> {/UpdateThisLabChallenge/:Id} LabChallenge updated of type == ',req.body.ChallengeQuestionType);
});










router.put("/UpdateThisLabTask/:Id", (req, res, next) => {
  const lab = new LabTask({
    _id: req.body._id,
    LabJoinCode: req.body.LabJoinCode,
    labTaskTitle: req.body.labTaskTitle,
    labTaskQuestion: req.body.labTaskQuestion,
    labTaskAnswer: req.body.labTaskAnswer,
    labTaskXPs: req.body.labTaskXPs,
    AttemptedByStudents: req.body.AttemptedByStudents
  });

  LabTask.updateOne({ _id: req.params.Id }, lab).then((result) => {
    res.status(200).json({
      message: "Lab Task Updated!",
      result: result,
    });
  });
  console.log('   ==> {/UpdateThisLabTask/:Id} LabTask updated == ',req.body.labTaskTitle);
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



// getAllLabsOfThisUniversity
router.post("/getAllLabsOfThisUniversity", (req, res, next) => {
  Labs.find({UniversityNameOfLab: req.body.UniversityNameOfLab}).then((documents) => {
    res.status(200).json({
      message: "These are all labs of this university only : == "+req.body.UniversityNameOfLab,
      allLabsOfThisUniversity: documents
    });
    console.log("These are all labs of this university :",documents)
  });
});




// AllLabTasksOfThisLabFromDB
router.post("/getAllLabTasksOfThisLabFromDB", (req, res, next) => {
  LabTask.find({LabJoinCode:req.body.LabJoinCode}).then((documents) => {
    res.status(200).json({
      message: "All Lab Tasks Of This Lab From DB Downloaded.",
      AllLabTasksOfThisLabFromDB: documents,
    });

    console.log("   ==> {/AllLabTasksOfThisLabFromDB} All Lab Tasks of this lab were downloaded.");
  });
});



router.post("/getAllChallengesOfThisLabFromDB", (req, res, next) => {
  LabChallenge.find({LabJoinCode: req.body.LabJoinCode}).then((documents) => {
    console.log("getAllChallengesOfThisLabFromDB == documents> ",documents);
    res.status(200).json({
      message: "All Lab Challenges Of This Lab From DB Downloaded.",
      AllChallengesOfThisLabFromDB: documents,
    });

    console.log("   ==> {/getAllChallengesOfThisLabFromDB} All Lab Challenges of this lab were downloaded."+req.body.LabJoinCode);
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
    LabJoinCode: req.body.LabJoinCode,
    labTaskTitle: req.body.labTaskTitle,
    labTaskQuestion: req.body.labTaskQuestion,
    labTaskAnswer: req.body.labTaskAnswer,
    labTaskXPs: req.body.labTaskXPs,
    AttemptedByStudents: req.body.AttemptedByStudents
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
    LabJoinCode: req.body.LabJoinCode,
    ChallengeQuestionType: req.body.ChallengeQuestionType,
    ChallengeQuestion: req.body.ChallengeQuestion,
    ChallengeOptionA: req.body.ChallengeOptionA,
    ChallengeOptionB: req.body.ChallengeOptionB,
    ChallengeOptionC: req.body.ChallengeOptionC,
    ChallengeOptionD: req.body.ChallengeOptionD,
    ChallengeCorrectOption: req.body.ChallengeCorrectOption,
    ChallengeXPs: req.body.ChallengeXPs,
    ChallengeAllowedTime: req.body.ChallengeAllowedTime,
    AttemptedByStudents: req.body.AttemptedByStudents
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
