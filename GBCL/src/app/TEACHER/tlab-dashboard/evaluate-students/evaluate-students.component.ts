import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentAttemptedLabChallengemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { GamificationService } from 'src/app/Services/gamification.service';
import { StudentAttemptedLabChallengesService } from 'src/app/Services/student-attempted-lab-challenges.service';
import { StudentAttemptedLabTasksService } from 'src/app/Services/student-attempted-lab-tasks.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-evaluate-students',
  templateUrl: './evaluate-students.component.html',
  styleUrls: ['./evaluate-students.component.css']
})
export class EvaluateStudentsComponent implements OnInit {


  constructor(
    private studentAttemptedLabChallengesService: StudentAttemptedLabChallengesService,
    private studentAttemptedLabTasksService: StudentAttemptedLabTasksService,
    private usersService: UsersService) { }

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
  ViewStatsButtonText = "View Solutions";

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









































  FetchedAllAttemptedLabTasksByStud: StudentAttemptedLabTaskmodel[] = [];
  fetchAllAttemptedLabTasksOfThisStudentForThisLab(student: Usersmodel) {
    this.FetchedAllAttemptedLabTasksByStud = this.studentAttemptedLabTasksService.
      RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID,
        student.Username);

    setTimeout(() => {
      console.log('this.FetchedAllAttemptedLabTasksByStud ', this.FetchedAllAttemptedLabTasksByStud);
    }, 1500);


  }



  setViewStatsFalse() {
    this.ViewStats = false;
    this.ViewStatsButtonText = "View Solutions";
  }

  viewStatsButtonClicked(LabMemberStudent: Usersmodel) {
    if (this.ViewStats == false) {
      this.ViewStats = true;
      // this.FetchedAllAttemptedLabTasksByStud =
      this.fetchAllAttemptedLabTasksOfThisStudentForThisLab(LabMemberStudent);
      this.ViewStatsButtonText = "Hide Solutions";
    } else {
      this.ViewStatsButtonText = "View Solutions";
      this.ViewStats = false;
    }

  }




























  //FetchedAllAttemptedLabChallengesByStud   <===== complete collection






  FetchedAllAttemptedMCQsLabChallengesByStud: StudentAttemptedLabChallengemodel[] = [];
  fetchAllAttemptedMCQsLabChallengesOfThisStudentForThisLab(student: Usersmodel) {
    this.FetchedAllAttemptedMCQsLabChallengesByStud = this.studentAttemptedLabChallengesService.
      RecieveAllStudentAttemptedMCQLabChallengesOfthisStudandThisLab(this.LabID,
        student.Username);

    setTimeout(() => {
      console.log('this.FetchedAllAttemptedMCQsLabChallengesByStud ', this.FetchedAllAttemptedMCQsLabChallengesByStud[0]);
    }, 1500);


  }

  ViewStatsButtonTextMCQs = "View MCQs Solutions";
  ViewStatsMCQs: boolean = false;
  setViewStatsFalseMCQs() {
    this.ViewStatsMCQs = false;
    this.ViewStatsButtonTextMCQs = "View MCQs Solutions";
  }

  viewStatsButtonClickedMCQs(LabMemberStudent: Usersmodel) {
    if (this.ViewStatsMCQs == false) {
      this.ViewStatsMCQs = true;
      // this.FetchedAllAttemptedLabTasksByStud =
      this.fetchAllAttemptedMCQsLabChallengesOfThisStudentForThisLab(LabMemberStudent);
      this.ViewStatsButtonTextMCQs = "Hide MCQs Solutions";
    } else {
      this.ViewStatsButtonTextMCQs = "View MCQs Solutions";
      this.ViewStatsMCQs = false;
    }

  }













































































































  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  //OLD CODE BELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW




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
    window.location.href = "/TEACHER"
  }
}
