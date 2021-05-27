import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudLabDataAndStatsmodel } from '../MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentAttemptedLabTaskmodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';

@Injectable({
  providedIn: 'root'
})
export class StudentLabDataService {
  constructor(private http: HttpClient) { }







  //////////////////////////////////////////
  //////////////////////////////////////////////////////StudentAttemptedLabTaskmodel methods below
  //////////////////////////////////////////
  createThisStudentAttemptedLabTask(labTask: StudentAttemptedLabTaskmodel) {
    this.http.post('http://localhost:3000/api/StudentLabData/createThisStudentAttemptedLabTask', labTask)
    .subscribe((responseData) => {
      console.log(responseData);
    });


  }




  RecieveAllStudentAttemptedLabTasks():StudentAttemptedLabTaskmodel[]{
    var alltasks: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .get<{ message: string; AllStudentAttemptedLabTasks: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/StudentLabData/RecieveAllStudentAttemptedLabTasks'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasks).length; i++) {
          alltasks.push(responseData.AllStudentAttemptedLabTasks[i]);
        }
      });
    // console.log('this.AllUsersRecieved FROM SERVICE===>', alltasks);
    return alltasks;

  }








  //////////////////////////////////////////
  //////////////////////////////////////////////////////StudLabDataAndStats methods below
  //////////////////////////////////////////

  deleteCurrentStatsOfThisStudent(StudentzUsername: string) {
    this.http.delete("http://localhost:3000/api/StudentLabData/deleteCurrentStatsOfThisStudent/" + StudentzUsername).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  updateCurrentStatsOfThisStudent(updatedStats: StudLabDataAndStatsmodel, StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string }) {

    this.http.put("http://localhost:3000/api/StudentLabData/updateCurrentStatsOfThisStudent/" + StudentzUsernameAndLabID, updatedStats)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }
  getCurrentStatsOfThisStudent(StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string }): StudLabDataAndStatsmodel[] {
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

  deleteThisStudentAttemptedLabChallenge(Id_AttemptedChallenge: string) {
    this.http.delete("http://localhost:3000/api/StudentLabData/deleteThisStudentAttemptedLabChallenge/" + Id_AttemptedChallenge).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  updateThisStudentAttemptedLabChallenge(updatedAtteptedChallenge: StudentAttemptedLabChallengemodel, StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string }) {

    this.http.put("http://localhost:3000/api/StudentLabData/updateThisStudentAttemptedLabChallenge/" + StudentzUsernameAndLabID, updatedAtteptedChallenge)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }



  createThisStudentAttemptedLabChallenge(aStudentAttemptedLabChallenge: StudentAttemptedLabChallengemodel) {

    this.http.post('http://localhost:3000/api/StudentLabData/createThisStudentAttemptedLabChallenge', aStudentAttemptedLabChallenge)
      .subscribe((responseData) => {
        console.log(responseData);
      });


  }
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
