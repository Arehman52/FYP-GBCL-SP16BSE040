import { Usersmodel } from './../MODELS/usersmodel.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {}
  usersInfoFromDB = [

  ];

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
   this.completeHTTPforRecieveUsersFromDBForSignup();
   return this.tempUsers;
  }
  completeHTTPforRecieveUsersFromDBForSignup(){
    console.log("OUTSIDE HTTP 2nd");
    this.http
    .get<{ message: string; users: Usersmodel[] }>(
      'http://localhost:3000/api/RecieveUsersFromDB'
    )
    .subscribe((responseData) => {
      // setTimeout('2000');
      console.log('SUCCESSFUL TILL HERE but working');
      for (let i = 0; i < Object.keys(responseData.users).length; i++) {
        this.tempUsers.push(responseData.users[i]);
      }
      return;

    });
  }



  createUser(User: Usersmodel) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/CreateUser', User)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });

  }

  getUniversitiesListFromDB() {

    return this.universitiesListFromDB;
  }


}
