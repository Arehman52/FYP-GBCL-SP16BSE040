import { Usersmodel } from '../MODELS/Usersmodel.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient) { }

  getServerStatus() {
    this.http
      .get<{ message: string; users: Usersmodel[] }>(
        BASE_URL+'/api'
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }



  //do not delete.
  universitiesListFromDB = [
    // { uniName: 'COMSATS University Islamabad' },
    // { uniName: 'IIUI Islamabad' },
    // { uniName: 'Islamic University Islamabad' },
    // { uniName: 'IBA Karachi' },
    // { uniName: 'UET Lahore' },
    // { uniName: 'FAST NUCES Islamabad' },
  ];


  // DeleteThisUniversityALLrecords(uni: Usersmodel) {
  //   //deletes uni as a usr
  //   this.http.delete(BASE_URL+"/api/Users/DeleteThisUser/" + uni).subscribe(
  //     response => {
  //       console.log(response);
  //     }
  //   );

  //   // this.http.delete(BASE_URL+"/api/Users/DeleteLabChallengesWhereLabJoinCode/" + uni).subscribe(
  //   //   response => {
  //   //     console.log(response);
  //   //   }
  //   // );

  //   // this.http.delete(BASE_URL+"/api/Users/DeleteThisUniversityzLabs/" + uni).subscribe(
  //   //   response => {
  //   //     console.log(response);
  //   //   }
  //   // );
  // }

  deleteThisUser(Id: string) {
    this.http.delete(BASE_URL+"/api/Users/DeleteThisUser/" + Id).subscribe(
      response => {
        console.log(response);
      }
    );
  }



  //updateUniversityNameOfUserBecauseTitleOfUniversityHasBeenChanged
  updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUser: Usersmodel, OldUser: Usersmodel) {
    this.http.put(BASE_URL+"/api/Users/updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged/" + OldUser.TitleOfUniversity, UpdatedUser).subscribe(
      response => {
        console.log(response);
      }
    );

  }



  UpdateThisUserWithLABJOINCODES(UpdatedUser: Usersmodel, Id: string) {
    this.http.put(BASE_URL+"/api/Users/UpdateThisUser/" + Id, UpdatedUser).subscribe(
      response => {
        console.log(response);
      }
    );
  }


  deleteThisUniversity(uniUpdatedUser: Usersmodel, Id: string) {
    this.http.put(BASE_URL+"/api/Users/UpdateThisUser/"+Id, uniUpdatedUser)
      .subscribe(
        response => {
          console.log(response);
        }
      );
 }

  updateThisUser(UpdatedUser: Usersmodel, Id: string) {
    this.http.put(BASE_URL+"/api/Users/UpdateThisUser/" + Id, UpdatedUser)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }




  RecieveAllUniversitiesFromDB() {
    var tempRecieveAllUniversitiesFromDB: Usersmodel[] = [];
    this.http
      .get<{ message: string; users: Usersmodel[] }>(
        BASE_URL+'/api/Users/RecieveAllUniversitiesFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.users).length; i++) {
          tempRecieveAllUniversitiesFromDB.push(responseData.users[i]);
        }
      });
    console.log('this.RecieveAllUniversitiesFromDB FROM SERVICE tempUsers===>', tempRecieveAllUniversitiesFromDB);
    return tempRecieveAllUniversitiesFromDB;
  }



  RecieveAllUsersFromDB() {
    var tempUsers: Usersmodel[] = [];
    this.http
      .get<{ message: string; users: Usersmodel[] }>(
        BASE_URL+'/api/Users/RecieveUsersFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.users).length; i++) {
          tempUsers.push(responseData.users[i]);
        }
      });
    console.log('this.AllUsersRecieved FROM SERVICE tempUsers===>', tempUsers);
    return tempUsers;
  }



  createUser(User: Usersmodel) {
    this.http
      .post(BASE_URL+'/api/Users/CreateUser', User)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        console.log(responseData);
      });

  }





  //do not delete this getUniversitiesListFromDB() fn.
  getUniversitiesListFromDB() {
    return this.universitiesListFromDB;
  }












  private arrFetchThisUser: Usersmodel[] = [];
  private arrFetchThisUserbyUsername: Usersmodel[] = [];
  private arrFetchThisUniversityByItsTitle: Usersmodel[] = [];

  FetchThisUniversityByItsTitle(UnizTitle: string): Usersmodel[] {
    this.arrFetchThisUniversityByItsTitle = [];
    var objUnizTitle: { TitleOfUniversity: string } = { TitleOfUniversity: UnizTitle };
    this.http
      .post<{ message: string; user: Usersmodel }>(
        BASE_URL+'/api/Users/FetchThisUniversityByItsTitle', objUnizTitle
      )
      .subscribe((responseData) => {
        this.arrFetchThisUniversityByItsTitle.push(responseData.user);
        console.log('??????', responseData.user);
      });
    console.log("this.arr", this.arrFetchThisUniversityByItsTitle);
    return this.arrFetchThisUniversityByItsTitle;
  }




  FetchThisddddUser(userToBeSearched: Usersmodel): Usersmodel[] {
    this.arrFetchThisUser = [];

    this.http
      .post<{ message: string; user: Usersmodel }>(
        BASE_URL+'/api/Users/FetchTHISUser', userToBeSearched
      )
      .subscribe((responseData) => {

        // if(responseData.user != null){


        this.arrFetchThisUser.push(responseData.user);

        console.log('??????', responseData.user);

        // }

      });

    console.log("this.arr", this.arrFetchThisUser);

    return this.arrFetchThisUser;
  }




  FetchedInstructor: Usersmodel[] = [];

  FetchInstructorForThisLab(LabId: { _id: string }): Usersmodel[] {
    let array: any[] = [];
    this.http
      .post(
        BASE_URL+'/api/Users/FetchInstructorForThisLab/', LabId
      )
      .subscribe((responseData) => {
        console.log("responseData ==> ", responseData);
        array = Object.values(responseData);
        console.log("let array: any[] = [];==> ", array);
        this.FetchedInstructor.push(array[1]);
      });


    // console.log("this.FetchedInstructor==> ", this.FetchedInstructor);
    return this.FetchedInstructor;
  }




  //this one among the 3 is being used everywhere now
  FetchThisUser(usernameToBeSearched: { Username: string }): Usersmodel[] {
    this.arrFetchThisUser = [];

    this.http
      .post<{ message: string; user: Usersmodel }>(
        BASE_URL+'/api/Users/FetchTHISUser', usernameToBeSearched
      )
      .subscribe((responseData) => {

        // if(responseData.user != null){


        this.arrFetchThisUser.push(responseData.user);

        // console.log('??????', responseData.user);

        // }

      });

    // console.log("this.arrrrrrrrrrrrrrrrr", this.arrFetchThisUser);

    return this.arrFetchThisUser;
  }




  //this one among the 3 is being used everywhere now
  // test(): Usersmodel[] {
  //   let arrFetchThisUser: Usersmodel[] = [];

  //   let Username:string[] = [];
  //   Username.push('bilalkhursheed');
  //   Username.push('furqan');
  //   // { Usrename: { $in: req.body.arrayUNs}}
  //   this.http
  //     .post<{ message: string; userzzz: Usersmodel[] }>(
  //       BASE_URL+'/api/Users/FetchTHeseUserzzz', Username
  //     )
  //     .subscribe((responseData) => {
  //       // console.log("responseData:::!@@@",responseData);
  //       for (let i = 0; i < Object.keys(responseData.userzzz).length; i++) {
  //         arrFetchThisUser.push(responseData.userzzz[i]);
  //       }
  //     });

  //     console.log("============this.arrFetchThisUser=========:",arrFetchThisUser);

  //   return arrFetchThisUser;
  // }





  FetchThisUserbyUsername(username: string): Usersmodel[] {
    this.arrFetchThisUserbyUsername = [];

    this.http
      .post<{ message: string; user: Usersmodel }>(
        BASE_URL+'/api/Users/FetchTHISUser', username
      )
      .subscribe((responseData) => {

        // if(responseData.user != null){


        this.arrFetchThisUserbyUsername.push(responseData.user);

        console.log('??????', responseData.user);

        // }

      });

    console.log("this.arr", this.arrFetchThisUserbyUsername);

    return this.arrFetchThisUserbyUsername;
  }










}
