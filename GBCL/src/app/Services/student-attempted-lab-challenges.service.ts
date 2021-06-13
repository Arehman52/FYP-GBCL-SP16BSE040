import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAttemptedLabChallengemodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabChallengesmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from '../MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAttemptedLabChallengesService {

  constructor(private http: HttpClient) { }






  deleteALLStudentAttemptedLabChallengesOfThisStudent(StudentzUsernameAndLabID:StudentzUsernameAndLabJoinCodemodel) {
    this.http.delete("http://localhost:3000/api/StudentAttemptedLabChallenges/deleteALLStudentAttemptedLabChallengesOfThisStudent/"+StudentzUsernameAndLabID ).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  deleteThisStudentAttemptedLabChallenge(Id_AttemptedChallenge: string) {
    this.http.delete("http://localhost:3000/api/StudentAttemptedLabChallenges/deleteThisStudentAttemptedLabChallenge/" + Id_AttemptedChallenge).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  updateThisStudentAttemptedLabChallenge(updatedAtteptedChallenge: StudentAttemptedLabChallengemodel, StudentzUsernameAndLabID: { StudentzUsername: string, LabJoinCode: string }) {

    this.http.put("http://localhost:3000/api/StudentAttemptedLabChallenges/updateThisStudentAttemptedLabChallenge/" + StudentzUsernameAndLabID, updatedAtteptedChallenge)
      .subscribe(
        response => {
          console.log(response);
        }
      );

  }



  createThisStudentAttemptedLabChallenge(aStudentAttemptedLabChallenge: StudentAttemptedLabChallengemodel) {

    this.http.post('http://localhost:3000/api/StudentAttemptedLabChallenges/createThisStudentAttemptedLabChallenge', aStudentAttemptedLabChallenge)
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
        'http://localhost:3000/api/StudentAttemptedLabChallenges/RecieveAllStudentAttemptedChallengesOfthisStudandThisLab/',
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
        'http://localhost:3000/api/StudentAttemptedLabChallenges/RecieveAllStudentAttemptedMCQLabChallengesOfthisStudandThisLab/',
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
