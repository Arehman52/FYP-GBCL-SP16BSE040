import { Component, OnInit } from '@angular/core';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-view-leaderboard',
  templateUrl: './view-leaderboard.component.html',
  styleUrls: ['./view-leaderboard.component.css']
})
export class ViewLeaderboardComponent implements OnInit {

  constructor(private studentLabDataService:StudentLabDataService) { }

  ngOnInit(): void {
    let objStudentzUsernameAndLabJoinCode:StudentzUsernameAndLabJoinCodemodel =
    {LabJoinCode:this.LabID, StudentzUsername:''};
    this.Fetched7HighAchievers = this.studentLabDataService.Fetch7HighAchieversOfThisLab(objStudentzUsernameAndLabJoinCode);
    setTimeout(()=>{
      this.assignFetched7toLeaderboard();
        },1000);
  }


  assignFetched7toLeaderboard() {
    for(let i = 0; i<this.Fetched7HighAchievers.length; i++){
      let obj:{rank:number,name:string,XPs:number,level:number,badge:string,color:string} =
      {XPs:this.Fetched7HighAchievers[i].currentXPs, badge: this.Fetched7HighAchievers[i].currentBadge,
      color:'',level:this.Fetched7HighAchievers[i].currentLevel, name:this.Fetched7HighAchievers[i].StudentzFN+' '+this.Fetched7HighAchievers[i].StudentzLN, rank: i+1};

      i == 0? obj.color = 'fca311': console.log('xyz')
      i == 1? obj.color = '2ec4b6': console.log('xyz')
      i == 2? obj.color = 'eae2b7': console.log('xyz')
      i == 3? obj.color = 'dda15e': console.log('xyz')
      i == 4? obj.color = '8ecae6': console.log('xyz')
      i == 5? obj.color = '81b29a': console.log('xyz')
      i == 6? obj.color = '9d4edd': console.log('xyz')

      this.leaderboard.push(obj);

    }

  }

  Fetched7HighAchievers: StudLabDataAndStatsmodel[] = [];
  LabID = localStorage.getItem("LabID");
  leaderboard:{rank:number,name:string,XPs:number,level:number,badge:string,color:string}[] = [
    // {rank:1,name:'Abdur Rehman',XPs:987,level:24,badge:'Honoury 5',color: 'fca311'},
    // {rank:2,name:'Abdul Lateef',XPs:927,level:22,badge:'Honoury 4',color: '2ec4b6'},
    // {rank:3,name:'Habib ur Rehman',XPs:5548,level:21,badge:'Honoury 4',color: 'eae2b7'},
    // {rank:4,name:'Assad ur Rehman',XPs:444,level:45,badge:'Honoury 3',color:'dda15e'},
    // {rank:5,name:'Khalil ur Rehman',XPs:5454,level:999,badge:'Honoury 2',color:'8ecae6'},
    // {rank:6,name:'Abdur Raheem',XPs:15,level:10546,badge:'Honoury 1',color:'81b29a'},
    // {rank:7,name:'Abdur Raffay',XPs:5555,level:5555, badge:'Master 5',color: '9d4edd'},
  ];


  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }

  onExitLabClicked(){
    localStorage.removeItem('LabID');
    window.location.href="/STUDENT"
  }
}
