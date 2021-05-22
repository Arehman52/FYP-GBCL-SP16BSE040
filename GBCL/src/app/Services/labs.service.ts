import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Labsmodel } from '../MODELS/labsmodel.model';

@Injectable({
  providedIn: 'root'
})
export class LabsService {

  constructor(private http:HttpClient) { }




  createLab(Lab: Labsmodel) {
    this.http
      .post('http://localhost:3000/api/Labs/CreateLab', Lab)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        console.log(responseData);
      });
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
