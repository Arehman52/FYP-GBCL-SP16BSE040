import { Component, OnInit } from '@angular/core';
import { LabJoinRequestsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labJoinRequestsmodel.model';
import { StudentActivityHistorymodel } from 'src/app/MODELS/Student-Frontend-Models/StudentActivityHistorymodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { GamificationService } from 'src/app/Services/gamification.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {

  constructor(private gamificationSercive: GamificationService, private studentLabDataService: StudentLabDataService, private usersService: UsersService) { }

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
    if (confirm(("By Warning this student, you are deducting their 50XPs."))) {
      let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: LabMemberStudent.Username };
      let STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[] = [];
      STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

      setTimeout(() => {


        if (STUDz_FETCHED_STATS_FROM_Db[0].Warned) {
          alert("You already have warned this student once, you cannot warn this student again.");
        } else {

          STUDz_FETCHED_STATS_FROM_Db[0].Warned = true;
          STUDz_FETCHED_STATS_FROM_Db[0].WarnUpdateViewed = false;
          STUDz_FETCHED_STATS_FROM_Db[0].currentXPs -= 50;
          if (STUDz_FETCHED_STATS_FROM_Db[0].currentXPs < 0) {
            STUDz_FETCHED_STATS_FROM_Db[0].currentXPs = 0;
          }

          this.Errors.StudentWarned.status = true;
          this.studentLabDataService.updateCurrentStatsOfThisStudent(STUDz_FETCHED_STATS_FROM_Db[0]
            , StudentzUsernameAndLabID);


          this.gamificationSercive.createHistory_wasWarned(STUDz_FETCHED_STATS_FROM_Db[0].StudentzFN+ ' '+ STUDz_FETCHED_STATS_FROM_Db[0].StudentzLN,StudentzUsernameAndLabID);




        }

      }, 1500);


    }

    setTimeout(() => { window.location.reload() }, 3000);
  }


  onAppreciateButtonClicked(LabMemberStudent: Usersmodel) {
    if (confirm(("By appreciating this student, you are awarding 50XPs to them."))) {
      let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: LabMemberStudent.Username };
      let STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[] = [];
      STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

      setTimeout(() => {


        if (STUDz_FETCHED_STATS_FROM_Db[0].Appreciated) {
          alert("You already have appreciated this student once, you cannot appreciate this student again.");
        } else {

          this.Errors.StudentAppreciated.status = true;
          STUDz_FETCHED_STATS_FROM_Db[0].Appreciated = true;
          STUDz_FETCHED_STATS_FROM_Db[0].AppreciateUpdateViewed = false;
          STUDz_FETCHED_STATS_FROM_Db[0].currentXPs += 50;
          this.studentLabDataService.updateCurrentStatsOfThisStudent(STUDz_FETCHED_STATS_FROM_Db[0]
            , StudentzUsernameAndLabID);
          this.gamificationSercive.createHistory_wasAppreciated(STUDz_FETCHED_STATS_FROM_Db[0].StudentzFN+ ' '+ STUDz_FETCHED_STATS_FROM_Db[0].StudentzLN,StudentzUsernameAndLabID);

        }

      }, 1500);


    }


    setTimeout(() => { window.location.reload() }, 3000);
  }



  ExpellButtonText = "";
  onExpelButtonClicked(LabMemberStudent: Usersmodel) {

    if (confirm(("If you expel the student, He/She will loose the Lab's access."))) {
      let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: LabMemberStudent.Username };
      let STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[] = [];
      STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

      setTimeout(() => {

        // let studhistory: StudentActivityHistorymodel = {
        //   GainedOrLoosedXPsCount: 0, LabChallengeQuestion: '', wasExpelled: false,
        //   LabChallengeQuestionType: '', LabTaskQuestion: '', LabJoinCode: this.LabID, LabTaskOrChallengeAttempted: false, LabTaskOrChallengeChecked: false, LabTaskOrChallengeFailedDueToTimeout: false, StudentzUsername: LabMemberStudent.Username, _id: '', wasAppreciated: false, wasDemoted: false, wasPromoted: false, wasWarned: false
        // };

        if (STUDz_FETCHED_STATS_FROM_Db[0]?.StudentzLabAccessStatus == "Expelled") {
          // this.ExpellButtonText = "Allow";
          // studhistory.wasExpelled = false;
          this.Errors.StudentAllowed.status = true;
          this.gamificationSercive.createHistory_wasAllowed(STUDz_FETCHED_STATS_FROM_Db[0].StudentzFN+ ' '+ STUDz_FETCHED_STATS_FROM_Db[0].StudentzLN,StudentzUsernameAndLabID);
          STUDz_FETCHED_STATS_FROM_Db[0].StudentzLabAccessStatus = "Allowed";
        } else

          if (STUDz_FETCHED_STATS_FROM_Db[0]?.StudentzLabAccessStatus == "Allowed") {
            // this.ExpellButtonText = "Expell";
            // studhistory.wasExpelled = true;
            this.Errors.StudentExpelled.status = true;
            this.gamificationSercive.createHistory_wasExpelled(STUDz_FETCHED_STATS_FROM_Db[0].StudentzFN+ ' '+ STUDz_FETCHED_STATS_FROM_Db[0].StudentzLN, StudentzUsernameAndLabID);
            STUDz_FETCHED_STATS_FROM_Db[0].StudentzLabAccessStatus = "Expelled";
            // STUDz_FETCHED_STATS_FROM_Db[0].Warned = true;
            // STUDz_FETCHED_STATS_FROM_Db[0].currentXPs -= 50;
            // if(STUDz_FETCHED_STATS_FROM_Db[0].currentXPs < 0){
            //   STUDz_FETCHED_STATS_FROM_Db[0].currentXPs = 0;
          }
        this.studentLabDataService.updateCurrentStatsOfThisStudent(STUDz_FETCHED_STATS_FROM_Db[0]
          , StudentzUsernameAndLabID);



        // this.studentLabDataService.createAStudentActivityHistoryDocument(studhistory);
        // }

      }, 1500);


    }

    setTimeout(() => { window.location.reload() }, 3000);
  }


  viewingStatsOfThisStudent: StudLabDataAndStatsmodel[] = [];
  onStudentNameCardClicked(LabMemberStudent) {
    this.setAllErrorsToFalse();
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = {
      LabJoinCode: this.LabID,
      StudentzUsername: LabMemberStudent.Username
    };
    this.viewingStatsOfThisStudent = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);
    setTimeout(() => {
      if (this.viewingStatsOfThisStudent[0]?.StudentzLabAccessStatus == "Expelled") {
        this.ExpellButtonText = "Allow";
      }

      if (this.viewingStatsOfThisStudent[0]?.StudentzLabAccessStatus == "Allowed") {
        this.ExpellButtonText = "Expell";
      }
    }, 800);
  }
  viewStatsButtonClicked(LabMemberStudent: Usersmodel) {
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
        AppreciateUpdateViewed:true, WarnUpdateViewed:true,
        _id: '', Appreciated: false, LabJoinCode: this.LabID, LevelUpdateViewed: false, RivalStudents: [],StudentzLabAccessStatus: 'Allowed', StudentzUsername: StudentzLabJoinRequest.Username, StudentzFN: StudentzLabJoinRequest.FirstNameOfUser, StudentzLN: StudentzLabJoinRequest.LastNameOfUser, Warned: false, Demoted: false, Promoted: true,
        currentBadge: 'Beginner I', currentCPPs: 0, currentLevel: 1, currentXPs: 0
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
    StudentAllowed: {
      status: true,
      message: 'Student access to the lab restored.',
    },
    StudentExpelled: {
      status: true,
      message: 'Student expelled from the lab.',
    },
    StudentAppreciated: {
      status: true,
      message: '50 XPs added in student\'s Statisics because you appreciated.',
    },
    StudentWarned: {
      status: true,
      message: 'Student has been warned, also 50 XPs deducted.',
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
    this.Errors.StudentAllowed.status = false;
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
