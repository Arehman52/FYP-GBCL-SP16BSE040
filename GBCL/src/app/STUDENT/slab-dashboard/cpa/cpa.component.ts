import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { LabUtilitiesService } from 'src/app/Services/lab-utilities.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent implements OnInit {

  constructor(private labUtils: LabUtilitiesService, private studentLabDataService: StudentLabDataService){}
  ngOnInit(): void {
    this.LabTasks = this.labUtils.getLabTasks();


    setTimeout(()=>{
      this.extractlabTasksOfThisLab();
    },1000);
  }



  showEditorAndOthererWindows = false;
  taskTitleOfTaskBeiingCurrentlyAttempted  = '';
  TaskQuestion:string = '';
  CurrentTaskID  = '';
  localStorageUsername = localStorage.getItem("UsersUsername");
  LabID = localStorage.getItem("LabID");
  LabTasks: LabTasksmodel[] = [];
  LabTasksOfThisLab: LabTasksmodel[] = [];
  UnattemptedLabTasksOfThisLab_ForThisStudent: LabTasksmodel[] = [];



  extractlabTasksOfThisLab(){
    for(let i=0;i<this.LabTasks.length;i++){
      if(this.LabTasks[i].LabID == localStorage.getItem('LabID')){
        this.LabTasksOfThisLab.push(this.LabTasks[i]);
      }
    }
  }



  checkOutput(codeForm: NgForm){
    if(codeForm.value.theOutput  == ""){
      this.Errors.emptyOutputFields.status = true;
    }else{
      this.Errors.emptyOutputFields.status = false;
    }
  }
  checkCode(codeForm: NgForm){
    if(codeForm.value.theCode == ""){
      this.Errors.emptyCodeFields.status = true;
    }else{
      this.Errors.emptyCodeFields.status = false;
    }
  }
  onSubmitLabTaskClicked(codeForm: NgForm){

    const data = {
      theCode : codeForm.value.theCode,
      theInput : codeForm.value.theInput,
      theOutput : codeForm.value.theOutput,
      LabtaskId: this.CurrentTaskID
    };

    let labTask:StudentAttemptedLabTaskmodel = {LabJoinCode:this.LabID,GainedXPs:0,LabTaskAnswerCode:codeForm.value.theCode,LabTaskAnswerInput:codeForm.value.theInput,LabTaskAnswerOutput:codeForm.value.theOutput,LabTaskQuestion:this.TaskQuestion, LabTaskAttempted:true,LabTaskChecked:false, StudentzUsername:this.localStorageUsername,_id:'dwdwdwdw',AttemptedLabTask_id: 'strinmdkwad;mawdg'};


    //create Attempted Lab Task.
    this.studentLabDataService.createThisStudentAttemptedLabTask(labTask);
    // this.studentLabDataService.createThisStudentAttemptedLabChallenge();






    // console.log(results);
    console.log(data);
  }



  setID(Taskid:string){
    this.CurrentTaskID = Taskid;
  }



  checkIfErrors():boolean{
    return (this.Errors.emptyOutputFields.status || this.Errors.emptyCodeFields.status);
  }

  setAllErrorsToFalse(){

  }


  Errors = {
    emptyFields:{
      status: true,
      message: "Fields cannot be empty"
    },
    emptyOutputFields:{
      status: true,
      message: "Output field cannot be empty"
    },
    emptyCodeFields:{
      status: true,
      message: "Code field cannot be empty"
    }
  }






  onAttemptClicked(task:LabTasksmodel){
    this.CurrentTaskID = task._id;
    this.TaskQuestion = task.labTaskQuestion;
    this.showEditorAndOthererWindows = true;
    this.taskTitleOfTaskBeiingCurrentlyAttempted = task.labTaskTitle;
  }


  onLogout(){
    localStorage.clear();
  window.location.href="/";
}

onExitLabClicked(){
  localStorage.removeItem('LabID');
  window.location.href="/STUDENT"
}



}
