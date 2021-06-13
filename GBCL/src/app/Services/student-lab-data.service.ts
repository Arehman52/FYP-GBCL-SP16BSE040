import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudLabDataAndStatsmodel } from '../MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentAttemptedLabTaskmodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';


@Injectable({
  providedIn: 'root'
})
export class StudentLabDataService {
  RESET_CurrentStatsOfThisLabzALLStudents(StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel) {

    // console.log("printing updatedStats from service :@@@@  ", updatedStats);
    this.http.put("http://localhost:3000/api/StudentLabData/RESET_CurrentStatsOfThisLabzALLStudents/" ,StudentzUsernameAndLabID)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }


  RESET_DeleteEntireStudentActivityHistory() {
    // console.log("printing updatedStats from service :@@@@  ", updatedStats);
    this.http.get("http://localhost:3000/api/StudentLabData/DeleteEntireStudentActivityHistory/")
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }
















  constructor(private http: HttpClient) { }

  Fetch7HighAchieversOfThisLab(objStudentzUsernameAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel): StudLabDataAndStatsmodel[] {
    let fetched7HighAchievers: StudLabDataAndStatsmodel[] = [];
    this.http
      .post<{ message: string; Fetched7HighAchievers: StudLabDataAndStatsmodel[] }>(
        'http://localhost:3000/api/StudentLabData/Fetch7HighAchieversOfThisLab', objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        // console.log(responseData.Fetched7HighAchievers);@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        for (let i = 0; i < Object.keys(responseData.Fetched7HighAchievers).length; i++) {
          fetched7HighAchievers.push(responseData.Fetched7HighAchievers[i]);
        }
      });

    return fetched7HighAchievers;
  }




  deleteCurrentStatsOfThisStudent(StudentzUsername: string) {
    this.http.delete("http://localhost:3000/api/StudentLabData/deleteCurrentStatsOfThisStudent/" + StudentzUsername).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  updateCurrentStatsOfThisStudent(updatedStats: StudLabDataAndStatsmodel, StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel) {

    console.log("printing updatedStats from service :@@@@  ", updatedStats);
    this.http.put("http://localhost:3000/api/StudentLabData/updateCurrentStatsOfThisStudent/" + StudentzUsernameAndLabID, updatedStats)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }
  getCurrentStatsOfThisStudent(StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel): StudLabDataAndStatsmodel[] {
    let CurrentStats: StudLabDataAndStatsmodel[] = [];

    this.http
      .post<{ message: string; currentStatsOfThisStudent: StudLabDataAndStatsmodel }>(
        'http://localhost:3000/api/StudentLabData/getCurrentStatsOfThisStudent', StudentzUsernameAndLabID
      )
      .subscribe((responseData) => {
        CurrentStats.push(responseData.currentStatsOfThisStudent);
      });


    return CurrentStats;
  }

  createFreshStudentLabDataRecord(studLabDataAndStatsFreshRecord: StudLabDataAndStatsmodel) {

    this.http.post('http://localhost:3000/api/StudentLabData/createFreshStudentLabDataRecord', studLabDataAndStatsFreshRecord)
      .subscribe((responseData) => {
        console.log(responseData);
      });


  }














  //////////////////////////////////////////
  //////////////////////////////////////////////////////StudentAttemptedLabChallenges methods below
  //////////////////////////////////////////

  // get_All_StudentAttemptedLabChallenge(StudentzUsernameAndLabID: {StudentzUsername:string,LabJoinCode:string }): StudLabDataAndStatsmodel[] {
  //   let CurrentStats: StudLabDataAndStatsmodel[] = [];

  //   this.http
  //     .post<{ message: string; currentStatsOfThisStudent: StudLabDataAndStatsmodel }>(
  //       'http://localhost:3000/api/StudentLabData/getCurrentStatsOfThisStudent', StudentzUsernameAndLabID
  //     )
  //     .subscribe((responseData) => {
  //       CurrentStats.push(responseData.currentStatsOfThisStudent);
  //     });


  //   return CurrentStats;
  // }
  // get_This_StudentAttemptedLabChallenge(StudentzUsernameAndLabID: {StudentzUsername:string,LabJoinCode:string }): StudLabDataAndStatsmodel[] {
  //   let CurrentStats: StudLabDataAndStatsmodel[] = [];

  //   this.http
  //     .post<{ message: string; currentStatsOfThisStudent: StudLabDataAndStatsmodel }>(
  //       'http://localhost:3000/api/StudentLabData/getCurrentStatsOfThisStudent', StudentzUsernameAndLabID
  //     )
  //     .subscribe((responseData) => {
  //       CurrentStats.push(responseData.currentStatsOfThisStudent);
  //     });


  //   return CurrentStats;
  // }


}
