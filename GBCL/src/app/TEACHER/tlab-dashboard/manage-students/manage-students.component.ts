import { Component, OnInit } from '@angular/core';
import { LabJoinRequestsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labJoinRequestsmodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {

  constructor(private studentLabDataService:StudentLabDataService ,private usersService: UsersService) { }

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
  localStorageUsername = localStorage.getItem("UsersUsername");
  ViewStats = false;
  ViewStatsButtonText = "View Statistics";

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







  onWarnButtonClicked(LabMemberStudent: Usersmodel) {
    alert("In studentsData, set Warned=true on click of this button.\nDecrement 40XPs in student's XPs. and update student activityHistory.");

  }


  onAppreciateButtonClicked(LabMemberStudent: Usersmodel) {
    alert("In studentsData, set Appreciated=true on click of this button.\nIncrement 40XPs in student's XPs. and update student activityHistory.");

  }
  onExpelButtonClicked(LabMemberStudent: Usersmodel) {

    alert("Remove LabID from LabJoinCodesOfJoinedLabs to LabJoinCodesOfExpelledLabs on click of this button.\nand then modify student's join lab button functionality.");
  }



  viewStatsButtonClicked(LabMemberStudent: Usersmodel) {
    alert("Fetch stats of the student passed in parameter on click of this button");

    if (this.ViewStats == false) {
      this.ViewStats = true;
      this.ViewStatsButtonText = "Hide Statistics";
    } else {
      this.ViewStatsButtonText = "View Statistics";
      this.ViewStats = false;
    }
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
      let studLabDataAndStatsFreshRecord: StudLabDataAndStatsmodel = {
        _id: '', Appreciated: false, LabJoinCode: this.LabID, LevelUpdateViewed: true, RivalStudents: [],
        StudentzLabAccessStatus: 'Allowed', StudentzUsername: StudentzLabJoinRequest.Username, Warned: false,Demoted:false,Promoted:true,
        currentBadge: '', currentCPPs: 0, currentLevel: 0, currentXPs: 0
      };

      this.studentLabDataService.createFreshStudentLabDataRecord(studLabDataAndStatsFreshRecord);
      this.usersService.updateThisUser(StudentzLabJoinRequest, StudentzLabJoinRequest._id);

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
    StudentExpelled: {
      status: true,
      message: 'Student expelled from the lab.',
    },
    StudentAppreciated: {
      status: true,
      message: '40 XPs added in student\'s Statisics because you appreciated.',
    },
    StudentWarned: {
      status: true,
      message: 'Student has been warned, also 40 XPs deducted.',
    },
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
    this.Errors.StudentAppreciated.status = false;
    this.Errors.StudentExpelled.status = false;
    this.Errors.StudentWarned.status = false;
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
