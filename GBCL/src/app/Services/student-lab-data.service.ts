import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudLabDataAndStatsmodel } from '../MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentAttemptedLabTaskmodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudentActivityHistorymodel } from '../MODELS/Student-Frontend-Models/StudentActivityHistorymodel.model';

@Injectable({
  providedIn: 'root'
})
export class StudentLabDataService {

  constructor(private http: HttpClient) { }



  RecieveAllStudentAttemptedChallengesOfthisStudandThisLab(LabJoinCode: string, StudentzUsername: string): StudentAttemptedLabChallengemodel[] {
    let objStudentzUsernameAndLabJoinCode: StudentAttemptedLabChallengemodel = {
      AttemptedLabChallenge_id: null,
      ChallengeAttempted: null, GainedXPs: null, LabJoinCode: LabJoinCode, StudentzUsername: StudentzUsername, _id: null,
      ChallengeCheated: null, ChallengeChecked: null, ChallengeFailedDueToTimeShortage: null, LabChallengeAnswerOptionA: null, LabChallengeAnswerOptionB: null, LabChallengeAnswerOptionC: null, LabChallengeAnswerOptionD: null, LabChallengeQuestion: null, LabChallengeQuestionType: null
    };

    var allStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
    this.http
      .post<{ message: string, AllStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] }>(
        'http://localhost:3000/api/StudentLabData/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedChallengesOfthisStudandThisLab).length; i++) {
          allStudentAttemptedChallengesOfthisStudandThisLab.push(responseData.AllStudentAttemptedChallengesOfthisStudandThisLab[i]);
        }
      });
    return allStudentAttemptedChallengesOfthisStudandThisLab;
  }


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


  //////////////////////////////////////////
  //////////////////////////////////////////////////////StudentAttemptedLabTaskmodel methods below
  //////////////////////////////////////////
  createThisStudentAttemptedLabTask(labTask: StudentAttemptedLabTaskmodel): StudentAttemptedLabTaskmodel[] {
    let arrResult: StudentAttemptedLabTaskmodel[] = [];
    this.http.post<{ message: string, result: StudentAttemptedLabTaskmodel }>('http://localhost:3000/api/StudentLabData/createThisStudentAttemptedLabTask', labTask)
      .subscribe((responseData) => {
        console.log(responseData);
        arrResult.push(responseData.result);
      });
    return arrResult;

  }


  RecieveAllStudentAttemptedLabTasksOfThisLab(objLabJoinCode: { LabJoinCode: string; }): StudentAttemptedLabTaskmodel[] {
    let allStudentAttemptedLabTasksOfThisLab: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfThisLab: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/Labs/RecieveAllStudentAttemptedLabTasksOfThisLab', objLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfThisLab).length; i++) {
          allStudentAttemptedLabTasksOfThisLab.push(responseData.AllStudentAttemptedLabTasksOfThisLab[i]);
        }
      });

    return allStudentAttemptedLabTasksOfThisLab;
  }







  RecieveAllStudentAttemptedLabTasksOfThisStudent(objStudentzUsername: { StudentzUsername: string; }): StudentAttemptedLabTaskmodel[] {
    let allStudentAttemptedLabTasksOfThisStudent: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfThisStudent: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/Labs/RecieveAllStudentAttemptedLabTasksOfThisStudent', objStudentzUsername
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfThisStudent).length; i++) {
          allStudentAttemptedLabTasksOfThisStudent.push(responseData.AllStudentAttemptedLabTasksOfThisStudent[i]);
        }
      });

    return allStudentAttemptedLabTasksOfThisStudent;
  }









  RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(LabJoinCode: string, StudentzUsername: string): StudentAttemptedLabTaskmodel[] {
    let objStudentzUsernameAndLabJoinCode: StudentAttemptedLabTaskmodel = {
      AttemptedLabTask_id: '', LabTaskAnswerByTeacher: '', LabTaskTitle: '', LabTaskSolutionByTeacher: '', LabTaskMatchPercentage: 0,
      LabTaskXPs: 0, GainedXPs: 0, LabJoinCode: LabJoinCode, LabTaskAnswerCode: '', LabTaskAnswerInput: '', LabTaskAnswerOutput: '', LabTaskAttempted: false, LabTaskChecked: false, LabTaskQuestion: '', StudentzUsername: StudentzUsername, _id: ''
    };

    var allStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/StudentLabData/RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfthisStudandThisLab).length; i++) {
          allStudentAttemptedLabTasksOfthisStudandThisLab.push(responseData.AllStudentAttemptedLabTasksOfthisStudandThisLab[i]);
        }
      });
    return allStudentAttemptedLabTasksOfthisStudandThisLab;

  }







  RecieveAllStudentAttemptedLabTasks(): StudentAttemptedLabTaskmodel[] {
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



  fetchThisRivalzActivitiesHistory(objStudentzUsernameAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel): StudentActivityHistorymodel[] {

    var fetchedThisRivalzActivitiesHistory: StudentActivityHistorymodel[] = [];
    this.http
      .post<{ message: string, FetchedThisRivalzActivitiesHistory: StudentActivityHistorymodel[] }>(
        'http://localhost:3000/api/StudentLabData/fetchThisRivalzActivitiesHistory/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.FetchedThisRivalzActivitiesHistory).length; i++) {
          fetchedThisRivalzActivitiesHistory.push(responseData.FetchedThisRivalzActivitiesHistory[i]);
        }
      });
    return fetchedThisRivalzActivitiesHistory;
  }

  createAStudentActivityHistoryDocument(objStudentActivityHistorymodel: StudentActivityHistorymodel) {

    this.http.post('http://localhost:3000/api/StudentLabData/createAStudentActivityHistoryDocument', objStudentActivityHistorymodel)
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
