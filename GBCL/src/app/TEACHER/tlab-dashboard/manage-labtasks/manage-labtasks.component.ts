import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabNumbersModel } from 'src/app/MODELS/Lab-Frontend-Models/LabNumbersmodel.model';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { LabTasksService } from 'src/app/Services/lab-tasks.service';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-manage-labtasks',
  templateUrl: './manage-labtasks.component.html',
  styleUrls: ['./manage-labtasks.component.css']
})
export class ManageLabtasksComponent implements OnInit {

  constructor(private labsService: LabsService,
    private studentLabDataService: StudentLabDataService,
    private labTasksService: LabTasksService
  ) { }

  ngOnInit(): void {

    this.LabID = localStorage.getItem('LabID');
    this.setAllErrorsToFalse();
    this.TheLabNumbers = this.labsService.fetchLabNumbersOfThisLab(this.LabID);

  }




  TheLabNumbers: LabNumbersModel[] = [];
  // ViewThisStudentSolutionToggled: boolean = false;
  // ViewSolutionsToggled: boolean = false;
  // ViewSolutionToggleButtonText = 'View Students Solutions';
  // CURRENTLY_VIEWING_SOLUTIONS: StudentAttemptedLabTaskmodel[] = [];

  // SetViewViewSolutionToggledFalse() {
  //   if (this.ViewSolutionsToggled) {
  //     this.ViewSolutionsToggled = false;
  //     this.ViewSolutionToggleButtonText = 'View Students Solutions';
  //   }
  // }

  // iskaSolution: StudentAttemptedLabTaskmodel;
  // ViewThisStudentzSolution(solution: StudentAttemptedLabTaskmodel) {
  //   if (this.ViewThisStudentSolutionToggled == true) {
  //     this.ViewThisStudentSolutionToggled = false;
  //     this.iskaSolution = { ...solution };
  //   } else {
  //     this.ViewThisStudentSolutionToggled = true;
  //   }
  // }


  // SolutionsByAllStudents: StudentAttemptedLabTaskmodel[] = [];


  // ViewSolutionsByAllStudents(task: LabTasksmodel) {
  //   this.CURRENTLY_VIEWING_SOLUTIONS = [];
  //   if (this.ViewSolutionsToggled) {
  //     this.ViewSolutionsToggled = false;
  //     this.ViewSolutionToggleButtonText = 'Hide Students Solutions';
  //     //fetch  Attempted tasks  of all the students in array AttemptedBy
  //     let CompleteStudentAttemptedLabTaskCollection: StudentAttemptedLabTaskmodel[] = [];
  //     CompleteStudentAttemptedLabTaskCollection = this.studentLabDataService.RecieveAllStudentAttemptedLabTasks();
  //     let AttemptedByStudents: string[] = task.AttemptedByStudents;
  //     // SolutionsByAllStudents
  //     setTimeout(() => {
  //       console.log("CompleteStudentAttemptedLabTaskCollection == ", CompleteStudentAttemptedLabTaskCollection);
  //       for (let i = 0; i < CompleteStudentAttemptedLabTaskCollection.length; i++) {
  //         for (let j = 0; j < AttemptedByStudents.length; i++) {
  //           if (CompleteStudentAttemptedLabTaskCollection[i].AttemptedLabTask_id == AttemptedByStudents[j]) {
  //             this.SolutionsByAllStudents.push(CompleteStudentAttemptedLabTaskCollection[i]);
  //           }
  //         }
  //       }
  //     }, 1000);





  //   } else {

  //     this.ViewSolutionToggleButtonText = 'View Students Solutions';
  //     this.ViewSolutionsToggled = true;
  //   }
  //   // task.
  // }

  // DeleteThisTask(taskId: string) {
  //   this.labsService.DeletThisLabTask(taskId);
  //   this.Errors.LabTaskDeleted.status = true;
  //   setTimeout(() => { window.location.reload() }, 3600);
  // }






  // AllLabTasks: LabTasksmodel[] = [];
  // LabTasksOfThisLab: LabTasksmodel[] = [];
  // RegisteredLabs = [{ _id: 'wddwd', LabTitle: ' titlell' }];


  // extractLabTasksOfThisLab() {

  //   for (let i = 0; i < this.AllLabTasks.length; i++) {
  //     if (this.AllLabTasks[i].LabJoinCode == this.LabID) {
  //       this.LabTasksOfThisLab.push(this.AllLabTasks[i]);
  //     }
  //   }
  //   console.log("this.LabTasksOfThisLab : ", this.LabTasksOfThisLab);
  // }



  createLabTask(createLabTaskForm: NgForm, XPsSelect: HTMLSelectElement) {

    if (createLabTaskForm.value.LabTaskAnswer == undefined || null) {
      createLabTaskForm.value.LabTaskAnswer = '';
    }

    var taskTitle = createLabTaskForm.value.LabTaskQuestion.substring(0, 27);
    taskTitle += '...';

    let labtask: LabTasksmodel = {
      LabJoinCode: this.LabID, _id: '',TaskBeingAttempted:false, AttemptedByStudents: [], LabTaskAnswer: createLabTaskForm.value.LabTaskAnswer, LabTaskQuestion: createLabTaskForm.value.LabTaskQuestion, LabTaskTitle: taskTitle, LabTaskXPs: parseInt(XPsSelect.value)
    };


    // console.log(labtask);
    let res: LabTasksmodel[] = [];
    res = this.labTasksService.createLabTask(labtask);

    this.Errors.emptyField.status = true;
    this.Errors.LabTaskCreated.status = true;
    setTimeout(() => {

      console.log("res[0] == ", res[0]);

      let index: number = -1;
      for (let i = 0; i < this.TheLabNumbers.length; i++) {
        if (this.TheLabNumbers[i].LabNumber == this.SELECTED_LAB_NUMBER) {
          this.TheLabNumbers[i].LabTaskIds.push(res[0]._id);
          index = i;
          console.log('pushed : ', res[0]);
        }
      }

      if (index != -1) {
        this.labsService.updateThisLabNumberOfThisLab(this.TheLabNumbers[index]);
      } else {
        alert("something fishy nearby @150");
      }


    }, 1500);
    setTimeout(() => { window.location.reload(); }, 3000);
  }

  review(modalButton_proofread:HTMLButtonElement){
    modalButton_proofread.click();
  }
  displayThisMessageInModal(Message: string, modalButtonReferrence: HTMLButtonElement) {
    this.MessageForModal = Message;
    modalButtonReferrence.click();
  }




  checkAnswerStatement(Answer: string) {
    if (Answer.length == 0) { this.Errors.emptyField.status = true }
    else { this.Errors.emptyField.status = false }

    if (Answer.length < 2) { this.Errors.invalidAnswer.status = true }
    else { this.Errors.invalidAnswer.status = false }
  }


  checkQuestionStatement(Question: string) {
    if (Question.length == 0) { this.Errors.emptyField.status = true }
    else { this.Errors.emptyField.status = false }

    if (Question.length < 28) { this.Errors.invalidQuestion.status = true }
    else { this.Errors.invalidQuestion.status = false }
  }

  LabID: string = '';
  MessageForModal: string;
  showSpinner: false;
  SELECTED_LAB_NUMBER: number = 0;
  checkIfLabNumberNotSelected(LabNumberSelect: HTMLSelectElement) {
    let highest = 0;
    if (LabNumberSelect.value == 'Choose...') { this.Errors.LabNumberNotSelected.status = true; }
    else { this.Errors.LabNumberNotSelected.status = false; }

    if (LabNumberSelect.value == 'Create new') {
      for (let i = 0; i < this.TheLabNumbers.length; i++) {
        if (this.TheLabNumbers[i].LabNumber > highest) {
          highest = this.TheLabNumbers[i].LabNumber;
        }
      }
      if (confirm("Do you want to create Lab Number : "+(highest+1))) {
        // create a new labNumber in db, and reload
        // console.log("highest , ", highest);
        this.labsService.createNewLabNumber(this.LabID, (highest+1));
        setTimeout(() => { window.location.reload() }, 3000);
      }
    }
    else { this.Errors.LabNumberNotSelected.status = false; }

    if (LabNumberSelect.value != 'Create new' && LabNumberSelect.value != 'Choose...') {
      this.SELECTED_LAB_NUMBER = parseInt(LabNumberSelect.value, 10);
    }

  }


  checkIfXPsNotSelected(XPsSelect: HTMLSelectElement) {
    if (XPsSelect.value == 'Choose...') { this.Errors.XPsNotSelected.status = true; }
    else { this.Errors.XPsNotSelected.status = false; }
  }
  checkIfErrors(): boolean {
    return (
      this.Errors.XPsNotSelected.status
      || this.Errors.invalidQuestion.status
      || this.Errors.LabNumberNotSelected.status
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
    LabNumberNotSelected: {
      status: true,
      message: 'Lab Number Not Selected.',
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
