import { Component, OnInit } from '@angular/core';
import { Labsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labsmodel.model';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-slab-dashboard',
  templateUrl: './slab-dashboard.component.html',
  styleUrls: ['./slab-dashboard.component.css']
})
export class SlabDashboardComponent implements OnInit {

  constructor(private labsService: LabsService, private usersService: UsersService) { }
  ngOnInit() {
    // this.AllLabsDownloaded = this.labsService.RecieveAllLabsFromDB();
    this.AllUsersDownloaded = this.usersService.RecieveAllUsersFromDB();
    this.TheLabArray = this.labsService.FetchThisLab(localStorage.getItem("LabID"));
    setTimeout(() => {
      this.extractLabInfoANDLabMembers();
    }, 1000);
  }

  AllLabsDownloaded: Labsmodel[] = [];
  TheLabMembers: Usersmodel[] = [];
  AllUsersDownloaded: Usersmodel[] = [];
  LabInfo: { JoinCode: string, LabTitle: string, LabInstructorFNLN: string, LabMembersCount: number } = { LabInstructorFNLN: '', LabMembersCount: 0, JoinCode: '', LabTitle: '' };



  setRival(Username: string) {
    alert(Username);
  }

  extractLabInfoANDLabMembers() {
    let membersCount = 0;
    console.log("{Username: this.TheLabArray[0].LabInstructor}", { Username: this.TheLabArray[0].LabInstructor });
    let Instructor: Usersmodel[] = [];
    Instructor = this.usersService.FetchThisUser({ Username: this.TheLabArray[0].LabInstructor });
    for (let i = 0; i < this.AllUsersDownloaded.length; i++) {
      if (this.AllUsersDownloaded[i].LabJoinCodesOfJoinedLabs.includes(this.TheLabArray[0]._id)) {
        membersCount++;
        if(this.AllUsersDownloaded[i].Username != this.localStorageUsername && this.AllUsersDownloaded[i].UserType == 'student'){
          this.TheLabMembers.push(this.AllUsersDownloaded[i]);
        }
        console.log('membersCount++ ==>', membersCount);
      }
    }

    setTimeout(() => {
      this.LabInfo = { JoinCode: this.TheLabArray[0]._id, LabTitle: this.TheLabArray[0].LabTitle, LabMembersCount: membersCount, LabInstructorFNLN: Instructor[0].FirstNameOfUser + " " + Instructor[0].LastNameOfUser };
    }, 500);


  }
  TheLabArray: Labsmodel[] = [];







  // members = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  // localStorageLabId: string;
  localStorageUsername = localStorage.getItem("UsersUsername");




  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }







}
