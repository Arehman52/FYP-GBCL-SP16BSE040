import { Component, OnInit } from '@angular/core';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-unimanage-joinrequests',
  templateUrl: './unimanage-joinrequests.component.html',
  styleUrls: ['./unimanage-joinrequests.component.css']
})
export class UnimanageJoinrequestsComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.setAllErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();

    this.UsernameObj = { Username: localStorage.getItem("UsersUsername") };
    this.fetchedUni = this.usersService.FetchThisUser2(this.UsernameObj);
    setTimeout(() => {
      this.localStorageUsername = this.fetchedUni[0].Username;
      this.UNIVERSITY_TITLE = this.fetchedUni[0].TitleOfUniversity;
    }, 1000);
    setTimeout(() => {
      this.extractJOINRequests();
    }, 1400);
  }

  // localStorageUsername = localStorage.getItem("UsersUsername");
  // localStorageUNIVERSITYtitle = localStorage.getItem("UniversityTitle");

  private fetchedUni: Usersmodel[] = [];
  localStorageUsername: string;
  UsernameObj: { Username: string } = { Username: localStorage.getItem("UsersUsername") };
  UNIVERSITY_TITLE: string;

  AllUsersRecievedFromDB: Usersmodel[] = [];
  JOINRequestsStudents: Usersmodel[] = [];
  JOINRequestsTeachers: Usersmodel[] = [];




  extractJOINRequests() {
    for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
      // console.log('localStorage.setItem("UsersUsertype") ==> ',localStorage.getItem("UsersUsertype"));
      // console.log('this.localStorageUNIVERSITYtitle ==> ',this.localStorageUNIVERSITYtitle);
      // console.log('this.AllUsersRecievedFromDB[i].UniversityNameOfUser ',this.AllUsersRecievedFromDB[i].UniversityNameOfUser);
      if (this.AllUsersRecievedFromDB[i].UniversityNameOfUser == this.UNIVERSITY_TITLE
        && this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending') {
        if (this.AllUsersRecievedFromDB[i].UserType == 'student') { this.JOINRequestsStudents.push(this.AllUsersRecievedFromDB[i]); }
        if (this.AllUsersRecievedFromDB[i].UserType == 'teacher') { this.JOINRequestsTeachers.push(this.AllUsersRecievedFromDB[i]); }
      }
    }

  }


  onRejectButtonClicked(member: Usersmodel) {

    if (confirm('Are you sure you want to REJECT join request of this member : ' + member.FirstNameOfUser)) {
      const RejectedMember: Usersmodel = { ...member };
      RejectedMember.UserzAccessStatus = 'Rejected';
      this.usersService.updateThisUser(RejectedMember, member._id);
      this.Errors.joinRequestRejected.status = true;
      setTimeout(() => { window.location.reload(); }, 3500);
    } else {
      return;
    }

  }
  onAcceptButtonClicked(member: Usersmodel) {

    if (confirm('Are you sure you want to accept join request of  : ' + member.FirstNameOfUser + ' ' + member.LastNameOfUser)) {
      const Allowedmember: Usersmodel = { ...member };
      Allowedmember.UserzAccessStatus = 'Allowed';
      this.usersService.updateThisUser(Allowedmember, member._id);
      this.Errors.joinRequestAccepted.status = true;
      setTimeout(() => { window.location.reload(); }, 2500);
    } else {
      return;
    }

  }





  setAllErrorsToFalse() {
    this.Errors.joinRequestAccepted.status = false;
    this.Errors.joinRequestRejected.status = false;
  }

  Errors = {
    joinRequestRejected: {
      status: true,
      message: 'Join Request rejected.',
    },
    joinRequestAccepted: {
      status: true,
      message: 'Join Request accepted.',
    }
  };


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
