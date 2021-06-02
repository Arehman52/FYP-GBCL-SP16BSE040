import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { LabsService } from 'src/app/Services/labs.service';

@Component({
  selector: 'app-manage-labtasks',
  templateUrl: './manage-labtasks.component.html',
  styleUrls: ['./manage-labtasks.component.css']
})
export class ManageLabtasksComponent implements OnInit {

  constructor(private labsService:LabsService) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem('LabID');
    this.setAllErrorsToFalse();
    this.AllLabTasks = this.labsService.GetAllLabTasksFromDB();


    setTimeout(()=>{
      this.extractLabTasksOfThisLab();
    },2500);
  }






  DeleteThisTask(taskId:string){
    this.labsService.DeletThisLabTask(taskId);
    this.Errors.LabTaskDeleted.status = true;
    setTimeout(()=>{window.location.reload()},3600);
  }






  AllLabTasks:LabTasksmodel[] = [];
  LabTasksOfThisLab:LabTasksmodel[] = [];
  // RegisteredLabs = [{ _id: 'wddwd', LabTitle: ' titlell' }];
  LabID: string = '';
  MessageForModal: string;
  showSpinner: false;


  extractLabTasksOfThisLab(){

    for(let i=0; i<this.AllLabTasks.length;i++){
      if(this.AllLabTasks[i].LabJoinCode == this.LabID){
        this.LabTasksOfThisLab.push(this.AllLabTasks[i]);
      }
    }
    console.log("this.LabTasksOfThisLab : ", this.LabTasksOfThisLab);
  }



  createLabTask(createLabTaskForm: NgForm, XPsSelect: HTMLSelectElement) {

    if (createLabTaskForm.value.LabTaskAnswer == undefined || null) {
      createLabTaskForm.value.LabTaskAnswer = '';
    }

    var taskTitle = createLabTaskForm.value.LabTaskQuestion.substring(0,27);
    taskTitle += '...';

    let labtask: LabTasksmodel = {
      LabJoinCode: this.LabID, _id: '', AttemptedByStudents: [], LabTaskAnswer: createLabTaskForm.value.LabTaskAnswer, LabTaskQuestion: createLabTaskForm.value.LabTaskQuestion, LabTaskTitle: taskTitle, LabTaskXPs: parseInt(XPsSelect.value)
    };


    console.log(labtask);
    this.labsService.createLabTask(labtask);

    this.Errors.emptyField.status = true;
    this.Errors.LabTaskCreated.status = true;
    setTimeout(()=>{
      window.location.reload()


    },3000);
}

  displayThisMessageInModal(Message: string, modalButtonReferrence: HTMLButtonElement) {
    this.MessageForModal = Message;
    modalButtonReferrence.click();
  }




  checkAnswerStatement(Answer: string) {
    if (Answer.length == 0) { this.Errors.emptyField.status = true }
    else { this.Errors.emptyField.status = false }

    if (Answer.length < 28) { this.Errors.invalidAnswer.status = true }
    else { this.Errors.invalidAnswer.status = false }
  }


  checkQuestionStatement(Question: string) {
    if (Question.length == 0) { this.Errors.emptyField.status = true }
    else { this.Errors.emptyField.status = false }

    if (Question.length < 28) { this.Errors.invalidQuestion.status = true }
    else { this.Errors.invalidQuestion.status = false }
  }

  checkIfXPsNotSelected(XPsSelect: HTMLSelectElement) {
    if (XPsSelect.value == 'Choose...') { this.Errors.XPsNotSelected.status = true; }
    else { this.Errors.XPsNotSelected.status = false; }
  }
  checkIfErrors(): boolean {
    return (
      this.Errors.XPsNotSelected.status
      || this.Errors.invalidQuestion.status
      || this.Errors.invalidAnswer.status
      || this.Errors.emptyField.status
      || this.Errors.LabTaskCreated.status
      || this.Errors.LabTaskDeleted.status);
  }



  setAllErrorsToFalse() {
    this.Errors.invalidQuestion.status = false;
    this.Errors.invalidAnswer.status = false;
    this.Errors.emptyField.status = true;
    // this.Errors.XPsNotSelected.status = false;
    this.Errors.LabTaskCreated.status = false;
    this.Errors.LabTaskDeleted.status = false;
  }




  Errors = {
    LabTaskCreated: {
      status: true,
      message: 'Lab Task is Created.',
    },
    emptyField: {
      status: true,
      message: 'Field cannot be empty.',
    },
    LabTaskDeleted: {
      status: true,
      message: 'Lab Task is Deleted.',
    },
    XPsNotSelected: {
      status: true,
      message: 'Lab Join request of this member is Accepted.',
    },
    invalidQuestion: {
      status: true,
      message: 'This doesn\'t seem to be a question, add more characters.',
    },
    invalidAnswer: {
      status: true,
      message: 'This doesn\'t seem to be an Answer, add more characters.',
    }
  };
  localStorageUsername = localStorage.getItem("UsersUsername");



  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/TEACHER"
  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }


}
