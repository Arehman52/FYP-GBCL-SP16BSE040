import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
// import { LabUtilitiesService } from 'src/app/Services/lab-utilities.service';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent implements OnInit {

  constructor(private studentLabDataService: StudentLabDataService, private labsService: LabsService) { }

  ngOnInit(): void {
    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    this.AllLabTasksOfThisLabFromDB = this.labsService.getAllLabTasksOfThisLabFromDB(objLabJoinCode);
    this.AllStudentAttemptedLabTasksOfthisStudandThisLab = this.studentLabDataService.RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    setTimeout(() => {
      this.extractUnAttemptedLabTasks();

      console.log("this.attemptedLabTasks : ",this.attemptedLabTasks);
      console.log("this.unAttemptedLabTasks : ",this.unAttemptedLabTasks);
      console.log("this.AllLabTasksOfThisLabFromDB : ",this.AllLabTasksOfThisLabFromDB);
      console.log("this.AllStudentAttemptedLabTasksOfthisStudandThisLab : ",this.AllStudentAttemptedLabTasksOfthisStudandThisLab);
    }, 1200);
  }



  showEditorAndOthererWindows = false;
  taskTitleOfTaskBeiingCurrentlyAttempted = '';
  TaskQuestion: string = '';
  CURRRENT_TASK_BEING_ATTEMPTED:LabTasksmodel = null;
  localStorageUsername = localStorage.getItem("UsersUsername");
  localStorageFullName = localStorage.getItem("UserzFirstNameOfUser")+' '+ localStorage.getItem("UserzLastNameOfUser") ;
  LabID = localStorage.getItem("LabID");



  AllLabTasksOfThisLabFromDB: LabTasksmodel[] = [];
  AllStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] = [];
  attemptedLabTasks: LabTasksmodel[] = [];
  unAttemptedLabTasks: LabTasksmodel[] = [];

  extractUnAttemptedLabTasks() {
    this.unAttemptedLabTasks = [];
    this.attemptedLabTasks = [];

    for (let i = 0; i < this.AllLabTasksOfThisLabFromDB.length; i++) {
      if (this.AllLabTasksOfThisLabFromDB[i].AttemptedByStudents.includes(this.localStorageUsername)) {
        this.attemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      } else {
        this.unAttemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      }
    }

  }

    onSubmitLabTaskClicked(codeForm: NgForm) {


    let labTask: StudentAttemptedLabTaskmodel = {
      LabJoinCode: this.LabID, LabTaskXPs: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskXPs,
      LabTaskTitle: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskQuestion.substring(0,28)+"...", LabTaskAnswerByTeacher: this.CURRRENT_TASK_BEING_ATTEMPTED.LabTaskAnswer, GainedXPs: 0, LabTaskAnswerCode: codeForm.value.theCode, LabTaskAnswerInput: codeForm.value.theInput, LabTaskAnswerOutput: codeForm.value.theOutput, LabTaskQuestion: this.TaskQuestion, LabTaskAttempted: true, LabTaskChecked: false, StudentzUsername: this.localStorageUsername, _id: '', AttemptedLabTask_id: this.CURRRENT_TASK_BEING_ATTEMPTED._id
    };

    this.CURRRENT_TASK_BEING_ATTEMPTED.AttemptedByStudents.push(this.localStorageUsername);


    this.studentLabDataService.createThisStudentAttemptedLabTask(labTask);
    this.labsService.updateThisLabTask(this.CURRRENT_TASK_BEING_ATTEMPTED);
    codeForm.reset();
    this.Errors.emptyCodeFields.status = true;
    setTimeout(()=>{window.location.reload()},2700);
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////// NEXT STEPS/////////////////////////////////////////
    //   Still I need to update STUDENT ACTIVITY HISTORY here.
    //////////////////////////////////////////////////////////////////////////////

  }



  checkOutput(codeForm: NgForm) {
    if (codeForm.value.theOutput == "") {
      this.Errors.emptyOutputFields.status = true;
    } else {
      this.Errors.emptyOutputFields.status = false;
    }
  }
  checkCode(codeForm: NgForm) {
    if (codeForm.value.theCode == "") {
      this.Errors.emptyCodeFields.status = true;
    } else {
      this.Errors.emptyCodeFields.status = false;
    }
  }


  // setID(Taskid: string) {
  //   this.CURRRENT_TASK_ID = Taskid;
  // }



  checkIfErrors(): boolean {
    return (this.Errors.emptyOutputFields.status || this.Errors.emptyCodeFields.status);
  }

  setAllErrorsToFalse() {

  }


  Errors = {
    emptyFields: {
      status: true,
      message: "Fields cannot be empty"
    },
    emptyOutputFields: {
      status: true,
      message: "Output field cannot be empty"
    },
    emptyCodeFields: {
      status: true,
      message: "Code field cannot be empty"
    }
  }






  onAttemptClicked(task: LabTasksmodel) {
    this.CURRRENT_TASK_BEING_ATTEMPTED = task;
    this.TaskQuestion = task.LabTaskQuestion;
    this.showEditorAndOthererWindows = true;
    this.taskTitleOfTaskBeiingCurrentlyAttempted = task.LabTaskTitle;
  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }



}
