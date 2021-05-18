import { Usersmodel } from '../MODELS/usersmodel.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}




  universitiesListFromDB = [
    // { uniName: 'COMSATS University Islamabad' },
      // { uniName: 'IIUI Islamabad' },
      // { uniName: 'Islamic University Islamabad' },
      // { uniName: 'IBA Karachi' },
      // { uniName: 'UET Lahore' },
      // { uniName: 'FAST NUCES Islamabad' },
    ];


    deleteThisUser(Id: string){
      this.http.delete("http://localhost:3000/api/Users/DeleteThisUser/"+Id).subscribe(
        response=>{
          console.log(response);
        }
      );
    }

    updateThisUser(UpdatedUser: Usersmodel, Id: string) {
      this.http.put("http://localhost:3000/api/Users/UpdateThisUser/"+Id, UpdatedUser).subscribe(
        response=>{
          console.log(response);
        }
      );
    }


    RecieveAllUsersFromDB() {
    var tempUsers: Usersmodel[] = [];
    this.http
    .get<{ message: string; users: Usersmodel[] }>(
      'http://localhost:3000/api/Users/RecieveUsersFromDB'
    )
    .subscribe((responseData) => {
      for (let i = 0; i < Object.keys(responseData.users).length; i++) {
        tempUsers.push(responseData.users[i]);
      }
    });
    return tempUsers;
  }



  createUser(User: Usersmodel) {
    this.http
      .post('http://localhost:3000/api/Users/CreateUser', User)
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
  //     'http://localhost:3000/api/Users/getUniversitiesList'
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
