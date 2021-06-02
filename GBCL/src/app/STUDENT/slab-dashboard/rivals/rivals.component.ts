import { Component, OnInit } from '@angular/core';
import { StudentActivityHistorymodel } from 'src/app/MODELS/Student-Frontend-Models/StudentActivityHistorymodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-rivals',
  templateUrl: './rivals.component.html',
  styleUrls: ['./rivals.component.css']
})
export class RivalsComponent implements OnInit {


  constructor(private studentLabDataService: StudentLabDataService,private usersService: UsersService) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.localStorageUsername = localStorage.getItem("UsersUsername");

    this.FetchedThisStudentzStats = this.studentLabDataService.getCurrentStatsOfThisStudent(
      { StudentzUsername: this.localStorageUsername, LabJoinCode: this.LabID });

    setTimeout(() => {
      this.extractRivalActivities();
    }, 350);
  }


  FetchedRivalOneHistory: StudentActivityHistorymodel[] = [];
  FetchedRivalTwoHistory: StudentActivityHistorymodel[] = [];
  FetchedRivalThreeHistory: StudentActivityHistorymodel[] = [];
  FetchedRivalFourHistory: StudentActivityHistorymodel[] = [];
  FetchedRivalFiveHistory: StudentActivityHistorymodel[] = [];


  extractRivalActivities() {
    let objRivalNotifications:{rivalID:string, rivalName:string, Activity:string, Date:string}
    = {Activity:'', Date:'', rivalID:'', rivalName:''};
    console.log("this.FetchedThisStudentzStats[0] ----",this.FetchedThisStudentzStats[0]);
    for (let i = 0; i < this.FetchedThisStudentzStats[0].RivalStudents.length; i++) {
      setTimeout(() => {
        let FetchedOneRivalzHistory: StudentActivityHistorymodel[] = [];
        FetchedOneRivalzHistory = this.studentLabDataService.fetchThisRivalzActivitiesHistory({LabJoinCode: this.LabID,
          StudentzUsername: this.FetchedThisStudentzStats[0].RivalStudents[i]});
          // let Username:string[] = this.FetchedThisStudentzStats[0].RivalStudents;
          i==0? this.FetchedRivalOneHistory =  FetchedOneRivalzHistory : console.log('dump0');
          i==1? this.FetchedRivalTwoHistory =  FetchedOneRivalzHistory : console.log('dump1');
          i==2? this.FetchedRivalThreeHistory =  FetchedOneRivalzHistory : console.log('dump2');
          i==3? this.FetchedRivalFourHistory =  FetchedOneRivalzHistory : console.log('dump3');
          i==4? this.FetchedRivalFiveHistory =  FetchedOneRivalzHistory : console.log('dump4');
          // console.log('Username ', Username);
          // console.log("FetchedOneRivalzHistory ..$$$..",FetchedOneRivalzHistory);

          // this.FetchedRivalOneHistory[0].
          // objRivalNotifications = {rivalID:FetchedOneRivalzHistory[0]._id, rivalName: FetchedOneRivalzHistory[0].StudentzFullName,
          //   Activity: FetchedOneRivalzHistory[0].Activity, Date: FetchedOneRivalzHistory[0].TimeAndDate};
          // this.rivalNotifications.push(objRivalNotifications);


      }, 800);
    }
  }

  FetchedThisStudentzStats: StudLabDataAndStatsmodel[] = [];
  // FetchedOneRivalzHistory: StudentActivityHistorymodel[] = [];
  LabID: string = '';
  localStorageUsername: string = '';
  FetchedRivalsActivities: StudentActivityHistorymodel[] = [];



  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT";
  }


  // execFn(){
  //   let userzzz:Usersmodel[] = [];
  //   userzzz =  this.usersService.test();
  //   console.log("userzzzzz",userzzz);
  // }
  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }


  rivalNotifications = [
    { rivalID: 'id123', rivalName: 'Asmir', Activity: 'Joined Lab', Date: 'Wed, 26th May 2021 16:40' },
    { rivalID: 'id124', rivalName: 'AAmir', Activity: 'Expelled', Date: 'Wed, 26th May 2021 16:40' },
    { rivalID: 'id125', rivalName: 'AAmir', Activity: 'Appreciated', Date: 'Wed, 26th May 2021 16:40' },
    { rivalID: 'id126', rivalName: 'AAmir', Activity: 'Promoted', Date: 'Wed, 26th May 2021 16:40' }
  ];



}
