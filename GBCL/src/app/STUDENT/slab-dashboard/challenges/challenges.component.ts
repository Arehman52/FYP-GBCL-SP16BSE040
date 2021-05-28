import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NumericTypes } from 'mongoose';
import { LabChallengesmodel } from 'src/app/MODELS/Lab-Frontend-Models/labchallengesmodel.model';
import { StudentAttemptedLabChallengemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
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
    alert("It is considered as cheating to quit the browser during the challenge attempt. Your XPs are deducted.");
  }

  ngOnInit(): void {
    if (confirm("Are you ready to attempt the challenges?")) {
      alert("We will begin when you click OK.");
    } else {
      window.history.back();
    }
    this.LabID = localStorage.getItem("LabID");


    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    // getAllChallengesOfThisLabFromDB
    this.AllLabChallengesOfThisLabFromDB = this.labsService.getAllChallengesOfThisLabFromDB(objLabJoinCode);
    this.AllStudentAttemptedChallengesOfthisStudandThisLab = this.studentLabDataService.RecieveAllStudentAttemptedChallengesOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    this.startTimer();
    this.CURRENT_BADGE = this.gamificationService.getCurrentBadge(this.CURRENT_XPs);
    this.NEXT_BADGE = this.gamificationService.getNextBadge(this.CURRENT_XPs);
    this.XPs_FOR_PROMOTION = this.gamificationService.getXPsForPromotion(this.CURRENT_XPs);
    this.CURRENT_LEVEL = this.gamificationService.getCurrentLevel(this.CURRENT_XPs);
    setTimeout(()=>{
      this.extractUnAttemptedLabTasks();
      console.log("this.AllLabChallengesOfThisLabFromDB == > ",this.AllLabChallengesOfThisLabFromDB);
      console.log("this.AllStudentAttemptedChallengesOfthisStudandThisLab == > ",this.AllStudentAttemptedChallengesOfthisStudandThisLab);
    },2000);
  } //ngOnInt closes here

  AllLabChallengesOfThisLabFromDB: LabChallengesmodel[] = [];
  AllStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
  attemptedChallenges: LabChallengesmodel[] = [];
  unAttemptedChallenges: LabChallengesmodel[] = [];
  LENGTH_unAttemptedChallenges:number = 0;


  LabID: string;
  localStorageUsername = localStorage.getItem("UsersUsername");
  CURRENT_BADGE: string = '';
  NEXT_BADGE: string = '';
  XPs_FOR_PROMOTION: number = 0;
  CURRENT_LEVEL: number = 0;
  CURRENT_XPs: number = 168;
  CHANGED_XP:number = 10;
  UNCHANGED_STATS:number = 1;
  SHOW_CHALLENGE_RELATED_DIVS:boolean = false;




  extractUnAttemptedLabTasks() {
    this.unAttemptedChallenges = [];
    this.attemptedChallenges = [];

    for (let i = 0; i < this.AllLabChallengesOfThisLabFromDB.length; i++) {
      if (this.AllLabChallengesOfThisLabFromDB[i].AttemptedByStudents.includes(this.localStorageUsername)) {
        this.attemptedChallenges.push(this.AllLabChallengesOfThisLabFromDB[i]);
      } else {
        this.unAttemptedChallenges.push(this.AllLabChallengesOfThisLabFromDB[i]);
      }
    }

    if(this.unAttemptedChallenges.length > 0 ){this.SHOW_CHALLENGE_RELATED_DIVS = true;}
    else{this.SHOW_CHALLENGE_RELATED_DIVS = false;}
    this.LENGTH_unAttemptedChallenges = this.unAttemptedChallenges.length;
    console.log("unAttemptedChallenges ========#####",this.unAttemptedChallenges);

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
  challenges = [
    {
      Qid: 'mcq1',
      Qnumber: 1,
      time: 20,
      Question: 'Data type of variable used to store messages is:',
      Qtype: 'mcq',
      options: { a: 'String', b: 'int', c: 'float', d: 'Char' },
      answered: '',
    },
    {
      Qid: 'mcq2',
      Qnumber: 2,
      time: 30,
      Question: 'Output of System.out.println("Sun"+"Shine");',
      Qtype: 'mcq',
      options: { a: 'Sun Shine', b: 'SunShine', c: 'Sun+Shine', d: 'no one' },
      answered: '',
    },
    {
      Qid: 'mcq3',
      Qnumber: 3,
      time: 60,
      Question: 'int z= 20%2; value of z is?',
      Qtype: 'mcq',
      options: { a: '0', b: '10', c: '400', d: 'no one' },
      answered: '',
    },
    {
      Qid: 'scc1',
      Qnumber: 4,
      time: 60,
      Question:
        'int x=20, y=50;\nint z = x + y;\nSystem.out.println/***Complete Code Here***/;',
      Qtype: 'scc',
      answered: '',
    },
  ];

  // <---timer code
  timeLeft: number = this.challenges[this.i].time;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1200);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  // timer code ---->




  radioChangedHandler(event:any){
    console.log(event.target.value);
  }


  onSubmitChallenge(ChallengesForm: NgForm) {




    this.i++;
    // window.alert(this.challenges.length + 1);
    this.timeLeft = this.unAttemptedChallenges[this.i].ChallengeAllowedTime;
    // console.log(this.i);
    // console.log(this.challenges.length);
    if (this.i == this.LENGTH_unAttemptedChallenges - 1) {
      this.i = 0;
    }
  }
  getTitle() {
    setTimeout(()=>{
      if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'MCQ') return 'MCQs Challenge';
      if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'Desired Output') return 'Desired Output Challenge';
      if (this.unAttemptedChallenges[this.i].ChallengeQuestionType == 'Code Completion') return 'Code Completion Challenge';

    },4500);
  }






}
