const express = require("express");

const LabChallenge = require("../models/lab-backend-models/labChallenge");
const router = express.Router();




router.delete("/DeleteThisLabChallenge/:Id", (req, res, next) => {
  LabChallenge.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "Lab Challenge Deleted!",
      result: result,
    });
  });
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
    AttemptedByStudents: req.body.AttemptedByStudents,
  });

  LabChallenge.updateOne({ _id: req.params.Id }, labChallenge).then(
    (result) => {
      res.status(200).json({
        message:
          "Lab Challenge of type: " +
          req.body.ChallengeQuestionType +
          " Updated!",
        result: result,
      });
    }
  );
  console.log(
    "   ==> {/UpdateThisLabChallenge/:Id} LabChallenge updated of type == ",
    req.body.ChallengeQuestionType
  );
});


router.post("/getAllChallengesOfThisLabFromDB", (req, res, next) => {
  LabChallenge.find({ LabJoinCode: req.body.LabJoinCode }).then((documents) => {
    console.log("getAllChallengesOfThisLabFromDB == documents> ", documents);
    res.status(200).json({
      message: "All Lab Challenges Of This Lab From DB Downloaded.",
      AllChallengesOfThisLabFromDB: documents,
    });

    console.log(
      "   ==> {/getAllChallengesOfThisLabFromDB} All Lab Challenges of this lab were downloaded." +
        req.body.LabJoinCode
    );
  });
});

// GetAllLabChallengesFromDB
router.get("/GetAllLabChallengesFromDB", (req, res, next) => {
  LabChallenge.find().then((documents) => {
    res.status(200).json({
      message: "All Lab Challenges Downloaded.",
      labChallenges: documents,
    });

    console.log(
      "   ==> {/GetAllLabChallengesFromDB} All Lab Challenges were downloaded."
    );
  });
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
    AttemptedByStudents: req.body.AttemptedByStudents,
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

  console.log(
    "   ==> {/CreateLabChallenge} ChallengeQuestionType == ",
    labChallenge.ChallengeQuestionType
  );
});






module.exports = router;
