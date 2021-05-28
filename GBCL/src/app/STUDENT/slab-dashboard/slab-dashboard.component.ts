import { Component, OnDestroy, OnInit } from '@angular/core';
import { Labsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labsmodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { GamificationService } from 'src/app/Services/gamification.service';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-slab-dashboard',
  templateUrl: './slab-dashboard.component.html',
  styleUrls: ['./slab-dashboard.component.css']
})
export class SlabDashboardComponent implements OnInit {

  constructor(private studentLabDataService: StudentLabDataService, private labsService: LabsService, private usersService: UsersService, private gamificationService:GamificationService) { }


  ngOnInit() {
    this.AllUsersDownloaded = this.usersService.RecieveAllUsersFromDB();
    this.TheLabArray = this.labsService.FetchThisLab(this.LabID);
    let StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string } = { LabJoinCode: this.LabID, StudentzUsername: this.StudentzUsername };
    this.CurrentStatsOfThisStudent = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);




    setTimeout(() => {
      this.setNextAndCurrentBadgeAndXPsForPromotion(this.CurrentStatsOfThisStudent[0].currentXPs);
      if (this.CurrentStatsOfThisStudent[0].LevelUpdateViewed == false) {



        if(this.CurrentStatsOfThisStudent[0].currentXPs == 0){
          this.displayThisMessageInModal("Welcome!! to the lab","Your current badge is : "+this.CURRENT_BADGE);
        }


        if(this.CurrentStatsOfThisStudent[0].Promoted){
          this.displayThisMessageInModal("Hurrah!! You were Promoted.","YOUR NEW BADGE IS : "+this.CURRENT_BADGE);
        }
        if(this.CurrentStatsOfThisStudent[0].Demoted){
          this.displayThisMessageInModal("You were Demoted, Alas!","Better Luck next time, Badge Assigned = "+this.CURRENT_BADGE);
        }

        // if()///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////// ./
        //////////////////////////////////////////////////Promoted: Boolean,
        //////////////////////////////////////////////////,Demoted: Boolean,
        ///////////////////////////////////////////////////////////// ./
        ///////////////////////////////////////////////////////////// ./
        ///////////////////////////////////////////////////////////// ./
        ///////////////////////////////////////////////////////////// ./

      }
      this.extractLabInfoANDLabMembers();
    }, 2000);



    setTimeout(() => {
      if (this.CurrentStatsOfThisStudent[0].LevelUpdateViewed == false) {
        // document.getElementById("LevelUpdatedModalButton").click();
        this.CurrentStatsOfThisStudent[0].LevelUpdateViewed = true;
        this.CurrentStatsOfThisStudent[0].Demoted = false;
        this.CurrentStatsOfThisStudent[0].Promoted = false;
        this.studentLabDataService.updateCurrentStatsOfThisStudent(this.CurrentStatsOfThisStudent[0], StudentzUsernameAndLabID);
      }
    }, 5000);

  }

  MODAL_HEADING:string = '';
  MODAL_MESSAGE:string = '';
  StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string };
  XP_FOR_PROMOTION: number = 0;
  NEXT_BADGE: string = '';
  CURRENT_BADGE: string = '';
  LabID: string = localStorage.getItem("LabID");
  StudentzUsername: string = localStorage.getItem("UsersUsername");
  CurrentStatsOfThisStudent: StudLabDataAndStatsmodel[] = [];
  AllLabsDownloaded: Labsmodel[] = [];
  TheLabMembers: Usersmodel[] = [];
  AllUsersDownloaded: Usersmodel[] = [];
  LabInfo: { JoinCode: string, LabTitle: string, LabInstructorFNLN: string, LabMembersCount: number } = { LabInstructorFNLN: '', LabMembersCount: 0, JoinCode: '', LabTitle: '' };



  showGamificationRulesToggled = false;
  showGamificationRules(){
    if (this.showGamificationRulesToggled) { this.showGamificationRulesToggled = false; }
    else { this.showGamificationRulesToggled = true; }
  }



  displayThisMessageInModal(MODAL_HEADING:string, MODAL_MESSAGE:string){
    this.MODAL_HEADING = MODAL_HEADING;
    this.MODAL_MESSAGE = MODAL_MESSAGE;
    document.getElementById("LevelUpdatedModalButton").click();
  }

  setNextAndCurrentBadgeAndXPsForPromotion(currentXPs: number) {


    this.NEXT_BADGE = this.gamificationService.getNextBadge(currentXPs);



    this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(currentXPs);


    this.XP_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(currentXPs);
  }







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
        if (this.AllUsersDownloaded[i].Username != this.localStorageUsername && this.AllUsersDownloaded[i].UserType == 'student') {
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
