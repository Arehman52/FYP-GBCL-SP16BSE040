import { Usersmodel } from './usersmodel.model';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class HomepageService {
  private user: Usersmodel[] = [];
  usersInfoFromDB = [
    {      Username: 'user1', Password: 'user1', UserType: 'teacher', RegisteredWithGBCL: true },
    {      Username: 'user2', Password: 'user1', UserType: 'student', RegisteredWithGBCL: true },
    {      Username: 'user3', Password: 'user1', UserType: 'university', RegisteredWithGBCL: true },
    {      Username: 'user4', Password: 'user1', UserType: 'teacher', RegisteredWithGBCL: true }
  ];
  universitiesListFromDB: any = [
    { uniName: 'Not Listed!' },
    { uniName: 'COMSATS University Islamabad' },
    { uniName: 'IIUI Islamabad' },
    { uniName: 'FAST NUCES Islamabad' },
  ];

  // tslint:disable-next-line: typedef
  getUser() {
    // return [...this.user];
    console.log('currently getUser() Method of service doesnt do anything.');
  }


  //

  // tslint:disable-next-line: typedef
  createUser(User: Usersmodel) {
    if(User.UserType == 'student'){
      //update thos User to Student DB
    }else if(User.UserType == 'teacher'){
      //update thos User to Teacher DB

    }else if(User.UserType == 'university'){
      //update thos User to University DB

    }
    // // tslint:disable-next-line: object-literal-shorthand
    // const user: Usersmodel = {
    //   UserEmail: UserEmail,
    //   UserPassword: UserPassword,
    // };
    // this.user.push(user);
    console.log('currently createUser() Method of service doesnt do anything.');
  }

  getUsersInfoFromDB() {
    //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
    if (this.usersInfoFromDB.length <= 0) {
      console.log('Users from DB are null');
      return null;
    }
    else
      return this.usersInfoFromDB;
  }
  getUniversitiesListFromDB() {
    //returns this.usersInfoFromDB list to GBCL's Homepage Component's .ts file
    return this.universitiesListFromDB;
  }
}
