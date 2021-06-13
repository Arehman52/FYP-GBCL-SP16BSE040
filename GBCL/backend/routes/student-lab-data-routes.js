const express = require("express");

// const Labs = require("../models/lab-backend-models/lab");
// const LabChallenge = require("../models/lab-backend-models/labChallenge");
const StudLabDataAndStats = require("../models/student-backend-models/StudLabDataAndStats");
const StudentAttemptedLabChallenge = require("../models/student-backend-models/StudentAttemptedLabChallenge");
const StudentAttemptedLabTask = require("../models/student-backend-models/StudentAttemptedLabTask");
const router = express.Router();



router.post("/createFreshStudentLabDataRecord", (req, res, next) => {
  const studLabDataAndStats = new StudLabDataAndStats({
    LabJoinCode: req.body.LabJoinCode, //as a foreign key
    StudentzUsername: req.body.StudentzUsername, //as a foreign key
    StudentzFN: req.body.StudentzFN,
    StudentzLN: req.body.StudentzLN,
    LevelUpdateViewed: req.body.LevelUpdateViewed, // if false, then show a level updated Modal and then update it to false.

    AppreciateUpdateViewed: req.body.AppreciateUpdateViewed,
    WarnUpdateViewed: req.body.WarnUpdateViewed,
    Promoted: req.body.Promoted,
    Demoted: req.body.Demoted,
    RivalStudents: req.body.RivalStudents,
    currentXPs: req.body.currentXPs,
    currentLevel: req.body.currentLevel,
    currentBadge: req.body.currentBadge,
    currentCPPs: req.body.currentCPPs,
    Warned: req.body.Warned,
    Appreciated: req.body.Appreciated,
    StudentzLabAccessStatus: req.body.StudentzLabAccessStatus,
  });

  studLabDataAndStats
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Lab Fresh Data of student created succefully!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  console.log(
    "   ==> {/createFreshStudentLabDataRecord} studLabDataAndStats == ",
    studLabDataAndStats
  );
});

router.delete(
  "/deleteCurrentStatsOfThisStudent/:StudentzUsername",
  (req, res, next) => {
    StudLabDataAndStats.deleteOne({
      StudentzUsername: req.params.StudentzUsername,
    }).then((result) => {
      res.status(200).json({
        message: "User Deleted!",
        result: result,
      });
    });
  }
);













router.put(
  "/RESET_CurrentStatsOfThisLabzALLStudents/",
  (req, res, next) => {
    StudLabDataAndStats.updateMany(
      {
        LabJoinCode: req.body.LabJoinCode,
      },
      {LevelUpdateViewed:false, WarnUpdateViewed:false,AppreciateUpdateViewed:false, Demoted:false, Promoted:false, RivalStudents:[], currentBadge:'Beginner I', currentLevel:1, currentXPs:0, Warned:false, Appreciated:false, StudentzLabAccessStatus:'Allowed' }
    )
      .then((result) => {
        res.status(200).json({
          message: "RESET_CurrentStatsOfThisLabzALLStudents!",
          result: result,
        });
      })
   }
);


















router.put(
  "/updateCurrentStatsOfThisStudent/:StudentzUsernameAndLabID",
  (req, res, next) => {
    const updatedStats = new StudLabDataAndStats({
      _id: req.body._id,
      LabJoinCode: req.body.LabJoinCode, //as a foreign key
      StudentzUsername: req.body.StudentzUsername, //as a foreign key
      StudentzFN: req.body.StudentzFN,
      StudentzLN: req.body.StudentzLN,
      LevelUpdateViewed: req.body.LevelUpdateViewed, // if false, then show a level updated Modal and then update it to false.
      WarnUpdateViewed: req.body.WarnUpdateViewed,
      AppreciateUpdateViewed: req.body.AppreciateUpdateViewed,
      Demoted: req.body.Demoted, // if false, then show a level updated Modal and then update it to false.
      Promoted: req.body.Promoted,
      RivalStudents: req.body.RivalStudents,
      currentXPs: req.body.currentXPs,
      currentLevel: req.body.currentLevel,
      currentBadge: req.body.currentBadge,
      currentCPPs: req.body.currentCPPs,
      Warned: req.body.Warned,
      Appreciated: req.body.Appreciated,
      StudentzLabAccessStatus: req.body.StudentzLabAccessStatus,
    });

    StudLabDataAndStats.updateOne(
      {
        StudentzUsername: req.body.StudentzUsername,
        LabJoinCode: req.body.LabJoinCode,
      },
      updatedStats
    )
      .then((result) => {
        res.status(200).json({
          message: "Current Stats Of This Student Updated!",
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

router.post("/getCurrentStatsOfThisStudent", (req, res, next) => {
  StudLabDataAndStats.findOne({
    StudentzUsername: req.body.StudentzUsername,
    LabJoinCode: req.body.LabJoinCode,
  })
    .then((document) => {
      console.log("Current Stats Downloaded.::....", document);
      res.status(200).json({
        message: "Current Stats Downloaded.",
        currentStatsOfThisStudent: document,
      });

      console.log(
        "   ==> {/getCurrentStatsOfThisStudent} Current Stats Of Student == ",
        req.body.StudentzUsername
      );
      console.log(
        "req.body.StudentzUsername,  @@ =  ",
        req.body.StudentzUsername
      );
      console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
});

router.post("/Fetch7HighAchieversOfThisLab", (req, res, next) => {
  StudLabDataAndStats.find({
    LabJoinCode: req.body.LabJoinCode,
  })
    .sort({ currentXPs: -1 })
    .limit(7)
    .then((document) => {
      console.log("High 7 Achievers below ::....", document);
      res.status(200).json({
        message: "Current Stats Downloaded.",
        Fetched7HighAchievers: document,
      });

      console.log("   ==> {/Fetch7HighAchieversOfThisLab} ");
      console.log("req.body.LabJoinCode  @@ =  ", req.body.LabJoinCode);
    })
    .catch((err) => {
      res.status(500).json({
        message: "FAILLLELELELED.",
        currentStatsOfThisStudent: document,
      });
      console.log(" 004 theeeen eeerrrororrorr\n", err);
    });
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

// router.get("/ResetCompleteStudentAttemptedLabChallengesCollection/", (req, res, next) => {
//   StudentAttemptedLabChallenge.deleteMany().then((result) => {
//     res.status(200).json({
//       message: "Reset Complete Student Attempted Lab Challenges Collection!",
//       result: result
//     });
//   });
// });

router.get("/ResetEntrireDatabase/", (req, res, next) => {
  StudLabDataAndStats.deleteMany().then((result) => {
   });
   StudentAttemptedLabChallenge.deleteMany().then((result) => {
     // res.status(200).json({
     //   message: "Entire Lab Challenge DELETED ResetEntrireDatabase!",
     //   result: result,
     // });
   });
  StudentActivityHistory.deleteMany().then((result) => {
    // res.status(200).json({
    //   message: "Entire Lab Challenge DELETED ResetEntrireDatabase!",
    //   result: result,
    // });
  });
  StudentAttemptedLabTask.deleteMany().then((result) => {
    res.status(200).json({
      message: "Entire Databse Ressetted For Studentz all collections!",
      result: result,
    });
  });
});


router.ge



module.exports = router;
