const express = require("express");

const LabTask = require("../models/lab-backend-models/labTask");
const router = express.Router();





router.delete("/DeleteThisLabTask/:Id", (req, res, next) => {
  LabTask.deleteOne({ _id: req.params.Id }).then((result) => {
    res.status(200).json({
      message: "Lab Task Deleted!",
      result: result,
    });
  });
});

router.put("/UpdateThisLabTask/", (req, res, next) => {
  const labTask = new LabTask({
    _id: req.body._id,
    LabJoinCode: req.body.LabJoinCode,
    LabTaskTitle: req.body.LabTaskTitle,
    LabTaskQuestion: req.body.LabTaskQuestion,
    LabTaskAnswer: req.body.LabTaskAnswer,
    TaskBeingAttempted: req.body.TaskBeingAttempted,
    LabTaskXPs: req.body.LabTaskXPs,
    AttemptedByStudents: req.body.AttemptedByStudents,
  });
  LabTask.updateOne({_id: req.body._id},labTask ).then((result) => {
    res.status(200).json({
      message: "/UpdateThisLabTask donee!",
      result: result,
    });
  });
});


router.get("/UpdateAllTasks_TaskBeingAttempted", (req, res, next) => {

  LabTask.updateMany({},{TaskBeingAttempted:false} ).then((result) => {
    res.status(200).json({
      message: "TaskBeingAttempted",
      result: result,
    });
  });
});




// GetAllLabTasksFromDB
router.get("/GetAllLabTasksFromDB", (req, res, next) => {
  LabTask.find().then((documents) => {
    res.status(200).json({
      message: "All Lab Tasks Downloaded.",
      labTasks: documents,
    });

    console.log(
      "   ==> {/GetAllLabTasksFromDB} All Lab Tasks were downloaded."
    );
  });
});


// AllLabTasksOfThisLabFromDB
router.post("/getAllLabTasksOfThisLabFromDB", (req, res, next) => {
  LabTask.find({ LabJoinCode: req.body.LabJoinCode }).then((documents) => {
    res.status(200).json({
      message: "All Lab Tasks Of This Lab From DB Downloaded.",
      AllLabTasksOfThisLabFromDB: documents,
    });

    console.log(
      "   ==> {/AllLabTasksOfThisLabFromDB} All Lab Tasks of this lab were downloaded."
    );
  });
});



//=======================================================================YE WALI
router.post("/CreateLabTask", (req, res, next) => {
  const labTask = new LabTask({
    LabJoinCode: req.body.LabJoinCode,
    LabTaskTitle: req.body.LabTaskTitle,
    LabTaskQuestion: req.body.LabTaskQuestion,
    LabTaskAnswer: req.body.LabTaskAnswer,
    TaskBeingAttempted:req.body.TaskBeingAttempted,
    LabTaskXPs: req.body.LabTaskXPs,
    AttemptedByStudents: req.body.AttemptedByStudents,
  });

  console.log("labTask : ", labTask);
  labTask
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Lab Task created succefully!",
        JustCreatedLabTask: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

});


module.exports = router;
