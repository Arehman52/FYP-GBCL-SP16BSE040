import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabChallengesmodel } from '../MODELS/Lab-Frontend-Models/labchallengesmodel.model';

@Injectable({
  providedIn: 'root'
})
export class LabChallengesService {

  constructor(private http:HttpClient) { }


  createLabChallenge(labChallenge: LabChallengesmodel) {
    this.http
      .post('http://localhost:3000/api/LabChallenges/CreateLabChallenge', labChallenge)
      .subscribe((responseData) => {
        console.log(responseData);
      });

  }


  DeleteThisLabChallenge(ChallengeId: string) {
    this.http.delete("http://localhost:3000/api/LabChallenges/DeleteThisLabChallenge/" + ChallengeId).subscribe(
      response => {
        console.log(response);
      }
    );
  }
  getAllChallengesOfThisLabFromDB(objLabID: { LabJoinCode: string }): LabChallengesmodel[] {
    console.log('objLabID.LabId', objLabID.LabJoinCode);
    let allChallengesOfThisLabFromDB: LabChallengesmodel[] = [];
    this.http
      .post<{ message: string; AllChallengesOfThisLabFromDB: LabChallengesmodel[] }>(
        'http://localhost:3000/api/LabChallenges/getAllChallengesOfThisLabFromDB', objLabID
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllChallengesOfThisLabFromDB).length; i++) {
          allChallengesOfThisLabFromDB.push(responseData.AllChallengesOfThisLabFromDB[i]);
        }
      });


    return allChallengesOfThisLabFromDB;

  }





  GetAllLabChallengesFromDB(): LabChallengesmodel[] {

    let AllLabChallenges: LabChallengesmodel[] = [];
    this.http
      .get<{ message: string; labChallenges: LabChallengesmodel[] }>(
        'http://localhost:3000/api/LabChallenges/GetAllLabChallengesFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labChallenges).length; i++) {
          AllLabChallenges.push(responseData.labChallenges[i]);
        }
      });


    return AllLabChallenges;

  }




  updateThisLabChallenge(UpdatedLabChallenge: LabChallengesmodel) {
    this.http.put("http://localhost:3000/api/LabChallenges/UpdateThisLabChallenge/" + UpdatedLabChallenge._id, UpdatedLabChallenge).subscribe(
      response => {
        console.log(response);
      });
  }




}
