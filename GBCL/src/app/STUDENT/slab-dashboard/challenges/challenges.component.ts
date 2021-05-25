import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css'],
})
export class ChallengesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.startTimer();
  }
  localStorageUsername = localStorage.getItem("UsersUsername");


  onExitLabClicked(){
    localStorage.removeItem('LabID');
    window.location.href="/STUDENT"
  }

  onLogout(){
    localStorage.clear();
    window.location.href="/";
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
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  // timer code ---->
  nextQuestion() {
    this.i++;
    // window.alert(this.challenges.length + 1);
    console.log(this.i);
    console.log(this.challenges.length);
    if (this.i == this.challenges.length) {
      this.i = 0;
    }
  }
  getTitle() {
    if (this.challenges[this.i].Qtype == 'scc') return 'Syntax Completion Challenge';
    if (this.challenges[this.i].Qtype == 'mcq') return 'MCQs Challenge';
    if (this.challenges[this.i].Qtype == 'doc') return 'Desired Output Challenge';
  }






}
