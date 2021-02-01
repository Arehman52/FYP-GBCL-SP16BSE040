import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-leaderboard',
  templateUrl: './view-leaderboard.component.html',
  styleUrls: ['./view-leaderboard.component.css']
})
export class ViewLeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  leaderboard = [
    {rank:'1',name:'Abdur Rehman',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 5',color: 'fca311'},
    {rank:'2',name:'Abdul Lateef',XPs:'927',CPPs:'245',level:'22',badge:'Honoury 4',color: '2ec4b6'},
    {rank:'3',name:'Habib ur Rehman',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 4',color: 'eae2b7'},
    {rank:'4',name:'Assad ur Rehman',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 3',color:'dda15e'},
    {rank:'5',name:'Khalil ur Rehman',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 2',color:'8ecae6'},
    {rank:'6',name:'Abdur Raheem',XPs:'987',CPPs:'265',level:'24',badge:'Honoury 1',color:'81b29a'},
    {rank:'7',name:'Abdur Raffay',XPs:'987',CPPs:'265',level:'24', badge:'Master 5',color: '9d4edd'},
  ];
}
