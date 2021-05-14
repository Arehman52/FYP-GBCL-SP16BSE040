import { Usersmodel } from './../MODELS/usersmodel.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {}


  private count = 0;
  countPlusPlus(){
    this.count++;
  }
  getCount():number{
    return this.count;
  }
  usersInfoFromDB = [

  ];
  // dw

  universitiesListFromDB = [
      // { uniName: 'COMSATS University Islamabad' },
      // { uniName: 'IIUI Islamabad' },
      // { uniName: 'Islamic University Islamabad' },
      // { uniName: 'IBA Karachi' },
      // { uniName: 'UET Lahore' },
      // { uniName: 'FAST NUCES Islamabad' },
    ];




    RecieveAllUsersFromDB() {
    var tempUsers: Usersmodel[] = [];
    console.log("OUTSIDE HTTP 2nd");
    this.http
    .get<{ message: string; users: Usersmodel[] }>(
      'http://localhost:3000/api/Homepage/RecieveUsersFromDB'
    )
    .subscribe((responseData) => {
      // setTimeout('2000');
      console.log('SUCCESSFUL TILL HERE but working');
      for (let i = 0; i < Object.keys(responseData.users).length; i++) {
        tempUsers.push(responseData.users[i]);
      }
      return;

    });
    return tempUsers;
  }



  createUser(User: Usersmodel) {
    this.http
      .post('http://localhost:3000/api/Homepage/CreateUser', User)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        console.log(responseData);
      });

  }

  getUniversitiesListFromDB() {

    return this.universitiesListFromDB;
  }















  //============================
  //============================

  // UniListArr: {uniName:String}[] = [];

  // newGetUniList(): {uniName:String}[] {


  //   this.http
  //   .get<{  theList: String[] }>(
  //     'http://localhost:3000/api/Homepage/getUniversitiesList'
  //   )
  //   .subscribe((responseData) => {
  //     // setTimeout('2000');
  //     // console.log('SUCCESSFUL TILL HERE but working');
  //     for (let i = 0; i < Object.keys(responseData.theList).length; i++) {
  //       // this.UniListArr.push(responseData.theList[i]);
  //     }
  //     return this.UniListArr;

  //   });
  //   return this.UniListArr;
  // }









}
