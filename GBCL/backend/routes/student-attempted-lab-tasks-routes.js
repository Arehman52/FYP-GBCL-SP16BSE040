const express = require("express");

const StudentAttemptedLabTask = require("../models/student-backend-models/StudentAttemptedLabTask");
const router = express.Router();

router.post("/createThisStudentAttemptedLabTask", (req, res, next) => {
  console.log("testAppearance!?");
  var stringSimilarity = require("string-similarity");

  var similarity = stringSimilarity.compareTwoStrings(
    req.body.LabTaskAnswerCode,
    req.body.LabTaskSolutionByTeacher
  );

  var Gainedxps = parseInt(similarity * req.body.LabTaskXPs + "", 10);

  const studentAttemptedLabTask = new StudentAttemptedLabTask({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    StudentzUsername: req.body.StudentzUsername, //foreign key
    AttemptedLabTask_id: req.body.AttemptedLabTask_id,
    LabTaskQuestion: req.body.LabTaskQuestion,
    LabTaskSolutionByTeacher: req.body.LabTaskSolutionByTeacher,
    LabTaskMatchPercentage: similarity,
    LabTaskAnswerCode: req.body.LabTaskAnswerCode,
    LabTaskAnswerOutput: req.body.LabTaskAnswerOutput,
    LabTaskAnswerInput: req.body.LabTaskAnswerInput,
    GainedXPs: Gainedxps,
    LabTaskAttempted: req.body.LabTaskAttempted,
    LabTaskChecked: req.body.LabTaskChecked,
    LabTaskTitle: req.body.LabTaskTitle,
    LabTaskXPs: req.body.LabTaskXPs,
  });

  studentAttemptedLabTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: "created This Student Attempted Lab Task in db succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createThisStudentAttemptedLabTask} createThisStudentAttemptedLabTask == ",
    studentAttemptedLabTask
  );
});

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfThisLab",
  (req, res, next) => {
    StudentAttemptedLabTask.find({ LabJoinCode: req.body.LabJoinCode }).then(
      (documents) => {
        console.log(
          "RecieveAllStudentAttemptedLabTasksOfThisLab =>@@@@@@" + documents
        );
        res.status(200).json({
          message: "Recieved All Student Attempted Lab Tasks Of This Lab.",
          AllStudentAttemptedLabTasksOfThisLab: documents,
        });
        console.log(
          "   ==> {/RecieveAllStudentAttemptedLabTasksOfThisLab} Recieved All Student Attempted Lab Tasks Of This Lab."
        );
      }
    );
  }
);

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfThisStudent",
  (req, res, next) => {
    StudentAttemptedLabTask.find({
      StudentzUsername: req.body.StudentzUsername,
    }).then((documents) => {
      console.log(
        "RecieveAllStudentAttemptedLabTasksOfThisStudent =>@@@@@@" + documents
      );
      res.status(200).json({
        message: "Recieved All Student Attempted Lab Tasks Of This Student.",
        AllStudentAttemptedLabTasksOfThisStudent: documents,
      });

      console.log(
        "   ==> {/RecieveAllStudentAttemptedLabTasksOfThisLab} Recieved All Student Attempted Lab Tasks Of This Student."
      );
    });
  }
);

router.post(
  "/RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab/",
  (req, res, next) => {
    StudentAttemptedLabTask.find({
      StudentzUsername: req.body.StudentzUsername,
      LabJoinCode: req.body.LabJoinCode,
    }).then((document) => {
      console.log("999999999docz", document);
      res.status(200).json({
        message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
        AllStudentAttemptedLabTasksOfthisStudandThisLab: document,
      });
    });
  }
);

router.get("/RecieveAllStudentAttemptedLabTasks", (req, res, next) => {
  StudentAttemptedLabTask.find().then((documents) => {
    res.status(200).json({
      message: "RecieveAllStudentAttemptedLabTasks recieved from DB",
      AllStudentAttemptedLabTasks: documents,
    });

    console.log(
      "   ==> {/RecieveAllStudentAttemptedLabTasks} All Attempted Lab Tasks were downloaded."
    );
  });
});


module.exports = router;
