const express = require("express");

const StudentActivityHistory = require("../models/student-backend-models/StudentActivityHistory");
const router = express.Router();








router.post("/createAStudentActivityHistoryDocument", (req, res, next) => {
  const studentActivityHistory = new StudentActivityHistory({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    StudentzUsername: req.body.StudentzUsername, //foreign key
    StudentzFullName: req.body.StudentzFullName,

    Activity: req.body.Activity,
    GainedOrLoosedXPsCount: req.body.GainedOrLoosedXPsCount,
    AttemptedQuestion: req.body.AttemptedQuestion,
    Passed: req.body.Passed,
    Failed: req.body.Failed,
    TimeAndDate: req.body.TimeAndDate,
    wasPromotedOrDemotedToLevel: req.body.wasPromotedOrDemotedToLevel,

    // LabJoinCode: req.body.LabJoinCode, //foreign key
    // StudentzUsername: req.body.StudentzUsername, //foreign key
    // wasPromoted: req.body.wasPromoted,
    // wasDemoted: req.body.wasDemoted,
    // wasWarned: req.body.wasWarned,
    // wasAppreciated: req.body.wasAppreciated,
    // wasExpelled: req.body.wasExpelled,

    // LabTaskQuestion: req.body.LabTaskQuestion,
    // LabChallengeQuestionType: req.body.LabChallengeQuestionType,
    // LabChallengeQuestion: req.body.LabChallengeQuestion,
    // GainedOrLoosedXPsCount: req.body.GainedOrLoosedXPsCount,

    // LabTaskOrChallengeAttempted: req.body.LabTaskOrChallengeAttempted,
    // LabTaskOrChallengeChecked: req.body.LabTaskOrChallengeChecked,
    // LabTaskOrChallengeFailedDueToTimeout:
    //   req.body.LabTaskOrChallengeFailedDueToTimeout,
  });

  studentActivityHistory
    .save()
    .then((result) => {
      res.status(201).json({
        message: "create A Student Activity History Document",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createAStudentActivityHistoryDocument } req.body.StudentzUsername == ",
    studentActivityHistory
  );
});


router.post("/fetchThisRivalzActivitiesHistory", (req, res, next) => {
  StudentActivityHistory.find({
    LabJoinCode: req.body.LabJoinCode,
    StudentzUsername: req.body.StudentzUsername,
  })
    .then((document) => {
      console.log(
        "req.body.StudentzUsername ::....",
        req.body.StudentzUsername
      );
      console.log("High 7 Achievers below ::....", document);
      console.log(
        "LabJoinCode: req.body.LabJoinCode ::....",
        req.body.LabJoinCode
      );
      res.status(200).json({
        message: "Rivals Activities Downloaded.",
        FetchedThisRivalzActivitiesHistory: document,
      });

      // console.log("   ==> {/Fetch7HighAchieversOfThisLab} ");
      // console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      // console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

router.get("/DeleteEntireStudentActivityHistory/", (req, res, next) => {
  StudentActivityHistory.deleteMany().then((result) => {
     res.status(200).json({
       message: "DeleteEntireStudentActivityHistory!",
       result: result,
     });
    });
});




module.exports = router;
