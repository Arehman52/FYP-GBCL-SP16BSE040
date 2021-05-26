import { Component, OnInit } from '@angular/core';
import { LabJoinRequestsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labJoinRequestsmodel.model';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {

    this.setAllErrorsToFalse();

    this.LabID = localStorage.getItem("LabID");
    this.AllUsers = this.usersService.RecieveAllUsersFromDB();

    setTimeout(() => {
      this.extractStudentzLabJoinRequests();
    }, 2500);
  }

  LabID: string = '';
  AllUsers: Usersmodel[] = [];
  StudentsLabJoinRequests: Usersmodel[] = [];
  LabMemberStudents: Usersmodel[] = [];


  extractStudentzLabJoinRequests() {
    for (let i = 0; i < this.AllUsers.length; i++) {
      if (this.AllUsers[i].UserType == 'student') {
        if (this.AllUsers[i].LabJoinCodesOfAppliedLabs.includes(this.LabID)) {
          this.StudentsLabJoinRequests.push(this.AllUsers[i]);
        }
        if (this.AllUsers[i].LabJoinCodesOfJoinedLabs.includes(this.LabID)) {
          this.LabMemberStudents.push(this.AllUsers[i]);
        }
      }
    }
  }







  onWarnButtonClicked(){

  }


  onAppreciateButtonClicked(LabMemberStudent:Usersmodel){

  }
  onExpelButtonClicked(LabMemberStudent:Usersmodel){

  }




  viewStatsButtonClicked(){

  }

  onAcceptLabJoinRequestButtonClicked(StudentzLabJoinRequest: Usersmodel) {

    if (confirm("Are you sure you want to accept lab request of \nthis user: " + StudentzLabJoinRequest.FirstNameOfUser + " " + StudentzLabJoinRequest.LastNameOfUser)) {

      let newLabJoinCodesOfAppliedLabs: string[] = [];
      for (let i = 0; i < StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs.length; i++) {
        if (StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs[i] == this.LabID) {
        } else {
          newLabJoinCodesOfAppliedLabs.push(StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs[i]);
        }

      }
      StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs = [...newLabJoinCodesOfAppliedLabs];
      StudentzLabJoinRequest.LabJoinCodesOfJoinedLabs.push(this.LabID);
      this.usersService.updateThisUser(StudentzLabJoinRequest, StudentzLabJoinRequest._id);
      // }, 3500);

      this.Errors.labJoinRequestAccepted.status = true;
      setTimeout(() => { window.location.reload() }, 4000);
    }

  }


  onDeleteLabJoinRequestButtonClicked(StudentzLabJoinRequest: Usersmodel) {
    if (confirm("Are you sure you want to DELETE lab request of \nthis user: " + StudentzLabJoinRequest.FirstNameOfUser + " " + StudentzLabJoinRequest.LastNameOfUser)) {
        let newLabJoinCodesOfAppliedLabs: string[] = [];
        for (let i = 0; i < StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs.length; i++) {
          if (StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs[i] != this.LabID) {
            newLabJoinCodesOfAppliedLabs.push(StudentzLabJoinRequest.LabJoinCodesOfJoinedLabs[i]);
          }
        }
        StudentzLabJoinRequest.LabJoinCodesOfJoinedLabs = [];
        StudentzLabJoinRequest.LabJoinCodesOfAppliedLabs = [...newLabJoinCodesOfAppliedLabs];
        this.usersService.updateThisUser(StudentzLabJoinRequest, StudentzLabJoinRequest._id);
      this.Errors.labJoinRequestDeleted.status = true;
      setTimeout(() => { window.location.reload() }, 4000);
    }

  }




  Errors = {
    labJoinRequestAccepted: {
      status: true,
      message: 'Lab Join request of this member is Accepted.',
    },
    labJoinRequestDeleted: {
      status: true,
      message: 'Lab Join request of this member is Deleted.',
    },
  };


  setAllErrorsToFalse() {
    this.Errors.labJoinRequestAccepted.status = false;
    this.Errors.labJoinRequestDeleted.status = false;
  }




  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }
}
