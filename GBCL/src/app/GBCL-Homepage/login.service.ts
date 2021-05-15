import { Usersmodel } from './../MODELS/usersmodel.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  usersCollectionFromMongoDB: Usersmodel[];

//



  // getUsertypeIfUserIsRegistered(userToBeSearched: Usersmodel): String {
  //   var user: Usersmodel;
  //   setTimeout(() => { user = this.FecthTheMatchingUserForLogin(userToBeSearched); }, 100);
  //   return user.UserType;
  // }






  // userFetchednMtched1;

  arr: any[] = [];
  FecthTheMatchingUserForLogin(userToBeSearched: Usersmodel): any[] {


    this.http
      .post<{ message: string; user: Usersmodel }>(
        'http://localhost:3000/api/Users/FetchTHISUser', userToBeSearched
      )
      .subscribe((responseData) => {

        if(responseData.user != null){


          this.arr.push(responseData.user);

        }

      });

      console.log("this.arr", this.arr);

      return this.arr;
  }





























  loginAdmin(password: string) {
    if (password == 'password123') {
      window.location.href = 'ADMIN';
    }
  }


  /**
  tempUsers: Usersmodel[] = [];


  RecieveUsersFromDB() {


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
   return this.tempUsers;
  }


*/



}
