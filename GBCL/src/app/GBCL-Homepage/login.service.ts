import { Usersmodel } from './../MODELS/usersmodel.model';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  usersCollectionFromMongoDB: Usersmodel[];





  // getUsertypeIfUserIsRegistered(userToBeSearched: Usersmodel): String {
  //   var user: Usersmodel;
  //   setTimeout(() => { user = this.FecthTheMatchingUserForLogin(userToBeSearched); }, 100);
  //   return user.UserType;
  // }







  FecthTheMatchingUserForLogin(userToBeSearched: Usersmodel): Usersmodel {
    var userFetchednMtched: Usersmodel = {
      FirstNameOfUser : '',
      HECIDofUniversity : '',
      LastNameOfUser: '',
      Password: '',
      RegistrationNumberOfUser: '',
      TitleOfUniversity: '',
      UniversityNameOfUser: '',
      UserType: '-1',
      Username: '',
      _id: ''
    };
    let temp: Usersmodel;

    this.http
      .post<{ message: string; user: Usersmodel }>(
        'http://localhost:3000/api/FetchTHISUser', userToBeSearched
      )
      .subscribe((responseData) => {
        // temp.push(responseData.user);
        if(responseData.user != null){
          userFetchednMtched.UserType = responseData.user.UserType;
          userFetchednMtched.Password = responseData.user.Password;
          // temp = {...responseData.user};
        //  temp = Object.assign({}, responseData.user);
        // temp = JSON.parse(JSON.stringify(responseData.user));


        }
        // console.log('YE USER TYOE KIA H? :',responseData.user);
        // console.log("INSIDE HTTP temp[0].Username [[[[", temp[0].Username, "]]]]], ");

        return;

      });

    // console.log("OUTSIDE HTTP temp[0].Username [[[[",temp[0].Username,"]]]]], ",temp[0].UserType);
    // userFetchednMtched.UserType = temp[0].UserType;
    // userFetchednMtched.FirstNameOfUser = temp[0].FirstNameOfUser;
    // userFetchednMtched.HECIDofUniversity = temp[0].HECIDofUniversity;
    // userFetchednMtched.LastNameOfUser = temp[0].LastNameOfUser;
    // userFetchednMtched.Password = temp[0].Password;
    // userFetchednMtched.RegistrationNumberOfUser = temp[0].RegistrationNumberOfUser;
    // userFetchednMtched.TitleOfUniversity = temp[0].TitleOfUniversity;
    // userFetchednMtched.UniversityNameOfUser = temp[0].UniversityNameOfUser;
    // userFetchednMtched.Username = temp[0].Username;
    // userFetchednMtched._id = temp[0]._id;

    // userFetchednMtched = temp[0];
    console.log("TEEEMPP==", temp);
    console.log("userFetchednMtcheduserFetchednMcdefsef$$$$$$tched==", userFetchednMtched);
    return userFetchednMtched;
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
