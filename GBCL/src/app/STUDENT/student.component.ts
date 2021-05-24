import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Labsmodel } from '../MODELS/labsmodel.model';
import { Usersmodel } from '../MODELS/usersmodel.model';
import { LabsService } from '../Services/labs.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class STUDENTComponent implements OnInit {

  constructor(private labsService: LabsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.showSpinner = false;
    this.AllLabsRecieved = this.labsService.RecieveAllLabsFromDB();
    let usernameObj: { Username: string } = { Username: this.localStorageUsername };
    this.TheStudent = this.usersService.FetchThisUser(usernameObj);
    setTimeout(() => {
      this.extractLabsOfThisStudent();
    }, 2500);
  }

  LabsOfThisStudent: Labsmodel[] = [];
  AllLabsRecieved: Labsmodel[] = [];
  TheStudent: Usersmodel[] = [];
  MessageForModal: string;
  showSpinner: boolean = false;

  extractLabsOfThisStudent() {
    let arrayOf_LabJoinCodesOfJoinedLabs: string[] = this.TheStudent[0].LabJoinCodesOfJoinedLabs;
    if (arrayOf_LabJoinCodesOfJoinedLabs.length > 0) {
      for (let i = 0; i < this.AllLabsRecieved.length; i++) {
        for (let j = 0; j < arrayOf_LabJoinCodesOfJoinedLabs.length; j++) {
          if (this.AllLabsRecieved[i]._id == arrayOf_LabJoinCodesOfJoinedLabs[j]) {
            this.LabsOfThisStudent.push(this.AllLabsRecieved[i]);
          }
        }
      }
    }
  }

  onVisitLabButtonClicked(labId: string, modalButtonReferrence: HTMLButtonElement) {
    localStorage.setItem("LabID", labId);
    window.location.href = "/STUDENT/Lab";
    this.showSpinner = true;
  }


  displayThisMessageInModal(Message: string, modalButtonReferrence: HTMLButtonElement) {
    this.MessageForModal = Message;
    modalButtonReferrence.click();
  }


  onJoinLabButtonClicked(enteredJoinCode: string, modalButtonReferrence: HTMLButtonElement) {
    if (enteredJoinCode.length < 10) {
      this.displayThisMessageInModal('Code length must be greater than 10.', modalButtonReferrence);
      return;
    }

    let checkIf_enteredJoinCode_MatchesWithAnyLab = false;
    console.log('001  enteredJoinCode ==>',enteredJoinCode);
    for (let i = 0; i < this.AllLabsRecieved.length; i++) {
      console.log('002 this.AllLabsRecieved[i]._id ==>',this.AllLabsRecieved[i]._id);
      if (this.AllLabsRecieved[i]._id == enteredJoinCode) {
        console.log('003 inside if (this.AllLabsRecieved[i]._id == enteredJoinCode) { ');
        checkIf_enteredJoinCode_MatchesWithAnyLab = true;
        // return;
      }
    }

    let checkIf_enteredJoinCode_IsEnteredAgain = false;
    var arrayOf_LabJoinCodesOfAppliedLabs: string[] = [];
    console.log('003.1 this.TheStudent[0].LabJoinCodesOfAppliedLabs.length ==>',this.TheStudent[0].LabJoinCodesOfAppliedLabs.length);
    console.log('003.2 this.TheStudent[0].LabJoinCodesOfJoinedLabs.length ==>',this.TheStudent[0].LabJoinCodesOfJoinedLabs.length);
    for(let p=0;p<this.TheStudent[0].LabJoinCodesOfAppliedLabs.length;p++){
      console.log('<=================== '+p+1+' ====================>')
      arrayOf_LabJoinCodesOfAppliedLabs.push(this.TheStudent[0].LabJoinCodesOfAppliedLabs[p]);
    }
    arrayOf_LabJoinCodesOfAppliedLabs = [...this.TheStudent[0].LabJoinCodesOfAppliedLabs];
    console.log('004 this.TheStudent[0]',this.TheStudent[0]);
    console.log('004.1 this.TheStudent[0].LabJoinCodesOfAppliedLabs',this.TheStudent[0].LabJoinCodesOfAppliedLabs);
    console.log('005 enteredJoinCode ==>',enteredJoinCode);
    console.log('005.1 arrayOf_LabJoinCodesOfAppliedLabs ==>',arrayOf_LabJoinCodesOfAppliedLabs);
    console.log('005.1.1 arrayOf_LabJoinCodesOfAppliedLabs.length ==>',arrayOf_LabJoinCodesOfAppliedLabs.length);
    for (let j=0; j<arrayOf_LabJoinCodesOfAppliedLabs.length; j++) {
      console.log('005.2 <========== ========>');
      console.log('006 arrayOf_LabJoinCodesOfAppliedLabs[j] ==>',arrayOf_LabJoinCodesOfAppliedLabs[j]);
      if (arrayOf_LabJoinCodesOfAppliedLabs[j] == enteredJoinCode) {
        checkIf_enteredJoinCode_IsEnteredAgain = true;
        console.log('007 arrayOf_LabJoinCodesOfAppliedLabs[i] == enteredJoinCode ==>  ==>  TRUE');
        // return;
      }
    }


    if (checkIf_enteredJoinCode_MatchesWithAnyLab) {
      console.log('008 inside if (checkIf_enteredJoinCode_MatchesWithAnyLab) {');
      if (checkIf_enteredJoinCode_IsEnteredAgain) {
        console.log('009 inside if if (checkIf_enteredJoinCode_IsEnteredAgain) {');
        this.displayThisMessageInModal('You already have applied to join for this lab.', modalButtonReferrence);
      } else {
        this.TheStudent[0].LabJoinCodesOfAppliedLabs.push(enteredJoinCode);
        // console.log('this.TheStudent[0]',this.TheStudent[0]);
        this.usersService.updateThisUser(this.TheStudent[0], this.TheStudent[0]._id);
        this.displayThisMessageInModal('Applied for access to the lab. You will be granted access once your request ges accepted.', modalButtonReferrence);
        // setTimeout(()=>{window.location.reload()},4000);
      }
    } else {
      this.displayThisMessageInModal('Entered Join Code does not match with any lab.', modalButtonReferrence);
    }

  }


















  //=================================================previous  code
  labs = [{}];

  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
