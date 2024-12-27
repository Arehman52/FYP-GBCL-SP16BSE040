import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { Usersmodel } from '../MODELS/Usersmodel.model';
import { HttpClient } from '@angular/common/http';
import { Labsmodel } from '../MODELS/Lab-Frontend-Models/labsmodel.model';
import { LabsService } from '../Services/labs.service';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private usersService: UsersService,private labsService:LabsService,  private http: HttpClient) { }
  ngOnInit(): void {



    this.setAllErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
    this.AllLabs = this.labsService.getAllLabs();

    setTimeout(
      () => {
        this.extractOverallStats();
        this.extractJOINRequestsFromUniversitiesData();
      }, 1800);
  }

  AllLabs:Labsmodel[] = [];
  AllUsersRecievedFromDB: Usersmodel[] = [];
  JOINRequestsUniversitiesData: Usersmodel[] = [];
  OVERALL_STATS:{UniversitiesCount:number, FacultyCount:number, StudentsCount:number, Labsount:number,
    RejectedUniversitiesCount:number,AllowedUniversitiesCount:number,TerminatedUniversitiesCount:number,
    PendingUniversitiesCount:number} = {
    FacultyCount:0,  StudentsCount:0, UniversitiesCount:0, Labsount:0, AllowedUniversitiesCount:0,
    RejectedUniversitiesCount:0, TerminatedUniversitiesCount:0,PendingUniversitiesCount:0
  }

  extractOverallStats() {


    this.OVERALL_STATS.Labsount = this.AllLabs.length;

    for(let i=0;i<this.AllUsersRecievedFromDB.length;i++){
      if(this.AllUsersRecievedFromDB[i].UserType == 'university'){
        this.OVERALL_STATS.UniversitiesCount++;
        if(this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Terminated'){
          this.OVERALL_STATS.TerminatedUniversitiesCount++;
        }
        if(this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Allowed'){
          this.OVERALL_STATS.AllowedUniversitiesCount++;
        }
        if(this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Rejected'){
          this.OVERALL_STATS.RejectedUniversitiesCount++;
        }
        if(this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending'){
          this.OVERALL_STATS.PendingUniversitiesCount++;
        }
      }
      if(this.AllUsersRecievedFromDB[i].UserType == 'student'){
        this.OVERALL_STATS.StudentsCount++;
      }
      if(this.AllUsersRecievedFromDB[i].UserType == 'teacher'){
        this.OVERALL_STATS.FacultyCount++;
      }
    }
  }
  extractJOINRequestsFromUniversitiesData() {
    for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
      if (this.AllUsersRecievedFromDB[i].UserType == 'university'
        &&
        this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending'
      ) {
        this.JOINRequestsUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
      }
    }
    console.log(
      "this.JOINRequestsUniversitiesData ", this.JOINRequestsUniversitiesData
    );
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
  //     this.http.put(BASE_URL+"/api/Users/UpdateThisUser/"+Id, uniUpdatedUser)
  //       .subscribe(
  //         response => {
  //           console.log(response);
  //         }
  //       );
  //  }



  ResetEntrireDatabase() {
    this.http.get(BASE_URL+"/api/Users/ResetEntrireDatabase/")
      .subscribe(
        response => {
          console.log(response);
        }
      );
    this.http.get(BASE_URL+"/api/StudentLabData/ResetEntrireDatabase/").subscribe(
      response => {
        console.log(response);
      }
    );
    this.http.get(BASE_URL+"/api/Labs/ResetEntrireDatabase/")
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

}
