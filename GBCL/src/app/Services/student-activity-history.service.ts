import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentActivityHistorymodel } from '../MODELS/Student-Frontend-Models/StudentActivityHistorymodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StudentActivityHistoryService {

  constructor(private http: HttpClient) { }





  fetchThisRivalzActivitiesHistory(objStudentzUsernameAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel): StudentActivityHistorymodel[] {

    var fetchedThisRivalzActivitiesHistory: StudentActivityHistorymodel[] = [];
    this.http
      .post<{ message: string, FetchedThisRivalzActivitiesHistory: StudentActivityHistorymodel[] }>(
        BASE_URL+'/api/StudentActivityHistory/fetchThisRivalzActivitiesHistory/',
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

    this.http.post(BASE_URL+'/api/StudentActivityHistory/createAStudentActivityHistoryDocument', objStudentActivityHistorymodel)
      .subscribe((responseData) => {
        console.log(responseData);
      });


  }





}
