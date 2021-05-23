import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labsmodel } from '../MODELS/labsmodel.model';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  constructor(private http: HttpClient) { }





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





  CreatedLab: Labsmodel[] = [];
  array: any[] = [];
  createLab(Lab: Labsmodel) {
    this.array = [];
    this.CreatedLab = [];
    this.http
      .post('http://localhost:3000/api/Labs/CreateLab', Lab)
      .subscribe((responseData) => {
        // setTimeout(()=>{
          // for (let i = 0; i < Object.keys(responseData.CreatedLab).length; i++) {
          //   this.CreatedLab.push(responseData.CreatedLab[i]);
          // }
          console.log("api/Labs/CreateLab [[[responseData]]] => ", responseData);
          console.log("Object.keys(responseData) => ", Object.keys(responseData));
          console.log("Object.values(responseData) => ", Object.values(responseData));
          this.array = Object.values(responseData);
          this.CreatedLab.push(this.array[1]);
          console.log("<====================> ");
          console.log("this.CreatedLab.push(this.array[1]) => => this.CreatedLab", this.CreatedLab);
          console.log("<====================> ");


        // },3500);
      });
  }
  getCreatedLab(): Labsmodel[] {
    return this.CreatedLab;
  }





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
