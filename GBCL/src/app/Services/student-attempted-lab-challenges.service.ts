import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class StudentAttemptedLabChallengesService {

  constructor(private http: HttpClient) { }






  deleteALLStudentAttemptedLabChallengesOfThisStudent(StudentzUsernameAndLabID:StudentzUsernameAndLabJoinCodemodel) {
    this.http.delete(BASE_URL+"/api/StudentAttemptedLabChallenges/deleteALLStudentAttemptedLabChallengesOfThisStudent/"+StudentzUsernameAndLabID ).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  deleteThisStudentAttemptedLabChallenge(Id_AttemptedChallenge: string) {
    this.http.delete(BASE_URL+"/api/StudentAttemptedLabChallenges/deleteThisStudentAttemptedLabChallenge/" + Id_AttemptedChallenge).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  updateThisStudentAttemptedLabChallenge(updatedAtteptedChallenge: StudentAttemptedLabChallengemodel, StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string }) {

    this.http.put(BASE_URL+"/api/StudentAttemptedLabChallenges/updateThisStudentAttemptedLabChallenge/" + StudentzUsernameAndLabID, updatedAtteptedChallenge)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }



  createThisStudentAttemptedLabChallenge(aStudentAttemptedLabChallenge: StudentAttemptedLabChallengemodel) {

    this.http.post(BASE_URL+'/api/StudentAttemptedLabChallenges/createThisStudentAttemptedLabChallenge', aStudentAttemptedLabChallenge)
      .subscribe((responseData) => {
        console.log(responseData);
      });


  }

  RecieveAllStudentAttemptedChallengesOfthisStudandThisLab(LabJoinCode: string, StudentzUsername: string): StudentAttemptedLabChallengemodel[] {
    let objStudentzUsernameAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel = {
      LabJoinCode:LabJoinCode,
      StudentzUsername:StudentzUsername
    };

    var allStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
    this.http
      .post<{ message: string, AllStudentAttemptedChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] }>(
        BASE_URL+'/api/StudentAttemptedLabChallenges/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedChallengesOfthisStudandThisLab).length; i++) {
          allStudentAttemptedChallengesOfthisStudandThisLab.push(responseData.AllStudentAttemptedChallengesOfthisStudandThisLab[i]);
        }
      });
    return allStudentAttemptedChallengesOfthisStudandThisLab;
  }


  RecieveAllStudentAttemptedMCQLabChallengesOfthisStudandThisLab(LabID: string, Username: string): StudentAttemptedLabChallengemodel[] {
    let objStudentzUsernameAndLabJoinCode: StudentzUsernameAndLabJoinCodemodel =
    {
      LabJoinCode: LabID,
      StudentzUsername: Username
    };

    var allStudentAttemptedMCQLabChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedMCQLabChallengesOfthisStudandThisLab: StudentAttemptedLabChallengemodel[] }>(
        BASE_URL+'/api/StudentAttemptedLabChallenges/RecieveAllStudentAttemptedMCQLabChallengesOfthisStudandThisLab/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedMCQLabChallengesOfthisStudandThisLab).length; i++) {
          allStudentAttemptedMCQLabChallengesOfthisStudandThisLab.push(responseData.AllStudentAttemptedMCQLabChallengesOfthisStudandThisLab[i]);
        }
      });
    return allStudentAttemptedMCQLabChallengesOfthisStudandThisLab;


  }



}
