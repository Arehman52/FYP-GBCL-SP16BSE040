import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labsmodel } from '../MODELS/Lab-Frontend-Models/labsmodel.model';
import { LabMembersmodel } from '../MODELS/Lab-Frontend-Models/labMembermodel.model';
import { LabTasksmodel } from '../MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { LabChallengesmodel } from '../MODELS/Lab-Frontend-Models/labchallengesmodel.model';


@Injectable({
  providedIn: 'root'
})
export class LabsService {
  constructor(private http: HttpClient) { }




  createLabChallenge(labChallenge: LabChallengesmodel) {
    this.http
      .post('http://localhost:3000/api/Labs/CreateLabChallenge', labChallenge)
      .subscribe((responseData) => {
        console.log(responseData);
      });

  }


  createLabTask(labtask: LabTasksmodel) {

    this.http
      .post('http://localhost:3000/api/Labs/CreateLabTask', labtask)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  DeleteThisLabChallenge(ChallengeId: string) {
    this.http.delete("http://localhost:3000/api/Labs/DeleteThisLabChallenge/" + ChallengeId).subscribe(
      response => {
        console.log(response);
      }
    );
}
  DeletThisLabTask(labTaskId: string) {
    this.http.delete("http://localhost:3000/api/Labs/DeleteThisLabTask/" + labTaskId).subscribe(
      response => {
        console.log(response);
      }
    );

  }


  GetAllLabTasksFromDB(): LabTasksmodel[] {

    let AllLabTasks: LabTasksmodel[] = [];
    this.http
      .get<{ message: string; labTasks: LabTasksmodel[] }>(
        'http://localhost:3000/api/Labs/GetAllLabTasksFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labTasks).length; i++) {
          AllLabTasks.push(responseData.labTasks[i]);
        }
      });


    return AllLabTasks;

  }

  GetAllLabChallengesFromDB(): LabChallengesmodel[] {

    let AllLabChallenges: LabChallengesmodel[] = [];
    this.http
      .get<{ message: string; labChallenges: LabChallengesmodel[] }>(
        'http://localhost:3000/api/Labs/GetAllLabChallengesFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labChallenges).length; i++) {
          AllLabChallenges.push(responseData.labChallenges[i]);
        }
      });


    return AllLabChallenges;

  }




  FetchCompleteLabMembersCollection(): LabMembersmodel[] {
    let completeLabMembersCollection: LabMembersmodel[] = [];
    this.http
      .get<{ message: string; CompleteLabMembers: LabMembersmodel[] }>(
        'http://localhost:3000/api/Labs/FetchCompleteLabMembers'
      )
      .subscribe((responseData) => {
        completeLabMembersCollection = responseData.CompleteLabMembers;
      });
    return completeLabMembersCollection;
  }



  FetchThisLab(LabID: string): Labsmodel[] {
    var objLabId: { _id: string } = { _id: LabID };
    var Lab: Labsmodel[] = [];
    this.http
      .post<{ message: string; lab: Labsmodel }>(
        'http://localhost:3000/api/Labs/FetchTHISLab', objLabId
      )
      .subscribe((responseData) => {
        Lab.push(responseData.lab);
      });
    return Lab;
  }





  DeleteThisLab(Id: string) {
    this.http.delete("http://localhost:3000/api/Labs/DeleteThisLab/" + Id).subscribe(
      response => {
        console.log(response);
      }
    );
  }



  //  setThisUserAsInstructorOfThisLab(Lab: Labsmodel) {
  //    this.http.put("http://localhost:3000/api/Users/setThisUserAsInstructorOfThisLab/" + Lab.LabInstructor, Lab).subscribe(
  //      response => {
  //        console.log(response);
  //      }
  //    );

  //  }

  updateThisLab(UpdatedLab: Labsmodel) {
    this.http.put("http://localhost:3000/api/Labs/UpdateThisLab/" + UpdatedLab._id, UpdatedLab).subscribe(
      response => {
        console.log(response);
      }
    );
  }





  createLab(Lab: Labsmodel): Labsmodel[] {
    let array: any[] = [];
    let CreatedLab: Labsmodel[] = [];
    // array = [];
    // this.CreatedLab = [];
    this.http
      .post('http://localhost:3000/api/Labs/CreateLab', Lab)
      .subscribe((responseData) => {
        // setTimeout(()=>{
        // for (let i = 0; i < Object.keys(responseData.CreatedLab).length; i++) {
        //   this.CreatedLab.push(responseData.CreatedLab[i]);
        // }
        // console.log("api/Labs/CreateLab [[[responseData]]] => ", responseData);
        // console.log("Object.keys(responseData) => ", Object.keys(responseData));
        // console.log("Object.values(responseData) => ", Object.values(responseData));
        array = Object.values(responseData);
        CreatedLab.push(array[1]);  //at 0: message, at 1:the crated Lab as a result.
        // console.log("<====================> ");
        // console.log("this.CreatedLab.push(this.array[1]) => => this.CreatedLab", this.CreatedLab);
        // console.log("<====================> ");


        // },3500);
      });
    return CreatedLab;
  }
  // getCreatedLab(): Labsmodel[] {
  //   return this.CreatedLab;
  // }





  RecieveAllLabsFromDB() {
    var tempLabs: Labsmodel[] = [];
    this.http
      .get<{ message: string; labs: Labsmodel[] }>(
        'http://localhost:3000/api/Labs/RecieveLabsFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labs).length; i++) {
          tempLabs.push(responseData.labs[i]);
        }
      });
    // console.log('this.AllUsersRecieved FROM SERVICE===>',tempUsers);
    return tempLabs;
  }



}
