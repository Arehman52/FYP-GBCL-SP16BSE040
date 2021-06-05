import { Component, OnInit } from '@angular/core';
import { Labsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-tlab-dashboard',
  templateUrl: './tlab-dashboard.component.html',
  styleUrls: ['./tlab-dashboard.component.css']
})
export class TlabDashboardComponent implements OnInit {

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
  TheLabArray: Labsmodel[] = [];

  LabInfo: { JoinCode: string, LabTitle: string, LabMembersCount: number, LabClass: string, LabProgram: string } = { LabProgram: '', LabMembersCount: 0, JoinCode: '', LabTitle: '', LabClass: '' };


  showGamificationRulesToggled = false;
  showGamificationRules(){
    if (this.showGamificationRulesToggled) { this.showGamificationRulesToggled = false; }
    else { this.showGamificationRulesToggled = true; }
  }

  extractLabInfoANDLabMembers() {
    let membersCount = 0;
    // console.log("{Username: this.TheLabArray[0].LabInstructor}", { Username: this.TheLabArray[0].LabInstructor });
    // let Instructor: Usersmodel[] = [];
    // Instructor = this.usersService.FetchThisUser({ Username: this.TheLabArray[0].LabInstructor });
    for (let i = 0; i < this.AllUsersDownloaded.length; i++) {
      if (this.AllUsersDownloaded[i].LabJoinCodesOfJoinedLabs.includes(this.TheLabArray[0]._id)) {
        membersCount++;
        this.TheLabMembers.push(this.AllUsersDownloaded[i]);
        console.log('membersCount++ ==>', membersCount);
      }
    }

    setTimeout(() => {
      this.LabInfo = { JoinCode: this.TheLabArray[0]._id, LabTitle: this.TheLabArray[0].LabTitle, LabMembersCount: membersCount, LabClass: this.TheLabArray[0].LabClass, LabProgram: this.TheLabArray[0].LabProgram };
    }, 500);


  }
















  localStorageUsername = localStorage.getItem("UsersUsername");




  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/TEACHER"
  }


  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }


}
