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


  ngOnDestroy(): void {
    this.pauseTimer();
    alert("You were in middle of attempting the challenge, It is cosidered as Cheated if open other pages. 0 XPs assigned for this challenge marked as cheated.");
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
  }


  ngOnInit(): void {
    this.setAllErrorsToFalse();
    if (confirm("Are you ready to attempt the challenges?")) {
      alert("We will begin when you click OK.");
      setTimeout(() => { this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime }, 1000);
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
      this.CURRENT_XPs = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs;
      this.COPY_CURRENT_XPs = this.CURRENT_XPs;
      this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(this.CURRENT_XPs);
      this.NEXT_BADGE = this.gamificationService.getNextBadge(this.CURRENT_XPs);
      this.XPs_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(this.CURRENT_XPs);
      this.CURRENT_LEVEL = this.gamificationService.getCurrentLevel(this.CURRENT_XPs);
      this.extractUnAttemptedLabChallenges();
      console.log("this.STUDz_FETCHED_STATS_FROM_Db : ", this.STUDz_FETCHED_STATS_FROM_Db);
      console.log("this.attemptedChallenges : ", this.attemptedChallenges);
      console.log("this.unAttemptedChallenges : ", this.unAttemptedChallenges);
      console.log("this.AllLabChallengesOfThisLabFromDB == > ", this.AllLabChallengesOfThisLabFromDB);
      console.log("this.AllStudentAttemptedChallengesOfthisStudandThisLab == > ", this.AllStudentAttemptedChallengesOfthisStudandThisLab);
    }, 800);
  } //ngOnInt closes here

  AllLabChallengesOfThisLabFromDB: LabChallengesmodel[] = [];
  AllStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
  attemptedChallenges: LabChallengesmodel[] = [];
  unAttemptedChallenges: LabChallengesmodel[] = [];
  LENGTH_unAttemptedChallenges: number = 0;
  STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[] = [];


  LabID: string;
  localStorageUsername = localStorage.getItem("UsersUsername");
  CURRENT_BADGE: string = '';
  NEXT_BADGE: string = '';
  XPs_FOR_PROMOTION: number = 0;
  CURRENT_LEVEL: number = 0;
  CURRENT_XPs: number = 0;
  COPY_CURRENT_XPs: number = 0;
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
    if (this.i<this.unAttemptedChallenges?.length) { this.SHOW_CHALLENGE_RELATED_DIVS = true; }
    else { this.SHOW_CHALLENGE_RELATED_DIVS = false; }
    this.LENGTH_unAttemptedChallenges = this.unAttemptedChallenges.length;
    console.log("unAttemptedChallenges ========#####", this.unAttemptedChallenges);

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
      message: 'Your answer to this challenge is submitted to the teacher to be evaluated.',
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
  // challenges = [
  //   {
  //     Qid: 'mcq1',
  //     Qnumber: 1,
  //     time: 20,
  //     Question: 'Data type of variable used to store messages is:',
  //     Qtype: 'mcq',
  //     options: { a: 'String', b: 'int', c: 'float', d: 'Char' },
  //     answered: '',
  //   },
  //   {
  //     Qid: 'mcq2',
  //     Qnumber: 2,
  //     time: 30,
  //     Question: 'Output of System.out.println("Sun"+"Shine");',
  //     Qtype: 'mcq',
  //     options: { a: 'Sun Shine', b: 'SunShine', c: 'Sun+Shine', d: 'no one' },
  //     answered: '',
  //   },
  //   {
  //     Qid: 'mcq3',
  //     Qnumber: 3,
  //     time: 60,
  //     Question: 'int z= 20%2; value of z is?',
  //     Qtype: 'mcq',
  //     options: { a: '0', b: '10', c: '400', d: 'no one' },
  //     answered: '',
  //   },
  //   {
  //     Qid: 'scc1',
  //     Qnumber: 4,
  //     time: 60,
  //     Question:
  //       'int x=20, y=50;\nint z = x + y;\nSystem.out.println/***Complete Code Here***/;',
  //     Qtype: 'scc',
  //     answered: '',
  //   },
  // ];

  // <---timer code
  timeLeft: number = 1;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {


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
    (event.target.value == "")? this.Errors.emptyField.status=true : this.Errors.emptyField.status=false
    console.log(event.target.value);
    this.SELECTED_RADIO_VALUE = event.target.value;
  }


  onSubmitChallenge(ChallengesForm: NgForm) {
    this.pauseTimer();
    this.Errors.emptyField.status=true;
    let attemptedLabChallenge: StudentAttemptedLabChallengemodel = {
      AttemptedLabChallenge_id: this.unAttemptedChallenges[this.i]._id, ChallengeAttempted: true, ChallengeCheated: false, ChallengeChecked: false, ChallengeFailedDueToTimeShortage: false, GainedXPs: 0, LabChallengeAnswerOptionA: '', LabChallengeAnswerOptionB: '', LabChallengeAnswerOptionC: '', LabChallengeAnswerOptionD: '', LabChallengeQuestion: this.unAttemptedChallenges[this.i].ChallengeQuestion, LabChallengeQuestionType: this.unAttemptedChallenges[this.i].ChallengeQuestionType, LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername, _id: ''
    }







    // setTimeout(() => {
    // this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
    if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'MCQ') {
      // this.Errors.emptyField.status=false;

      if (this.SELECTED_RADIO_VALUE == this.unAttemptedChallenges[this.i].ChallengeCorrectOption) {
        // alert("YOU CHOSE CORRECT OPTION");
        //update XPs and update to the database
        this.Errors.ChallengePassed.status = true;
        this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], this.unAttemptedChallenges[this.i].ChallengeXPs);
        // let status = this.gamificationService.detectIfLevelChanged(this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs ,this.unAttemptedChallenges[this.i].ChallengeXPs);
        // if(status == "promoted"){
        //   updatedStatsOfThisStudent.currentXPs += this.unAttemptedChallenges[this.i].ChallengeXPs;
        //   this.gamificationService.justPROMOTE_thisStudent(updatedStatsOfThisStudent);
        // }

        attemptedLabChallenge.GainedXPs = this.unAttemptedChallenges[this.i].ChallengeXPs;
      } else {
        // alert("YOU CHOSE inCORRECT OPTION");
        this.Errors.ChallengeFailed.status = true;
        // attemptedLabChallenge.GainedXPs = 0;
        this.gamificationService.promote_demote_or_justupdate_Stats(this.STUDz_FETCHED_STATS_FROM_Db[0], 0);
      }



      // this.Errors.emptyField.status = false;


      //   let updatedStatsOfThisStudent:StudLabDataAndStatsmodel = {
      //     LabJoinCode:this.STUDz_FETCHED_STATS_FROM_Db[0].LabJoinCode,
      //     _id:this.STUDz_FETCHED_STATS_FROM_Db[0]._id,
      //     StudentzUsername: this.STUDz_FETCHED_STATS_FROM_Db[0].StudentzUsername,
      //     Appreciated: this.STUDz_FETCHED_STATS_FROM_Db[0].Appreciated,
      //     Demoted:this.STUDz_FETCHED_STATS_FROM_Db[0].Demoted,
      //     LevelUpdateViewed:this.STUDz_FETCHED_STATS_FROM_Db[0].LevelUpdateViewed,
      //     Promoted: this.STUDz_FETCHED_STATS_FROM_Db[0].Promoted,
      //     RivalStudents: this.STUDz_FETCHED_STATS_FROM_Db[0].RivalStudents,
      //     StudentzLabAccessStatus: this.STUDz_FETCHED_STATS_FROM_Db[0].StudentzLabAccessStatus,
      //     Warned: this.STUDz_FETCHED_STATS_FROM_Db[0].Warned,
      //     currentBadge: this.STUDz_FETCHED_STATS_FROM_Db[0].currentBadge,
      //     currentCPPs: this.STUDz_FETCHED_STATS_FROM_Db[0].currentCPPs,
      //     currentLevel: this.STUDz_FETCHED_STATS_FROM_Db[0].currentLevel,
      //     currentXPs: this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs
      // }
      // this.studentLabDataService.updateCurrentStatsOfThisStudent();

    }


    if (this.unAttemptedChallenges[this.i].ChallengeQuestionType != 'MCQ') {
      //check if answer is valid at least 1 character long, i
      if (ChallengesForm.value.theAnswer.length < 1) {
        alert("You must fill the answer text area!");
        return;
      } else {
        this.Errors.ChallengeSubmitted.status = true;
        attemptedLabChallenge.LabChallengeAnswerOptionA = ChallengesForm.value.theAnswer;
        // attemptedLabChallenge.GainedXPs = 0;
        // attemptedLabChallenge.ChallengeAttempted = true;

      }
    }

    //now update
    // attemptedLabChallenge.ChallengeAttempted = true;
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



    // }, 100);


    console.log("attemptedLabChallenge: ", attemptedLabChallenge);






    ///////////////// below code of onSubmitLabchallenge is for next challenge... do not change

    let opt;
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };
    this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);
    setTimeout(()=>{this.CURRENT_XPs = this.STUDz_FETCHED_STATS_FROM_Db[0].currentXPs},500);
    setTimeout(() => {
      if (opt = confirm("Ready for next challenge.")) {
        ChallengesForm.reset();
        if (opt == true) {
          this.setAllErrorsToFalse();

          this.i++;
          // window.alert(this.challenges.length + 1);
          this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
          this.startTimer();
          // console.log(this.i);
          // console.log(this.challenges.length);
          if (this.i == this.LENGTH_unAttemptedChallenges - 1)  {
            // this.i = 0;
            alert("You have completed all challenges for now, come back soon for more challenges");
            window.location.href = "/STUDENT/Lab";

          }

        }


      } else {
        window.location.href = "/STUDENT/Lab";
      }
    }, 2000);

  }





  // getTitle() {
  //   setTimeout(() => {
  //     this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
  //     if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'MCQ') {
  //       this.Errors.emptyField.status = false;
  //       return 'MCQs Challenge';
  //     } else {
  //       this.Errors.emptyField.status = true;
  //     }

  //     if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'Desired Output') return 'Desired Output Challenge';
  //     if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'Code Completion') return 'Code Completion Challenge';

  //   }, 100);
  // }






}
