import { Usersmodel } from './../MODELS/usersmodel.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  usersCollectionFromMongoDB: Usersmodel[];





  getUsertypeIfUserIsRegistered(userToBeSearched: Usersmodel):String {
    var user: Usersmodel;
    setTimeout(()=>{user = this.FecthTheMatchingUserForLogin(userToBeSearched);}, 100);
    return user.UserType;
  }







  // temp: any;
  //posibly i might have to send whole user:UserModel in case type mismatch wala error comes.
  FecthTheMatchingUserForLogin(userToBeSearched: Usersmodel):Usersmodel{
    //get Request to findOne username entry, return back
    var userFetchednMtched: Usersmodel;
    var temp: Usersmodel[];

    this.http
    .post<{ message: string; user: Usersmodel }>(
      'http://localhost:3000/api/FetchTHISUser', userToBeSearched
      )
      .subscribe((responseData) => {


        console.log("responseData.user 000000999: ", responseData.user);
        temp.push(responseData.user) ;
        return responseData.user;
        console.log("this.temp 000000999: ", temp);
      });


      userFetchednMtched = temp[0];

    console.log("temptemptemptemp==",temp);
    return userFetchednMtched;



    // setTimeout(700);
    // setTimeout(()=>{console.log("HELLO ARS")}, 700);

    // return userFetchednMtched;
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
