import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomepageService } from '../gbcl-homepage/homepage.service';
import { UniversityModel } from '../MODELS/universitymodel.model';
import { Usersmodel } from '../MODELS/usersmodel.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.homepageService.countPlusPlus();
    setTimeout(() => {
      this.extractJOINRequestsFromUniversitiesData();
    }, 300);
    this.AllUsersRecievedFromDB = this.homepageService.RecieveAllUsersFromDB();
  }

  private AllUsersRecievedFromDB: Usersmodel[] = [];
  JOINRequestsUniversitiesData: Usersmodel[] = [];


  UniversitiesData: UniversityModel[] = [{
    Id: 'uni1',
    UniTitle: 'COMSATS University Islamabad',
    AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
    AccessStatus: 'Pending',
    HECID: 'FAC241',
    FacultyCount: 85,
    LabsCount: 34,
    StudentsCount: 391
  },
  {
    Id: 'uni2',
    UniTitle: 'COMSATS University Lahore',
    AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
    AccessStatus: 'Pending',
    HECID: 'FAC242',
    FacultyCount: 25,
    LabsCount: 28,
    StudentsCount: 208
  }];


  extractJOINRequestsFromUniversitiesData() {
    if (this.JOINRequestsUniversitiesData.length == 0) {
      for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
        if (this.AllUsersRecievedFromDB[i].UserType == 'university'
          &&
          this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Pending'
        ) {
          this.JOINRequestsUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
        }
      }
    }

  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
