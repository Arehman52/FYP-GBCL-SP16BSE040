import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { LabUtilitiesService } from 'src/app/Services/lab-utilities.service';
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
    let objLabJoinCode:{LabID:string} = {LabID:this.LabID};
    this.AllLabTasksOfThisLabFromDB = this.labsService.getAllLabTasksOfThisLabFromDB(objLabJoinCode);
    this.AllStudentAttemptedLabTasksOfthisStudandThisLab = this.studentLabDataService.RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    setTimeout(() => {
      this.extractUnAttemptedLabTasks();
      console.log("this.AllLabTasksOfThisLabFromDB ::: ",this.AllLabTasksOfThisLabFromDB);
      // console.log("this.allAttemptedLabTasks ::: ",this.allAttemptedLabTasks);
      console.log("this.AllStudentAttemptedLabTasksOfthisStudandThisLab***********",this.AllStudentAttemptedLabTasksOfthisStudandThisLab);

      // console.log("this.AllAttemptedLabTasksOfThisStudent ::: ",this.AllAttemptedLabTasksOfThisStudent);
      // console.log("this.AllAttemptedLabTasksOfThisLab ::: ",this.AllAttemptedLabTasksOfThisLab);
    }, 1200);
  }



  showEditorAndOthererWindows = false;
  taskTitleOfTaskBeiingCurrentlyAttempted = '';
  TaskQuestion: string = '';
  CURRRENT_TASK_ID = '';
  localStorageUsername = localStorage.getItem("UsersUsername");
  LabID = localStorage.getItem("LabID");



  AllLabTasksOfThisLabFromDB: LabTasksmodel[] = [];
  AllStudentAttemptedLabTasksOfthisStudandThisLab:StudentAttemptedLabTaskmodel[]=[];

  // allAttemptedLabTasks: StudentAttemptedLabTaskmodel[] = [];
  attemptedLabTasks:LabTasksmodel[] = [];
  unAttemptedLabTasks:LabTasksmodel[] = [];

  // unattempted = alltasks - attempted
  extractUnAttemptedLabTasks(){
    this.unAttemptedLabTasks = [];
    this.attemptedLabTasks = [];
    for(let i=0;i<this.AllLabTasksOfThisLabFromDB.length;i++){
      for(let j=0;j<this.AllStudentAttemptedLabTasksOfthisStudandThisLab.length;j++){
        if(this.AllLabTasksOfThisLabFromDB[i]._id == this.AllStudentAttemptedLabTasksOfthisStudandThisLab[j].AttemptedLabTask_id){
          this.attemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
        }else{
          this.unAttemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
        }
      }
    }




    // REMOVING DUPLICACY OF UNATTEMPETED TASKS

    let distinctUnAtttemptedLabTasks:LabTasksmodel[] = [];
    for(let i=0; i<this.unAttemptedLabTasks.length;i++){
      let matched = false;
      for(let j=0;j<distinctUnAtttemptedLabTasks.length;j++){
        if(distinctUnAtttemptedLabTasks[j]._id == this.unAttemptedLabTasks[i]._id){
          matched = true;
        }
      }
      if(!matched){
        distinctUnAtttemptedLabTasks.push(this.unAttemptedLabTasks[i]);
      }
    }


    this.attemptedLabTasks = distinctUnAtttemptedLabTasks;
    console.log("distinctUnAtttemptedLabTasks ----- ",distinctUnAtttemptedLabTasks);



    console.log("this.attemptedLabTasks", this.attemptedLabTasks);
    console.log("this.unAttemptedLabTasks", this.unAttemptedLabTasks);

  }






  extractlabTasksOfThisLabForThisStudent() {
    // for (let i = 0; i < this.AllAttemptedLabTasks.length; i++) {
    //   if (this.allAttemptedLabTasks[i].StudentzUsername == this.localStorageUsername
    //     && this.allAttemptedLabTasks[i].LabJoinCode == this.LabID
    //   ) {

    //     // this.UnattemptedLabTasksOfThisLab_ForThisStudent[0].
    //   }
    // }
  }



  // extractlabTasksOfThisLab(){
  //   for(let i=0;i<this.LabTasks.length;i++){
  //     if(this.LabTasks[i].LabID == localStorage.getItem('LabID')){
  //       this.LabTasksOfThisLab.push(this.LabTasks[i]);
  //     }
  //   }
  // }



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
  onSubmitLabTaskClicked(codeForm: NgForm) {

    // const data = {
    //   theCode: codeForm.value.theCode,
    //   theInput: codeForm.value.theInput,
    //   theOutput: codeForm.value.theOutput,
    //   LabtaskId: this.CURRRENT_TASK_ID
    // };

    let labTask: StudentAttemptedLabTaskmodel = { LabJoinCode: this.LabID, GainedXPs: 0, LabTaskAnswerCode: codeForm.value.theCode, LabTaskAnswerInput: codeForm.value.theInput, LabTaskAnswerOutput: codeForm.value.theOutput, LabTaskQuestion: this.TaskQuestion, LabTaskAttempted: true, LabTaskChecked: false, StudentzUsername: this.localStorageUsername, _id: '', AttemptedLabTask_id: this.CURRRENT_TASK_ID };


    //create Attempted Lab Task.
    this.studentLabDataService.createThisStudentAttemptedLabTask(labTask);
    // this.studentLabDataService.createThisStudentAttemptedLabChallenge();






    // console.log(results);
    // console.log(data);
  }



  setID(Taskid: string) {
    this.CURRRENT_TASK_ID = Taskid;
  }



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
    this.CURRRENT_TASK_ID = task._id;
    this.TaskQuestion = task.labTaskQuestion;
    this.showEditorAndOthererWindows = true;
    this.taskTitleOfTaskBeiingCurrentlyAttempted = task.labTaskTitle;
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
