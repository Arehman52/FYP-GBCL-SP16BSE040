import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { UniversityModel } from '../MODELS/universitymodel.model';
import { Usersmodel } from '../MODELS/usersmodel.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.setAllErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
    setTimeout(
      () => {
      this.extractJOINRequestsFromUniversitiesData();
    }, 700);
  }

  AllUsersRecievedFromDB: Usersmodel[] = [];
  JOINRequestsUniversitiesData: Usersmodel[] = [];


  extractJOINRequestsFromUniversitiesData() {
    for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
      if (this.AllUsersRecievedFromDB[i].UserType == 'university'
        &&
        this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending'
      ) {
        this.JOINRequestsUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
      }
    }

  }



  onRejectButtonClicked(Uni: Usersmodel) {

    if (confirm('Are you sure you want to REJECT join request of university : ' + Uni.TitleOfUniversity)) {
      const RejectedUni: Usersmodel = { ...Uni };
      RejectedUni.UserzAccessStatus = 'Rejected';
      this.usersService.updateThisUser(RejectedUni, Uni._id);
      this.Errors.joinRequestRejected.status = true;
      setTimeout(()=>{window.location.reload();},2500);
    } else {
      return;
    }

  }


  setAllErrorsToFalse(){
    this.Errors.joinRequestAccepted.status = false;
    this.Errors.joinRequestRejected.status = false;
  }

  onAcceptButtonClicked(Uni: Usersmodel) {

    if (confirm('Are you sure you want to accept join request of university : ' + Uni.TitleOfUniversity)) {
      const AllowedUni: Usersmodel = { ...Uni };
      AllowedUni.UserzAccessStatus = 'Allowed';
      this.usersService.updateThisUser(AllowedUni, Uni._id);
      this.Errors.joinRequestAccepted.status = true;
      setTimeout(()=>{window.location.reload();},2500);
    } else {
      return;
    }

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
