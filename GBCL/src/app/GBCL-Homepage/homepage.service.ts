import { Usersmodel } from './../MODELS/usersmodel.model';
// import { Uni } from './../MODELS/Uni.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { setTimeout } from 'timers';

@Injectable({ providedIn: 'root' })
export class HomepageService {
  constructor(private http: HttpClient) {}
  // obj: Uni;
  usersInfoFromDB = [
    // {
    //   Username: 'user1',
    //   Password: 'user1',
    //   UserType: 'teacher',
    //   RegisteredWithGBCL: true,
    // },
    // {
    //   Username: 'user2',
    //   Password: 'user1',
    //   UserType: 'student',
    //   RegisteredWithGBCL: true,
    // },
    // {
    //   Username: 'user3',
    //   Password: 'user1',
    //   UserType: 'university',
    //   RegisteredWithGBCL: true,
    // },
    // {
    //   Username: 'user4',
    //   Password: 'user1',
    //   UserType: 'teacher',
    //   RegisteredWithGBCL: true,
    // },
  ];

  universitiesListFromDB = [
      { uniName: 'COMSATS University Islamabad' },
      { uniName: 'IIUI Islamabad' },
      { uniName: 'Islamic University Islamabad' },
      { uniName: 'IBA Karachi' },
      { uniName: 'UET Lahore' },
      { uniName: 'FAST NUCES Islamabad' },
    ];
  // universitiesListFromDB: Uni[] = [];

  tempUsers: Usersmodel[] = [];

  RecieveUsersFromDB() {
   this.completeHTTPforRecieveUsersFromDB();
   return this.tempUsers;
  }
  completeHTTPforRecieveUsersFromDB(){
    console.log("OUTSIDE HTTP");
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





  // FecthUsers():Usersmodel[]{
  //   //get Request to findOne username entry, return back
  //   var usersFetched: Usersmodel[] = [];

  //   this.http
  //   .get<{ message: string; user: any }>(
  //     'http://localhost:3000/api/FetchUsersFromDB'
  //   )
  //   .subscribe((responseData) => {
  //     console.log("responseData.user : ", responseData.user);
  //     usersFetched = responseData.user;
  //   });



  //   // setTimeout(700);
  //   setTimeout(()=>{console.log("HELLO ARS")}, 700);

  //   return usersFetched;
  // }



  //posibly i might have to send whole user:UserModel in case type mismatch wala error comes.
  FecthTheMatchingUserForLogin(userToBeSearched: Usersmodel):Usersmodel{
    //get Request to findOne username entry, return back
    var userFetchednMtched: Usersmodel = null;

    this.http
    .post<{ message: string; user: Usersmodel }>(
      'http://localhost:3000/api/FetchTHISUser', userToBeSearched
    )
    .subscribe((responseData) => {

      console.log("IF THIS MESSAGE IS THERE, THAN THINGS TILL SERVICE ARE OK. and below WILL RESPONSRDATA.USER");
      console.log("responseData.user : ", responseData.user);
      userFetchednMtched = responseData.user;
    });



    // setTimeout(700);
    setTimeout(()=>{console.log("HELLO ARS")}, 700);

    return userFetchednMtched;
  }




















  // initiallizeRemainings(responseData: Usersmodel[]) {
  //   console.log("NOW INITIALLIZINGGGGG");
  //   // universitiesListFromDB: { uniName: string }[] = [
  //   //   // { uniName: 'COMSATS University Islamabad' },
  //   //   // { uniName: 'IIUI Islamabad' },
  //   //   // { uniName: 'FAST NUCES Islamabad' },
  //   // ];

  //   for (let i = 0; i < responseData.length; i++) {
  //     var matchedFlag: Boolean = false;
  //     if (this.universitiesListFromDB.length <= 0) {
  //       for (
  //         let j = 0;
  //         j < this.universitiesListFromDB.length && !matchedFlag;
  //         j++
  //       ) {
  //         if (
  //           this.universitiesListFromDB[j].uniName ==
  //           responseData[i].UniversityNameOfUser
  //         ) {
  //           matchedFlag = true;
  //         }
  //       }
  //       if (matchedFlag == false) {

  //         // this.obj.uniName = responseData[i].UniversityNameOfUser;
  //         let obj: Uni = { uniName: responseData[i].UniversityNameOfUser };
  //         this.universitiesListFromDB.push(obj);
  //       }
  //       //check MatchedFlag, if false then assign
  //     } else {
  //       this.universitiesListFromDB[0].uniName =
  //         responseData[i].UniversityNameOfUser;
  //     }
  //   }

  //   console.log(this.universitiesListFromDB);
  // }

  createUser(User: Usersmodel) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/CreateUser', User)
      .subscribe((responseData) => {
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

  // getUsersInfoFromDB() {
  //   //////////////////////////////////////////////////////UsersInfo TO BE RETRIEVED
  //   ////////////////////////////////////////////////////// FROM HERE FOR SIGNIN
  //   // this.http.get<{ message: string }>(
  //   //   'http://localhost:3000/api/GetUsersListFromDB')
  //   //   .subscribe((responseData)=>{
  //   //     console.log(responseData.message);
  //   //   });

  //   //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
  //   if (this.usersInfoFromDB.length <= 0) {
  //     console.log('Users from DB are null');
  //     return null;
  //   } else return this.usersInfoFromDB;
  // }

  getUniversitiesListFromDB() {
    // this.http
    //   .get<{
    //     message: string;
    //     universitiesResponse: { _id: string; uniName: string }[];
    //   }>('http://localhost:3000/api/GetUniversitiesListFromDB')
    //   .subscribe((responseData) => {
    //     this.universitiesListFromDB = responseData.universitiesResponse;
    //     console.log(responseData.message);
    //     console.log(responseData.universitiesResponse);

    //     // return responseData.universitiesResponse;
    //   });

    return this.universitiesListFromDB;
  }

  loginAdmin(password: string) {
    if (password == 'passworD123') {
      window.location.href = 'ADMIN';
    }
  }

  //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
  //     return this.universitiesListFromDB;
  //   }
  // }

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






  ///HARD CODED DATA





}
