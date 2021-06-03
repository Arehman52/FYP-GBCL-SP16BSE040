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

  constructor(private studentLabDataService: StudentLabDataService, private labsService: LabsService, private usersService: UsersService, private gamificationService: GamificationService) { }


  ngOnInit() {
    this.showSpinner = false;
    this.AllUsersDownloaded = this.usersService.RecieveAllUsersFromDB();
    this.TheLabArray = this.labsService.FetchThisLab(this.LabID);
    let StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string } = { LabJoinCode: this.LabID, StudentzUsername: this.StudentzUsername };
    this.CurrentStatsOfThisStudent = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);




    setTimeout(() => {
      console.log("this.CurrentStatsOfThisStudent : ", this.CurrentStatsOfThisStudent);
      this.setNextAndCurrentBadgeAndXPsForPromotion(this.CurrentStatsOfThisStudent[0].currentXPs);
      if (this.CurrentStatsOfThisStudent[0].LevelUpdateViewed == false) {



        if (this.CurrentStatsOfThisStudent[0].currentXPs == 0 && this.CurrentStatsOfThisStudent[0].Demoted == false) {
          this.playHurrahAudio();
          this.displayThisMessageInModal("Welcome!! to the lab", "Your current badge is : " + this.CURRENT_BADGE);
        }
        if (this.CurrentStatsOfThisStudent[0].currentXPs < 60 && this.CurrentStatsOfThisStudent[0].Demoted) {
          this.displayThisMessageInModal("Demoted to very first level", "Your current badge is : " + this.CURRENT_BADGE);
        }


        if (this.CurrentStatsOfThisStudent[0].Promoted && this.CurrentStatsOfThisStudent[0].LevelUpdateViewed == false) {
          this.playHurrahAudio();
          this.displayThisMessageInModal("Hurrah!! You were Promoted.", "YOUR NEW BADGE IS : " + this.CURRENT_BADGE);
        }

        if (this.CurrentStatsOfThisStudent[0].Warned) {
          this.displayThisMessageInModal("WARNING!!...", "You were warned by the teacher, 50 XPs are deducted");
        }


        if (this.CurrentStatsOfThisStudent[0].Appreciated) {
          this.playHurrahAudio();
          this.displayThisMessageInModal("GOOD NEWS!!...", "You were Appreciated by the teacher, 50 XPs are given as a bonus.");
        }

        if (this.CurrentStatsOfThisStudent[0].currentXPs >= 60 && this.CurrentStatsOfThisStudent[0].Demoted) {
          this.displayThisMessageInModal("You were Demoted, Alas!", "Better Luck next time, Badge Assigned = " + this.CURRENT_BADGE);
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
    }, 1200);



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

  showSpinner: boolean;
  MODAL_HEADING: string = '';
  MODAL_MESSAGE: string = '';
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
  showGamificationRules() {
    if (this.showGamificationRulesToggled) { this.showGamificationRulesToggled = false; }
    else { this.showGamificationRulesToggled = true; }
  }


  playHurrahAudio(){
    let audio = new Audio();
    audio.src = "../assets/sounds/hurrah.wav";
    audio.load();
    audio.play();
  }

  displayThisMessageInModal(MODAL_HEADING: string, MODAL_MESSAGE: string) {
    this.MODAL_HEADING = MODAL_HEADING;
    this.MODAL_MESSAGE = MODAL_MESSAGE;
    document.getElementById("LevelUpdatedModalButton").click();
  }

  setNextAndCurrentBadgeAndXPsForPromotion(currentXPs: number) {


    this.NEXT_BADGE = this.gamificationService.getNextBadge(currentXPs);



    this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(currentXPs);


    this.XP_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(currentXPs);
  }







  setRival(member: Usersmodel) {
    // fetch that collect
    this.showSpinner = true;
    let fetchedStatsOfStudentForSettingRivals: StudLabDataAndStatsmodel[] = [];
    fetchedStatsOfStudentForSettingRivals = this.studentLabDataService.getCurrentStatsOfThisStudent({
      LabJoinCode: this.LabID,
      StudentzUsername: this.localStorageUsername
    });

    // setTimeout(()=>{// fetch in this
    // },1500);
    setTimeout(() => { // set

      let matched: boolean = false;
      // let acllOK: boolean=true;

      if (fetchedStatsOfStudentForSettingRivals[0].RivalStudents.length < 5) {
        // allOK = true;
        for (let i = 0; i < fetchedStatsOfStudentForSettingRivals[0].RivalStudents.length; i++) {
          if (fetchedStatsOfStudentForSettingRivals[0].RivalStudents.includes(member.Username)) {
            matched = true;
            // allOK = false;
            // return;
          }
        }

        if (matched == true) {
          this.displayThisMessageInModal("Already a Rival!", "This student is already your Rival");

        } else {

          //set Rival here
          fetchedStatsOfStudentForSettingRivals[0].RivalStudents.push(member.Username);
          this.studentLabDataService.updateCurrentStatsOfThisStudent(fetchedStatsOfStudentForSettingRivals[0],
            {StudentzUsername: this.localStorageUsername, LabJoinCode:this.LabID});
            this.displayThisMessageInModal("Rival Set!", "This student is set as Rival.\n"
              + "You can view the recent activities of this student now. ");
        }

      }else{
        this.displayThisMessageInModal("Setting Rivals Limit Exceeded!", "You cannot set more than 5 students as Rivals");
      }


      this.showSpinner = false;

    }, 2500);
  }







  extractLabInfoANDLabMembers() {
    let membersCount = 0;
    console.log("{Username: this.TheLabArray[0].LabInstructor}", { Username: this.TheLabArray[0].LabInstructor });
    let Instructor: Usersmodel[] = [];
    Instructor = this.usersService.FetchThisUser({ Username: this.TheLabArray[0].LabInstructor });
    for (let i = 0; i < this.AllUsersDownloaded.length; i++) {
      if (this.AllUsersDownloaded[i].LabJoinCodesOfJoinedLabs.includes(this.TheLabArray[0]._id)) {
        membersCount++;
        // if (this.AllUsersDownloaded[i].Username != this.localStorageUsername && this.AllUsersDownloaded[i].UserType == 'student') {
        this.TheLabMembers.push(this.AllUsersDownloaded[i]);
        // }
        // console.log('membersCount++ ==>', membersCount);
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
