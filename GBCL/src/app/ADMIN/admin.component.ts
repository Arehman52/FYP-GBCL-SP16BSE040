import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { Usersmodel } from '../MODELS/Usersmodel.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersService: UsersService, private http: HttpClient) { }

  ngOnInit(): void {
    this.setAllErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
    setTimeout(
      () => {
        this.extractJOINRequestsFromUniversitiesData();
      }, 400);
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





  setAllErrorsToFalse() {
    this.Errors.joinRequestAccepted.status = false;
    this.Errors.joinRequestRejected.status = false;
  }

  onRejectButtonClicked(Uni: Usersmodel) {

    if (confirm('Are you sure you want to REJECT join request of university : ' + Uni.TitleOfUniversity)) {
      const RejectedUni: Usersmodel = { ...Uni };
      RejectedUni.UserzAccessStatus = 'Rejected';
      this.usersService.updateThisUser(RejectedUni, Uni._id);
      this.Errors.joinRequestRejected.status = true;
      setTimeout(() => { window.location.reload(); }, 800);
    } else {
      return;
    }

  }
  onAcceptButtonClicked(Uni: Usersmodel) {

    if (confirm('Are you sure you want to accept join request of university : ' + Uni.TitleOfUniversity)) {
      const AllowedUni: Usersmodel = { ...Uni };
      AllowedUni.UserzAccessStatus = 'Allowed';
      this.usersService.updateThisUser(AllowedUni, Uni._id);
      this.Errors.joinRequestAccepted.status = true;
      window.location.reload();
      setTimeout(() => { window.location.reload(); }, 800);
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





  //   deleteThisUniversity(uniUpdatedUser: Usersmodel, Id: string) {
  //     this.http.put("http://localhost:3000/api/Users/UpdateThisUser/"+Id, uniUpdatedUser)
  //       .subscribe(
  //         response => {
  //           console.log(response);
  //         }
  //       );
  //  }



  ResetEntrireDatabase() {
    this.http.get("http://localhost:3000/api/Users/ResetEntrireDatabase/")
      .subscribe(
        response => {
          console.log(response);
        }
      );
    this.http.get("http://localhost:3000/api/StudentLabData/ResetEntrireDatabase/").subscribe(
      response => {
        console.log(response);
      }
    );
    this.http.get("http://localhost:3000/api/Labs/ResetEntrireDatabase/")
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

}
