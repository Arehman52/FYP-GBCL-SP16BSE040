import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NumericTypes } from 'mongoose';
import { LabChallengesmodel } from 'src/app/MODELS/Lab-Frontend-Models/labchallengesmodel.model';
import { StudentAttemptedLabChallengemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { GamificationService } from 'src/app/Services/gamification.service';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit, OnDestroy {
  constructor(private gamificationService: GamificationService, private labsService: LabsService, private studentLabDataService: StudentLabDataService) { }

  CHeatedLabChallenge:StudentAttemptedLabChallengemodel = {
    AttemptedLabChallenge_id:'', ChallengeAttempted:true, ChallengeCheated:true, ChallengeChecked:false,ChallengeMatchPercentage:0,    ChallengeFailedDueToTimeShortage:false, ChallengeSolutionByTeacher:'', ChallengeXPs:0, GainedXPs:0, LabChallengeAnswerOptionA:'',
    LabChallengeAnswerOptionB:'', LabChallengeAnswerOptionC:'', LabChallengeAnswerOptionD:'', LabChallengeQuestion:'', LabChallengeQuestionType:'', LabJoinCode:'', StudentzUsername:'', _id:''

  };

  ngOnDestroy(): void {

    this.CHeatedLabChallenge.ChallengeXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
    this.CHeatedLabChallenge._id = this.unAttemptedChallenges[this.i]._id;
    this.CHeatedLabChallenge.LabChallengeQuestion = this.unAttemptedChallenges[this.i].ChallengeQuestion;
    this.CHeatedLabChallenge.LabChallengeQuestionType = this.unAttemptedChallenges[this.i].ChallengeQuestionType;
    this.CHeatedLabChallenge.LabJoinCode = this.LabID;
    this.CHeatedLabChallenge.StudentzUsername = this.localStorageUsername;




    this.pauseTimer();
    if(this.unAttemptedChallenges.length!=0){
      alert("You were in middle of attempting the challenge, It is cosidered as Cheated if open other pages. 0 XPs assigned for this challenge marked as cheated.");
    }
    /////////////////////////////////////////////////////////////////
    this.XPplusplusOrminusminus = " XPs--"
    this.Errors.ChallengeFailed.status = true;
    let negativeXPs: number = this.unAttemptedChallenges[this.i].ChallengeXPs * -1;
    this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs == 0 ? negativeXPs = 0 : console.log("XPs are more than 0");
    console.log("negativeXPs::::::::::::::::=== ", negativeXPs);
    let latestXPs: number = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs + negativeXPs;
    this.CURRENT_XPs = latestXPs;
    this.CHeatedLabChallenge.GainedXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
    this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], negativeXPs);
    this.studentLabDataService.updateThisStudentAttemptedLabChallenge(this.CHeatedLabChallenge, {
      LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
    });
    this.gamificationService.createHistory_AttemptedChallenge_Cheated(localStorage.getItem("UserzFirstNameOfUser") + ' ' + localStorage.getItem("UserzLastNameOfUser"), this.CHeatedLabChallenge.LabChallengeQuestion, this.unAttemptedChallenges[this.i].ChallengeXPs, {
      LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
    });
    this.ReInitiallizeCurrentStats();


    this.unAttemptedChallenges[this.i].AttemptedByStudents.push(this.localStorageUsername);

    this.labsService.updateThisLabChallenge(this.unAttemptedChallenges[this.i]);
    // done 2 below.
    this.studentLabDataService.createThisStudentAttemptedLabChallenge(this.CHeatedLabChallenge);
    /////////////////////////////////////////////////////////////////
  }

  ngOnInit(): void {
    // this.showSpinner = true;

    this.setAllErrorsToFalse();
    if (confirm("Are you ready to attempt the challenges?")) {
      alert("We will begin when you click OK.");
      setTimeout(() => {
        // this.showSpinner = false;
        if(this.unAttemptedChallenges.length == 0){
          return;
        }else{
          this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
        }
      }, 1000);
    } else {
      window.history.back();
    }
    this.LabID = localStorage.getItem("LabID");


    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    // getAllChallengesOfThisLabFromDB
    this.AllLabChallengesOfThisLabFromDB = this.labsService.getAllChallengesOfThisLabFromDB(objLabJoinCode);
    this.AllStudentAttemptedChallengesOfthisStudandThisLab = this.studentLabDataService.RecieveAllStudentAttemptedChallengesOfthisStudandThisLab(this.LabID, this.localStorageUsername);
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };
    this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

    this.startTimer();
    setTimeout(() => {
      this.InitiallizeCurrentStats();
      this.extractUnAttemptedLabChallenges();
      console.log("this.STUDz_FETCHED_STATS_FROM_Db : ", this.STUDz_FETCHED_STATS_FROM_Db);
      console.log("this.attemptedChallenges : ", this.attemptedChallenges);
      console.log("this.unAttemptedChallenges : ", this.unAttemptedChallenges);
      console.log("this.AllLabChallengesOfThisLabFromDB == > ", this.AllLabChallengesOfThisLabFromDB);
      console.log("this.AllStudentAttemptedChallengesOfthisStudandThisLab == > ", this.AllStudentAttemptedChallengesOfthisStudandThisLab);
    }, 800);
  } //ngOnInt closes here
  InitiallizeCurrentStats() {

    this.CURRENT_XPs = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs;
    // this.COPY_CURRENT_XPs = this.CURRENT_XPs;
    this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(this.CURRENT_XPs);
    this.NEXT_BADGE = this.gamificationService.getNextBadge(this.CURRENT_XPs);
    this.XPs_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(this.CURRENT_XPs);
    this.CURRENT_LEVEL = this.gamificationService.getCurrentLevel(this.CURRENT_XPs);
  }


  ReInitiallizeCurrentStats() {
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };

    // this.STUDz_FETCHED_STATS_FROM_Db= [];
    // this.CURRENT_XPs = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs;
    // this.COPY_CURRENT_XPs = this.CURRENT_XPs;
    setTimeout(() => {
      this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);
      console.log("this.STUDz_FETCHED_STATS_FROM_Db after 500 ;;;",this.STUDz_FETCHED_STATS_FROM_Db);
    }, 500);

    setTimeout(() => {
      console.log("this.STUDz_FETCHED_STATS_FROM_Db  after 750 ;;;",this.STUDz_FETCHED_STATS_FROM_Db);
      this.CURRENT_XPs = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs;
      this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(this.CURRENT_XPs);
      this.NEXT_BADGE = this.gamificationService.getNextBadge(this.CURRENT_XPs);
      this.XPs_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(this.CURRENT_XPs);
      this.CURRENT_LEVEL = this.gamificationService.getCurrentLevel(this.CURRENT_XPs);

    }, 750);
  }



  AllLabChallengesOfThisLabFromDB: LabChallengesmodel[] = [];
  AllStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
  attemptedChallenges: LabChallengesmodel[] = [];
  unAttemptedChallenges: LabChallengesmodel[] = [];
  LENGTH_unAttemptedChallenges: number = 0;
  STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[] = [];
  MODAL_HEADING: string;
  MODAL_MESSAGE: string;
  showSpinner: boolean = false;

  LabID: string;
  localStorageUsername = localStorage.getItem("UsersUsername");
  CURRENT_BADGE: string = '';
  NEXT_BADGE: string = '';
  XPs_FOR_PROMOTION: number = 0;
  CURRENT_LEVEL: number = 0;
  CURRENT_XPs: number = 0;
  // COPY_CURRENT_XPs: number = 0;
  CHANGED_XP: number = 10;
  UNCHANGED_STATS: number = 1;
  SHOW_CHALLENGE_RELATED_DIVS: boolean = false;




  extractUnAttemptedLabChallenges() {
    this.unAttemptedChallenges = [];
    this.attemptedChallenges = [];

    for (let i = 0; i < this.AllLabChallengesOfThisLabFromDB.length; i++) {
      if (this.AllLabChallengesOfThisLabFromDB[i].AttemptedByStudents.includes(this.localStorageUsername)) {
        this.attemptedChallenges.push(this.AllLabChallengesOfThisLabFromDB[i]);
      } else {
        this.unAttemptedChallenges.push(this.AllLabChallengesOfThisLabFromDB[i]);
      }
    }

    // if (this.unAttemptedChallenges.length > 0) { this.SHOW_CHALLENGE_RELATED_DIVS = true; }
    if (this.i < this.unAttemptedChallenges?.length) { this.SHOW_CHALLENGE_RELATED_DIVS = true; }
    else { this.SHOW_CHALLENGE_RELATED_DIVS = false; }
    this.LENGTH_unAttemptedChallenges = this.unAttemptedChallenges.length;
    console.log("unAttemptedChallenges ========#####", this.unAttemptedChallenges);

  }



  timedOUTFailed(unAttemptedChallenge:StudentAttemptedLabChallengemodel){

    unAttemptedChallenge.ChallengeXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
    unAttemptedChallenge._id = this.unAttemptedChallenges[this.i]._id;
    unAttemptedChallenge.LabChallengeQuestion = this.unAttemptedChallenges[this.i].ChallengeQuestion;
    unAttemptedChallenge.LabChallengeQuestionType = this.unAttemptedChallenges[this.i].ChallengeQuestionType;
    unAttemptedChallenge.LabJoinCode = this.LabID;
    unAttemptedChallenge.StudentzUsername = this.localStorageUsername;




    // this.pauseTimer();
    // if(this.unAttemptedChallenges.length!=0){
    //   alert("You were in middle of attempting the challenge, It is cosidered as Cheated if open other pages. 0 XPs assigned for this challenge marked as cheated.");
    // }
    /////////////////////////////////////////////////////////////////
    this.XPplusplusOrminusminus = " XPs--"
    this.Errors.ChallengeFailed.status = true;
    let negativeXPs: number = this.unAttemptedChallenges[this.i].ChallengeXPs * -1;
    this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs == 0 ? negativeXPs = 0 : console.log("XPs are more than 0");
    console.log("negativeXPs::::::::::::::::=== ", negativeXPs);
    let latestXPs: number = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs + negativeXPs;
    this.CURRENT_XPs = latestXPs;
    unAttemptedChallenge.GainedXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
    this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], negativeXPs);
    this.studentLabDataService.updateThisStudentAttemptedLabChallenge(unAttemptedChallenge, {
      LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
    });
    this.gamificationService.createHistory_AttemptedChallenge_TimedoutFailed(localStorage.getItem("UserzFirstNameOfUser") + ' ' + localStorage.getItem("UserzLastNameOfUser"), unAttemptedChallenge.LabChallengeQuestion, this.unAttemptedChallenges[this.i].ChallengeXPs, {
      LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
    });
    this.ReInitiallizeCurrentStats();


    this.unAttemptedChallenges[this.i].AttemptedByStudents.push(this.localStorageUsername);

    this.labsService.updateThisLabChallenge(this.unAttemptedChallenges[this.i]);
    // done 2 below.
    this.studentLabDataService.createThisStudentAttemptedLabChallenge(unAttemptedChallenge);
    /////////////////////////////////////////////////////////////////
  }









  takeHint() {
    alert("Taking Hint will reduce XPs by 50%");
  }


  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT"
  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }














  //==============================previous code================
  i = 0;


  // checskIfErrors(): boolean {
  //   return (this.Errors.ChallengeFailed.status
  //     && this.Errors.ChallengePassed.status
  //     && this.Errors.ChallengeSubmitted.status
  //     && this.Errors.emptyField.status
  //   )
  // }
  setAllErrorsToFalse() {
    this.Errors.ChallengeFailed.status = false;
    this.Errors.ChallengePassed.status = false;
    this.Errors.ChallengeSubmitted.status = false;
  }

  Errors = {
    emptyField: {
      status: true,
      message: 'Fields are empty.',
    },
    ChallengeSubmitted: {
      status: true,
      message: 'Your answer to this challenge is submitted.',
    },
    ChallengeFailed: {
      status: true,
      message: 'Oh!!!, You Failed the challenge.',
    },
    ChallengePassed: {
      status: true,
      message: 'Yahhoo!!!, You Passed the challenge.',
    }
  }


  // <---timer code
  timeLeft: number = 1;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {




        let TIMEDOUTLabChallenge:StudentAttemptedLabChallengemodel = {
          AttemptedLabChallenge_id:this.unAttemptedChallenges[this.i]._id, ChallengeAttempted:true, ChallengeCheated:false, ChallengeChecked:false,ChallengeMatchPercentage:0,    ChallengeFailedDueToTimeShortage:true, ChallengeSolutionByTeacher:'', ChallengeXPs:this.unAttemptedChallenges[this.i].ChallengeXPs, GainedXPs:this.unAttemptedChallenges[this.i].ChallengeXPs*-1, LabChallengeAnswerOptionA:'',
          LabChallengeAnswerOptionB:'', LabChallengeAnswerOptionC:'', LabChallengeAnswerOptionD:'', LabChallengeQuestion:this.unAttemptedChallenges[this.i].ChallengeQuestion, LabChallengeQuestionType:this.unAttemptedChallenges[this.i].ChallengeQuestionType, LabJoinCode:this.LabID, StudentzUsername:this.localStorageUsername, _id:''

        };





        this.timedOUTFailed(TIMEDOUTLabChallenge);


        // if (this.i != 0) {
        setTimeout(() => {
          if (this.unAttemptedChallenges.length > 0) {
            this.Errors.ChallengeFailed.status = true;




            if (confirm("you Failed because timed out, do you want to continue further?")) {
              this.pauseTimer();
              this.setAllErrorsToFalse();
              // console.log(this.i);
              // console.log(this.challenges.length);
              if (this.i == this.LENGTH_unAttemptedChallenges) {
                // this.i = 0;
                alert("You have completed all challenges for now, come back soon for more challenges");
                window.location.href = "/STUDENT/Lab";
                return;
              } else {
                this.i++;
                // window.alert(this.challenges.length + 1);
                this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
                this.startTimer();

              }

            } else {
              window.location.href = "/STUDENT/Lab";
            }

          }
        }, 100);
        // return;
        // }

        ////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////   LOGIC OF QUETON FAILED DUE TO TIME SHORTAGE
        ////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////




        // this.timeLeft = 60;
      }
    }, 1200);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  // timer code ---->


  checkNonMCQAnswer(theAnswer: string) {
    theAnswer.length == 0 ? this.Errors.emptyField.status = true : this.Errors.emptyField.status = false
  }

  SELECTED_RADIO_VALUE: string = '';
  radioChangedHandler(event: any) {
    (event.target.value == "") ? this.Errors.emptyField.status = true : this.Errors.emptyField.status = false
    console.log(event.target.value);
    this.SELECTED_RADIO_VALUE = event.target.value;
  }


























  XPplusplusOrminusminus: string = 'Unchanged XPs';

  onSubmitChallenge(ChallengesForm: NgForm) {
    this.pauseTimer();
    // this.ReInitiallizeCurrentStats();    ///////////////////// dont think this is needed.
    // this.showSpinner = true;
    this.Errors.emptyField.status = true;
    let attemptedLabChallenge: StudentAttemptedLabChallengemodel = {

      ChallengeXPs: 0,
      ChallengeSolutionByTeacher: '',
      ChallengeMatchPercentage: 0,
      AttemptedLabChallenge_id: this.unAttemptedChallenges[this.i]._id,
      ChallengeAttempted: true,
      ChallengeCheated: false,
      ChallengeChecked: false,
      ChallengeFailedDueToTimeShortage: false,
      GainedXPs: 0,
      LabChallengeAnswerOptionA: '',
      LabChallengeAnswerOptionB: '',
      LabChallengeAnswerOptionC: '',
      LabChallengeAnswerOptionD: '',
      LabChallengeQuestion: this.unAttemptedChallenges[this.i].ChallengeQuestion, LabChallengeQuestionType: this.unAttemptedChallenges[this.i].ChallengeQuestionType,
      LabJoinCode: this.LabID,
      StudentzUsername: this.localStorageUsername,
      _id: ''
    }


    if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'MCQ') {
      if (this.SELECTED_RADIO_VALUE == this.unAttemptedChallenges[this.i].ChallengeCorrectOption) {

        this.playHurrahAudio();
        // alert("YOU CHOSE CORRECT OPTION");
        this.Errors.ChallengePassed.status = true;
        this.XPplusplusOrminusminus = "XPs++"
        // let latestXPs: number = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs + this.unAttemptedChallenges[this.i].ChallengeXPs;
        // this.ReInitiallizeCurrentStats(latestXPs);
        // this.CURRENT_XPs = latestXPs;
        attemptedLabChallenge.GainedXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
        this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], this.unAttemptedChallenges[this.i].ChallengeXPs);
        this.studentLabDataService.updateThisStudentAttemptedLabChallenge(attemptedLabChallenge, {
          LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
        });

        this.gamificationService.createHistory_AttemptedMCQChallenge_Passed(localStorage.getItem("UserzFirstNameOfUser") + ' ' + localStorage.getItem("UserzLastNameOfUser"), attemptedLabChallenge.LabChallengeQuestion, this.unAttemptedChallenges[this.i].ChallengeXPs, {
          LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
        });

        this.ReInitiallizeCurrentStats();

      }
      else {
        this.playGroansAudio();
        // alert("YOU CHOSE inCORRECT OPTION");
        this.XPplusplusOrminusminus = " XPs--"
        this.Errors.ChallengeFailed.status = true;
        let negativeXPs: number = this.unAttemptedChallenges[this.i].ChallengeXPs * -1;
        this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs == 0 ? negativeXPs = 0 : console.log("XPs are more than 0");
        console.log("negativeXPs::::::::::::::::=== ", negativeXPs);
        let latestXPs: number = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs + negativeXPs;
        this.CURRENT_XPs = latestXPs;
        attemptedLabChallenge.GainedXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
        this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], negativeXPs);
        this.studentLabDataService.updateThisStudentAttemptedLabChallenge(attemptedLabChallenge, {
          LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
        });
        this.gamificationService.createHistory_AttemptedMCQChallenge_Failed(localStorage.getItem("UserzFirstNameOfUser") + ' ' + localStorage.getItem("UserzLastNameOfUser"), attemptedLabChallenge.LabChallengeQuestion, this.unAttemptedChallenges[this.i].ChallengeXPs, {
          LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername
        });
        this.ReInitiallizeCurrentStats();

      }
    }


    if (this.unAttemptedChallenges[this.i].ChallengeQuestionType != 'MCQ') {
      this.XPplusplusOrminusminus = " ------- ";
      //check if answer is valid at least 1 character long, i
      if (ChallengesForm.value.theAnswer.length < 1) {
        alert("You must fill the answer text area!");
        return;
      } else {
        this.Errors.ChallengeSubmitted.status = true;
        attemptedLabChallenge.LabChallengeAnswerOptionA = ChallengesForm.value.theAnswer;
      }
    }

    //now update
    this.unAttemptedChallenges[this.i].AttemptedByStudents.push(this.localStorageUsername);
    // 1. update  this.unAttemptedChallenges because its AttemptedByStudents field changed.
    // 2. store newly created attemptedLabChallenge to StudentAttemptedChallenges.
    // 3. @@@@@ in case of MCQ attempt @@@@ update statistics in StudentLabDataAndStatistics.
    //   by changing and updating STUDz_FETCHED_STATS_FROM_Db[0] to the db.
    // 4. Update or create StudentActivityHirstory Collection as well.
    // done 1 below.
    this.labsService.updateThisLabChallenge(this.unAttemptedChallenges[this.i]);
    // done 2 below.
    this.studentLabDataService.createThisStudentAttemptedLabChallenge(attemptedLabChallenge);
    // done 3 below.



    console.log("attemptedLabChallenge: ", attemptedLabChallenge);





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////// below code of onSubmitLabchallenge is for next challenge... do not change
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let opt: boolean;
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };
    this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);
    setTimeout(() => {
      // this.reInitiallizeCurrentStats();
      if (this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs >= 60 && this.STUDz_FETCHED_STATS_FROM_Db[0].Demoted) {
        this.playGroansAudio();
        this.displayThisMessageInModal("You were Demoted, Alas!", "Better Luck next time, Badge Assigned = " + this.CURRENT_BADGE);
      }



      if (this.STUDz_FETCHED_STATS_FROM_Db[0].Promoted) {
        this.playHurrahAudio();
        this.displayThisMessageInModal("Hurrah!! You were Promoted.", "YOUR NEW BADGE IS : " + this.CURRENT_BADGE);
      }

    }, 1500);
    setTimeout(() => {

      if (this.STUDz_FETCHED_STATS_FROM_Db[0].LevelUpdateViewed == false) {
        // document.getElementById("LevelUpdatedModalButton").click();
        this.STUDz_FETCHED_STATS_FROM_Db[0].LevelUpdateViewed = true;
        this.STUDz_FETCHED_STATS_FROM_Db[0].Demoted = false;
        this.STUDz_FETCHED_STATS_FROM_Db[0].Promoted = false;
        this.studentLabDataService.updateCurrentStatsOfThisStudent(this.STUDz_FETCHED_STATS_FROM_Db[0], StudentzUsernameAndLabID);
      }


      if (opt = confirm("Ready for next challenge.")) {
        // this.ReInitiallizeCurrentStats();
        if (opt == true) {
          ChallengesForm.reset();
          // this.showSpinner = false;
          this.XPplusplusOrminusminus = " ------- ";
          this.setAllErrorsToFalse();
          console.log("this.LENGTH_unAttemptedChallenges :::::: ", this.LENGTH_unAttemptedChallenges);
          console.log("this.i :::::: ", this.i);
          if (this.i+1 < this.LENGTH_unAttemptedChallenges) {
          this.i++;
          this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
          this.startTimer();
          } else {

            alert("You have completed all challenges for now, come back soon for more challenges");
            window.location.href = "/STUDENT/Lab";
          }

        }


      } else {
        window.location.href = "/STUDENT/Lab";
      }
    }, 2000);

  }









































  playGroansAudio(){
    let audiog = new Audio();
    audiog.src = "../assets/sounds/g.wav";
    audiog.load();
    audiog.play();
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

  reload() {
    window.location.reload()
  }
}
