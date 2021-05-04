import { Usersmodel } from './../MODELS/usersmodel.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {}
  usersInfoFromDB = [

  ];
  // dw

  universitiesListFromDB = [
      { uniName: 'COMSATS University Islamabad' },
      { uniName: 'IIUI Islamabad' },
      { uniName: 'Islamic University Islamabad' },
      { uniName: 'IBA Karachi' },
      { uniName: 'UET Lahore' },
      { uniName: 'FAST NUCES Islamabad' },
    ];


  tempUsers: Usersmodel[] = [];


  RecieveUsersFromDBForSignup() {
    console.log("OUTSIDE HTTP 2nd");
    this.http
    .get<{ message: string; users: Usersmodel[] }>(
      'http://localhost:3000/api/Homepage/RecieveUsersFromDB'
    )
    .subscribe((responseData) => {
      // setTimeout('2000');
      console.log('SUCCESSFUL TILL HERE but working');
      for (let i = 0; i < Object.keys(responseData.users).length; i++) {
        this.tempUsers.push(responseData.users[i]);
      }
      return;

    });
    return this.tempUsers;
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


}
