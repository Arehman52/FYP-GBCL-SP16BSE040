import { Injectable } from '@angular/core';

import { TestLeaderboardModel } from '../MODELS/test-leaderboard.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TestLeaderboardService {

  constructor(private http:HttpClient) { }



  tempData: TestLeaderboardModel[] = [];


  RecieveUsersFromDBForSignup() {
    console.log('Is METHOD KO COMMENT KAR DIA THA: in test-leaderboard.service.ts File.');
    // console.log("OUTSIDE HTTP 2nd");
    // this.http
    // .get<{ message: string; latestLeaderboardData: TestLeaderboardModel[] }>(
    //   'http://localhost:3000/api/fetchLatestLeaderboardData'
    // )
    // .subscribe((responseData) => {
    //   // setTimeout('2000');
    //   console.log('SUCCESSFUL TILL HERE but working');
    //   for (let i = 0; i < Object.keys(responseData.latestLeaderboardData).length; i++) {
    //     this.tempData.push(responseData.latestLeaderboardData[i]);
    //   }
    //   return;

    // });
    // return this.tempData;
  }



}
