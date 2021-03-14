import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  leaderboard = [
    {rank:'1',name:'Abdur Rehman',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 5',color: 'fca311'},
    {rank:'2',name:'Abdul Lateef',XPs:'927',CPPs:'245',level:'22',badge:'Honoury 4',color: '2ec4b6'},
    {rank:'3',name:'Habib ur Rehman',XPs:'892',CPPs:'165',level:'21',badge:'Honoury 4',color: 'eae2b7'},
    {rank:'4',name:'Assad ur Rehman',XPs:'859',CPPs:'965',level:'20',badge:'Honoury 3',color:'dda15e'},
    {rank:'5',name:'Khalil ur Rehman',XPs:'804',CPPs:'65',level:'18',badge:'Honoury 2',color:'8ecae6'},
    {rank:'6',name:'Abdur Raheem',XPs:'784',CPPs:'35',level:'17',badge:'Honoury 1',color:'81b29a'},
    {rank:'7',name:'Abdur Raffay',XPs:'728',CPPs:'285',level:'16', badge:'Master 5',color: '9d4edd'},
  ];

}
