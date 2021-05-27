import { Component, OnDestroy, OnInit } from '@angular/core';
import { Labsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labsmodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-slab-dashboard',
  templateUrl: './slab-dashboard.component.html',
  styleUrls: ['./slab-dashboard.component.css']
})
export class SlabDashboardComponent implements OnInit {

  constructor(private studentLabDataService: StudentLabDataService, private labsService: LabsService, private usersService: UsersService) { }


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






  displayThisMessageInModal(MODAL_HEADING:string, MODAL_MESSAGE:string){
    this.MODAL_HEADING = MODAL_HEADING;
    this.MODAL_MESSAGE = MODAL_MESSAGE;
    document.getElementById("LevelUpdatedModalButton").click();
  }

  setNextAndCurrentBadgeAndXPsForPromotion(currentXPs: number) {

    let nextBadge: string = '';
    let currentBadge: string = '';
    let xpsForPromotion: number = 0;
    let dump = '';
    currentXPs < 60 ? nextBadge = 'Beginner II' : dump = 'no-badge';
    currentXPs >= 60 && currentXPs < 120 ? nextBadge = 'Beginner III' : dump = 'no-badge';
    currentXPs >= 120 && currentXPs < 180 ? nextBadge = 'Beginner IV' : dump = 'no-badge';
    currentXPs >= 180 && currentXPs < 240 ? nextBadge = 'Intermediate I' : dump = 'no-badge';
    currentXPs >= 240 && currentXPs < 300 ? nextBadge = 'Intermediate II' : dump = 'no-badge';
    currentXPs >= 300 && currentXPs < 360 ? nextBadge = 'Intermediate III' : dump = 'no-badge';
    currentXPs >= 360 && currentXPs < 420 ? nextBadge = 'Intermediate IV' : dump = 'no-badge';
    currentXPs >= 420 && currentXPs < 480 ? nextBadge = 'Master I' : dump = 'no-badge';
    currentXPs >= 480 && currentXPs < 540 ? nextBadge = 'Master II' : dump = 'no-badge';
    currentXPs >= 540 && currentXPs < 600 ? nextBadge = 'Master III' : dump = 'no-badge';
    currentXPs >= 600 && currentXPs < 660 ? nextBadge = 'Master IV' : dump = 'no-badge';
    currentXPs >= 660 && currentXPs < 720 ? nextBadge = 'Pro I' : dump = 'no-badge';
    currentXPs >= 720 && currentXPs < 780 ? nextBadge = 'Pro II' : dump = 'no-badge';
    currentXPs >= 780 && currentXPs < 840 ? nextBadge = 'Pro III' : dump = 'no-badge';
    currentXPs >= 840 && currentXPs < 900 ? nextBadge = 'Pro IV' : dump = 'no-badge';
    currentXPs >= 900 && currentXPs < 960 ? nextBadge = 'Hotshot I' : dump = 'no-badge';
    currentXPs >= 960 && currentXPs < 1020 ? nextBadge = 'Hotshot II' : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs < 1080 ? nextBadge = 'Hotshot III' : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs < 1140 ? nextBadge = 'Hotshot IV' : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs < 1200 ? nextBadge = 'Honoury I' : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs < 1260 ? nextBadge = 'Honoury II' : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs < 1320 ? nextBadge = 'Honoury III' : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs < 1380 ? nextBadge = 'Honoury IV' : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs < 1440 ? nextBadge = 'ULTIMATE CODER' : dump = 'no-badge';
    this.NEXT_BADGE = nextBadge;



    currentXPs < 60 ? currentBadge = 'Beginner I' : dump = 'no-badge';
    currentXPs >= 60 && currentXPs <= 119 ? currentBadge = 'Beginner II' : dump = 'no-badge';
    currentXPs >= 120 && currentXPs <= 179 ? currentBadge = 'Beginner III' : dump = 'no-badge';
    currentXPs >= 180 && currentXPs <= 239 ? currentBadge = 'Beginner IV' : dump = 'no-badge';
    currentXPs >= 240 && currentXPs <= 299 ? currentBadge = 'Intermediate I' : dump = 'no-badge';
    currentXPs >= 300 && currentXPs <= 359 ? currentBadge = 'Intermediate II' : dump = 'no-badge';
    currentXPs >= 360 && currentXPs <= 419 ? currentBadge = 'Intermediate III' : dump = 'no-badge';
    currentXPs >= 420 && currentXPs <= 479 ? currentBadge = 'Intermediate IV' : dump = 'no-badge';
    currentXPs >= 480 && currentXPs <= 539 ? currentBadge = 'Master I' : dump = 'no-badge';
    currentXPs >= 540 && currentXPs <= 599 ? currentBadge = 'Master II' : dump = 'no-badge';
    currentXPs >= 600 && currentXPs <= 659 ? currentBadge = 'Master III' : dump = 'no-badge';
    currentXPs >= 660 && currentXPs <= 719 ? currentBadge = 'Master IV' : dump = 'no-badge';
    currentXPs >= 720 && currentXPs <= 779 ? currentBadge = 'Pro I' : dump = 'no-badge';
    currentXPs >= 780 && currentXPs <= 839 ? currentBadge = 'Pro II' : dump = 'no-badge';
    currentXPs >= 840 && currentXPs <= 899 ? currentBadge = 'Pro III' : dump = 'no-badge';
    currentXPs >= 900 && currentXPs <= 959 ? currentBadge = 'Pro IV' : dump = 'no-badge';
    currentXPs >= 960 && currentXPs <= 1019 ? currentBadge = 'Hotshot I' : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs <= 1079 ? currentBadge = 'Hotshot II' : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs <= 1139 ? currentBadge = 'Hotshot III' : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs <= 1199 ? currentBadge = 'Hotshot IV' : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs <= 1259 ? currentBadge = 'Honoury I' : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs <= 1319 ? currentBadge = 'Honoury II' : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs <= 1379 ? currentBadge = 'Honoury III' : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs <= 1439 ? currentBadge = 'Honoury IV' : dump = 'no-badge';
    currentXPs >= 1440 ? currentBadge = 'ULTIMATE CODER' : dump = 'no-badge';
    this.CURRENT_BADGE = currentBadge;



    currentXPs < 60 ? xpsForPromotion = 60-currentXPs : dump = 'no-badge';
    currentXPs >= 60 && currentXPs <= 119 ? xpsForPromotion = 120-currentXPs : dump = 'no-badge';
    currentXPs >= 120 && currentXPs <= 179 ? xpsForPromotion = 180-currentXPs : dump = 'no-badge';
    currentXPs >= 180 && currentXPs <= 239 ? xpsForPromotion = 240-currentXPs : dump = 'no-badge';
    currentXPs >= 240 && currentXPs <= 299 ? xpsForPromotion = 300-currentXPs : dump = 'no-badge';
    currentXPs >= 300 && currentXPs <= 359 ? xpsForPromotion = 360-currentXPs : dump = 'no-badge';
    currentXPs >= 360 && currentXPs <= 419 ? xpsForPromotion = 420-currentXPs : dump = 'no-badge';
    currentXPs >= 420 && currentXPs <= 479 ? xpsForPromotion = 480-currentXPs : dump = 'no-badge';
    currentXPs >= 480 && currentXPs <= 539 ? xpsForPromotion = 540-currentXPs : dump = 'no-badge';
    currentXPs >= 540 && currentXPs <= 599 ? xpsForPromotion = 600-currentXPs : dump = 'no-badge';
    currentXPs >= 600 && currentXPs <= 659 ? xpsForPromotion = 660-currentXPs : dump = 'no-badge';
    currentXPs >= 660 && currentXPs <= 719 ? xpsForPromotion = 720-currentXPs : dump = 'no-badge';
    currentXPs >= 720 && currentXPs <= 779 ? xpsForPromotion = 780-currentXPs : dump = 'no-badge';
    currentXPs >= 780 && currentXPs <= 839 ? xpsForPromotion = 840-currentXPs : dump = 'no-badge';
    currentXPs >= 840 && currentXPs <= 899 ? xpsForPromotion = 900-currentXPs : dump = 'no-badge';
    currentXPs >= 900 && currentXPs <= 959 ? xpsForPromotion = 960-currentXPs : dump = 'no-badge';
    currentXPs >= 960 && currentXPs <= 1019 ? xpsForPromotion = 1020-currentXPs : dump = 'no-badge';
    currentXPs >= 1020 && currentXPs <= 1079 ? xpsForPromotion = 1080-currentXPs : dump = 'no-badge';
    currentXPs >= 1080 && currentXPs <= 1139 ? xpsForPromotion = 1140-currentXPs : dump = 'no-badge';
    currentXPs >= 1140 && currentXPs <= 1199 ? xpsForPromotion = 1200-currentXPs : dump = 'no-badge';
    currentXPs >= 1200 && currentXPs <= 1259 ? xpsForPromotion = 1260-currentXPs : dump = 'no-badge';
    currentXPs >= 1260 && currentXPs <= 1319 ? xpsForPromotion = 1320-currentXPs : dump = 'no-badge';
    currentXPs >= 1320 && currentXPs <= 1379 ? xpsForPromotion = 1380-currentXPs : dump = 'no-badge';
    currentXPs >= 1380 && currentXPs <= 1439 ? xpsForPromotion = 1440-currentXPs : dump = 'no-badge';
    currentXPs >= 1440 ? xpsForPromotion = 1440 : dump = 'no-badge';
    this.XP_FOR_PROMOTION = xpsForPromotion;
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
