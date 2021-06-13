const express = require("express");

const  StudentAttemptedLabChallenge = require("../models/student-backend-models/StudentAttemptedLabChallenge");
const router = express.Router();



router.post(
  "/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab/",
  (req, res, next) => {
    StudentAttemptedLabChallenge.find({
      StudentzUsername: req.body.StudentzUsername,
      LabJoinCode: req.body.LabJoinCode,
    })
      .then((document) => {
        console.log("document::....", document);
        res.status(200).json({
          message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
          AllStudentAttemptedChallengesOfthisStudandThisLab: document,
        });

        console.log(
          "  {/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab} ==> req.body.StudentzUsername =",
          req.body.StudentzUsername
        );
      })
      .catch((err) => {
        console.log(" 004 theeeen eeerrrororrorr\n", err);
      });
  }
);

router.post(
  "/RecieveAllStudentAttemptedMCQLabChallengesOfthisStudandThisLab/",
  (req, res, next) => {
    StudentAttemptedLabChallenge.find({
      StudentzUsername: req.body.StudentzUsername,
      LabJoinCode: req.body.LabJoinCode,
      LabChallengeQuestionType: "MCQ",
    }).then((document) => {
      console.log("999999999docz", document);
      res.status(200).json({
        message: " 001 USER HAS BEEN, RETRIEVED FOR SIGNIN",
        AllStudentAttemptedMCQLabChallengesOfthisStudandThisLab: document,
      });
    });
  }
);

router.put(
  "/updateThisStudentAttemptedLabChallenge/:StudentzUsernameAndLabID",
  (req, res, next) => {
    const updatedAttemptedLabChallenge = new StudentAttemptedLabChallenge({
      _id: req.body._id,
      LabJoinCode: req.body.LabJoinCode, //foreign key
      AttemptedLabChallenge_id: req.body.AttemptedLabChallenge_id,
      StudentzUsername: req.body.StudentzUsername, //foreign key
      LabChallengeQuestionType: req.body.LabChallengeQuestionType,
      LabChallengeQuestion: req.body.LabChallengeQuestion,
      LabChallengeAnswerOptionA: req.body.LabChallengeAnswerOptionA,
      LabChallengeAnswerOptionB: req.body.LabChallengeAnswerOptionB,
      LabChallengeAnswerOptionC: req.body.LabChallengeAnswerOptionC,
      LabChallengeAnswerOptionD: req.body.LabChallengeAnswerOptionD,
      GainedXPs: req.body.GainedXPs,
      ChallengeAttempted: req.body.ChallengeAttempted,
      ChallengeChecked: req.body.ChallengeChecked,
      ChallengeFailedDueToTimeShortage:
        req.body.ChallengeFailedDueToTimeShortage,
      ChallengeCheated: req.body.ChallengeCheated,

      ChallengeXPs: req.body.ChallengeXPs,
      ChallengeSolutionByTeacher: req.body.ChallengeSolutionByTeacher,
      ChallengeMatchPercentage: req.body.ChallengeMatchPercentage,
    });

    StudentAttemptedLabChallenge.updateOne(
      {
        StudentzUsername: req.body.StudentzUsername,
        LabJoinCode: req.body.LabJoinCode,
      },
      updatedAttemptedLabChallenge
    )
      .then((result) => {
        res.status(200).json({
          message: "updated This Student Attempted Lab Challenge!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Current Stats FAILED TO GET Updated!",
          result: result,
        });
      });
    // console.log('   ==> {/UpdateThisUser/:Id} Username == ',user.Username);
  }
);

router.post("/createThisStudentAttemptedLabChallenge", (req, res, next) => {
  const studentAttemptedLabChallenge = new StudentAttemptedLabChallenge({
    LabJoinCode: req.body.LabJoinCode, //foreign key
    AttemptedLabChallenge_id: req.body.AttemptedLabChallenge_id,
    StudentzUsername: req.body.StudentzUsername, //foreign key
    LabChallengeQuestionType: req.body.LabChallengeQuestionType,
    LabChallengeQuestion: req.body.LabChallengeQuestion,
    LabChallengeAnswerOptionA: req.body.LabChallengeAnswerOptionA,
    LabChallengeAnswerOptionB: req.body.LabChallengeAnswerOptionB,
    LabChallengeAnswerOptionC: req.body.LabChallengeAnswerOptionC,
    LabChallengeAnswerOptionD: req.body.LabChallengeAnswerOptionD,
    GainedXPs: req.body.GainedXPs,
    ChallengeAttempted: req.body.ChallengeAttempted,
    ChallengeChecked: req.body.ChallengeChecked,
    ChallengeFailedDueToTimeShortage: req.body.ChallengeFailedDueToTimeShortage,
    ChallengeCheated: req.body.ChallengeCheated,

    ChallengeXPs: req.body.ChallengeXPs,
    ChallengeSolutionByTeacher: req.body.ChallengeSolutionByTeacher,
    ChallengeMatchPercentage: req.body.ChallengeMatchPercentage,
  });

  studentAttemptedLabChallenge
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Student Attempted Challenge data stored in db succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createThisStudentAttemptedLabChallenge} createThisStudentAttemptedLabChallenge == ",
    studentAttemptedLabChallenge
  );
});

router.delete(
  "/deleteThisStudentAttemptedLabChallenge/:Id",
  (req, res, next) => {
    StudentAttemptedLabChallenge.deleteOne({ _id: req.params.Id }).then(
      (result) => {
        res.status(200).json({
          message: "deleted This Student Attempted Lab Challenge!",
          result: result,
        });
      }
    );
  }
);
router.delete(
  "/deleteALLStudentAttemptedLabChallengesOfThisStudent/:Id",
  (req, res, next) => {
    StudentAttemptedLabChallenge.delete(
      {
        StudentzUsername:req.body.StudentzUsername,
        LabJoinCode: req.body.LabJoinCode
      }).then(
      (result) => {
        res.status(200).json({
          message: "deleteALLStudentAttemptedLabChallengesOfThisStudent for ::"+req.body.StudentzUsername,
          result: result,
        });
      }
    );
  }
);





module.exports = router;
