import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LabChallengesmodel } from 'src/app/MODELS/Lab-Frontend-Models/labchallengesmodel.model';
import { LabsService } from 'src/app/Services/labs.service';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.css']
})
export class ManageChallengesComponent implements OnInit {

  constructor(private labsService: LabsService) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.setAllErrorsToFalse();
    this.AllLabChallenges = this.labsService.GetAllLabChallengesFromDB();
    setTimeout(() => {
      this.extractLabChallengesOfThisLab();
    }, 2500);
  }


  //==================================================================================
  //========================= INITIALLIZATIONS
  //==================================================================================

  localStorageUsername = localStorage.getItem("UsersUsername");
  LabID: string = '';
  CORRECT_OPTION_VALUE:string = '';
  LabMCQChallengesOfThisLab: LabChallengesmodel[] = [];
  LabOtherChallengesOfThisLab: LabChallengesmodel[] = [];
  AllLabChallenges: LabChallengesmodel[] = [];




  //==================================================================================
  //========================= CREATE LAB CHALLENGE CODE
  //==================================================================================


  checkIfChallengeTypeNotSelected(ChallengeTypeSelect: HTMLSelectElement) {
    if (ChallengeTypeSelect.value == 'Select Challenge Type...') { this.Errors.ChallengeTypeNotSelected.status = true; }
    else {
      this.Errors.ChallengeTypeNotSelected.status = false;
    }
  }

  checkIfChallengeXPsNotSelected(ChallengeXPsSelect) {
    if (ChallengeXPsSelect.value == 'Assign XPs...') { this.Errors.ChallengeXpsNotSelected.status = true; }
    else { this.Errors.ChallengeXpsNotSelected.status = false; }

  }


  checkAllowedTime(time: number) {
    if (time < 15) { this.Errors.AllowedTimeNotAssigned.status = true }
    else { this.Errors.AllowedTimeNotAssigned.status = false }

  }
  checkQuestionStatement(Question: string) {
    if (Question.length == 0) { this.Errors.emptyField.status = true }
    else { this.Errors.emptyField.status = false }

    if (Question.length < 20) { this.Errors.invalidChallengeQuestion.status = true }
    else { this.Errors.invalidChallengeQuestion.status = false }
  }


  checkAllOptionsNotFilled(Form: NgForm) {
    if (Form.value.optionA.length == 0 || Form.value.optionB.length == 0
      || Form.value.optionB.length == 0 || Form.value.optionD.length == 0
    ) { this.Errors.AllOptionsNotFilled.status = true }
    else { this.Errors.AllOptionsNotFilled.status = false }
  }



  setAllErrorsToFalse() {
    // this.Errors.ChallengeTypeNotSelected.status = false;
    // this.Errors.ChallengeXpsNotSelected.status = false;
    this.Errors.LabChallengeDeleted.status = false;
    this.Errors.LabChallengeCreated.status = false;
    this.Errors.invalidChallengeQuestion.status = false;
    this.Errors.AllowedTimeNotAssigned.status = false;
    this.Errors.AllOptionsNotFilled.status = false;

  }

  checkIfErrors(): boolean {
    return (
      this.Errors.ChallengeTypeNotSelected.status
      || this.Errors.LabChallengeCreated.status
      || this.Errors.ChallengeXpsNotSelected.status
      || this.Errors.AllOptionsNotFilled.status
      || this.Errors.AllowedTimeNotAssigned.status
      || this.Errors.emptyField.status
      || this.Errors.invalidChallengeQuestion.status
    );
  }



  createLabChallenge(createLabChallengeForm: NgForm, ChallengeTypeSelect: HTMLSelectElement, ChallengeXPsSelect: HTMLSelectElement) {


    // console.log(radio);
    console.log(createLabChallengeForm.value.optradio);
    console.dir(createLabChallengeForm.value.optradio);
    // alert("radio.checked : "+radio.checked);


        let labChallenge: LabChallengesmodel = { _id: '',AttemptedByStudents:[], ChallengeAllowedTime: createLabChallengeForm.value.TimeAllowed,ChallengeCorrectOption: this.CORRECT_OPTION_VALUE, ChallengeQuestionType: ChallengeTypeSelect.value, ChallengeOptionA: createLabChallengeForm.value.optionA, ChallengeOptionB: createLabChallengeForm.value.optionB, ChallengeOptionC: createLabChallengeForm.value.optionC, ChallengeOptionD: createLabChallengeForm.value.optionD, ChallengeQuestion: createLabChallengeForm.value.LabChallengeQuestion, ChallengeXPs: parseInt(ChallengeXPsSelect.value), LabJoinCode: this.LabID };

        if (labChallenge.ChallengeQuestionType != 'MCQ') {
          labChallenge.ChallengeOptionA = '';
          labChallenge.ChallengeOptionB = '';
          labChallenge.ChallengeOptionC = '';
          labChallenge.ChallengeOptionD = '';
        }else{


        if(
          this.CORRECT_OPTION_VALUE == createLabChallengeForm.value.optionA ||
          this.CORRECT_OPTION_VALUE == createLabChallengeForm.value.optionB ||
          this.CORRECT_OPTION_VALUE == createLabChallengeForm.value.optionC ||
          this.CORRECT_OPTION_VALUE == createLabChallengeForm.value.optionD
          ){
            alert("this.CORRECT_OPTION_VALUE : "+this.CORRECT_OPTION_VALUE);



    }else{
      alert("You need to select a correct option also");
      return;
    }
        }


        this.labsService.createLabChallenge(labChallenge);
        createLabChallengeForm.reset();
        this.Errors.LabChallengeCreated.status = true;


}

  radioChangedHandler(event:any){
    console.log(event.target.value);
    this.CORRECT_OPTION_VALUE = event.target.value;
  }




  //==================================================================================
  //========================= VIEW LAB CHALLENGES CODE
  //==================================================================================




  extractLabChallengesOfThisLab() {
    for (let i = 0; i < this.AllLabChallenges.length; i++) {
      if (this.AllLabChallenges[i].LabJoinCode == this.LabID) {


        if (this.AllLabChallenges[i].ChallengeQuestionType == 'MCQ') {
          this.LabMCQChallengesOfThisLab.push(this.AllLabChallenges[i]);
        } else {
          this.LabOtherChallengesOfThisLab.push(this.AllLabChallenges[i]); `                                 `
        }
      }
    }
  }




  DeleteThisChallenge(ChallengeId: string) {
    if (confirm("Are you sure you want to delete this lab challenge?")) {
      this.labsService.DeleteThisLabChallenge(ChallengeId);
      this.Errors.LabChallengeDeleted.status = true;
      setTimeout(()=>{window.location.reload()},3500);
    }

  }












  //==================================================================================
  //========================= MISC INITIALLIZATIONS AND METHODS
  //==================================================================================




  Errors = {
    AllOptionsNotFilled: {
      status: true,
      message: 'All Options must be filled.',
    },
    LabChallengeDeleted: {
      status: true,
      message: 'Lab Challenge is Deleted.',
    },
    LabChallengeCreated: {
      status: true,
      message: 'Lab Challenge is Created.',
    },
    emptyField: {
      status: true,
      message: 'Field cannot be empty.',
    },
    AllowedTimeNotAssigned: {
      status: true,
      message: 'Allowed time must be more than 15 seconds.',
    },
    ChallengeXpsNotSelected: {
      status: true,
      message: 'Challenge XPs are not assigned.',
    },
    ChallengeTypeNotSelected: {
      status: true,
      message: 'Challenge Type must be selected.',
    },
    invalidChallengeQuestion: {
      status: true,
      message: 'Question length is not satisfied.',
    }
  };





  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/TEACHER"
  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
