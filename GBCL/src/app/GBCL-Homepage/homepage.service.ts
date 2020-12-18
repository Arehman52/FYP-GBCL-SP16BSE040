import { Usersmodel } from './../MODELS/usersmodel.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {}
  usersInfoFromDB = [
    {
      Username: 'user1',
      Password: 'user1',
      UserType: 'teacher',
      RegisteredWithGBCL: true,
    },
    {
      Username: 'user2',
      Password: 'user1',
      UserType: 'student',
      RegisteredWithGBCL: true,
    },
    {
      Username: 'user3',
      Password: 'user1',
      UserType: 'university',
      RegisteredWithGBCL: true,
    },
    {
      Username: 'user4',
      Password: 'user1',
      UserType: 'teacher',
      RegisteredWithGBCL: true,
    },
  ];
  universitiesListFromDB: any = [
    { uniName: 'Not Listed!' },
    { uniName: 'COMSATS University Islamabad' },
    { uniName: 'IIUI Islamabad' },
    { uniName: 'FAST NUCES Islamabad' },
  ];

  // getUser() {

  // }

  ///api/GetUsersListFromDB

  // tslint:disable-next-line: typedef
  createUser(User: Usersmodel) {
    this.http.post<{ message: string }>(
      'http://localhost:3000/api/CreateUser', User)
      .subscribe((responseData)=>{
        console.log(responseData.message);
      });

    // if(User.UserType == 'student'){
    //   //update thos User to Student DB
    //   console.log("User is a student: \n"+User);
    // }else if(User.UserType == 'teacher'){
    //   //update thos User to Teacher DB
    //   console.log("User is a Teacher: \n"+User);

    // }else if(User.UserType == 'university'){
    //   //update thos User to University DB
    //   console.log("User is a uni: \n"+User);

    // }
    // // tslint:disable-next-line: object-literal-shorthand
    // const user: Usersmodel = {
    //   UserEmail: UserEmail,
    //   UserPassword: UserPassword,
    // };
    // this.user.push(user);
    // console.log('currently createUser() Method of service doesnt do anything.');
  }

  getUsersInfoFromDB() {



    //////////////////////////////////////////////////////UsersInfo TO BE RETRIEVED
    ////////////////////////////////////////////////////// FROM HERE FOR SIGNIN
    // this.http.get<{ message: string }>(
    //   'http://localhost:3000/api/GetUsersListFromDB')
    //   .subscribe((responseData)=>{
    //     console.log(responseData.message);
    //   });




    //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
    if (this.usersInfoFromDB.length <= 0) {
      console.log('Users from DB are null');
      return null;
    } else return this.usersInfoFromDB;
  }
  getUniversitiesListFromDB() {
    //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
    return this.universitiesListFromDB;
  }
}



























//////WHEN MONGODB WILL BE HANDLED,FOLLOWING ETHODS WILL BE HANDY




// getUsersInfoFromDB() {
//   // this.http
//   //   .get<{ message: string; usersInResponse: Usersmodel[] }>(
//   //     'http://localhost:3000/api/GetUsersListFromDB'
//   //   )
//   //   .subscribe((responseData) => {
//   //     console.log('========  01  ==========');
//   //     // for(var i=0; i<Object.keys(responseData.usersInResponse).length; i++ ){
//   //     // this.usersInfoFromDB.push(responseData.usersInResponse[i]);
//   //     // }

//   //     this.usersInfoFromDB = responseData.usersInResponse;
//   //     console.log('console.log(this.usersInfoFromDB);');
//   //     console.log(this.usersInfoFromDB);

//   //   });
//     // returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
//     if (this.usersStorageArray.length <= 0) {
//       console.log('Users from DB are null');
//       return null;
//     } else return this.usersStorageArray;
// }






// createUser(User: Usersmodel) {
//   this.http
//     .post<{ message: string }>('http://localhost:3000/api/CreateUser', User)
//     .subscribe((responseData) => {
//       console.log(responseData.message);
//     });
// }
