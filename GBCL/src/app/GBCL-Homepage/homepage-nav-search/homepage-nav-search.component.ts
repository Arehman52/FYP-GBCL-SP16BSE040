import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

import { HomepageService } from '../homepage.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    // this.FetchedTotalUsersForSignin = this.loginService.RecieveUsersFromDB();
    console.log(this.FetchedTotalUsersForSignin);
  }

  //This array has a list of ALL users currently in MongoDB.
  private FetchedTotalUsersForSignin: Usersmodel[] = [];

  //  FetchedUsers: Usersmodel[] = null ;

  user: Usersmodel = {
    FirstNameOfUser: null,
    HECIDofUniversity: null,
    LastNameOfUser: null,
    Password: '',
    RegistrationNumberOfUser: null,
    TitleOfUniversity: null,
    UniversityNameOfUser: null,
    UserType: null,
    _id: null,
    Username: '',
  };

  usersInfoListFromDB: any = {}; //downloaded list of all users

  Errors = {
    //below errors are for fields in common.
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters).',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters).',
    },
    notAUser: {
      status: true,
      message: 'this username does not belong to anybody.',
    },
    incorrectPassword: {
      status: true,
      message: 'password incorrect',
    },
  };

  //assigns value of inputs when they change from earlier after focus outs but here The Event being handled is onChange()
  assignInputs(form: NgForm) {
    //both inputs to local variables

    this.user.Username = form.value.UsersEnteredUsername;
    this.user.Password = form.value.UsersEnteredPassword;

    // console.log('AFTER ASSIGNING:');
    // console.log(this.user);
  }

  loginUser(form: NgForm) {
      var userToBeSearched: Usersmodel = {
      FirstNameOfUser: null,
      HECIDofUniversity: null,
      LastNameOfUser: null,
      Password: null,
      RegistrationNumberOfUser: null,
      TitleOfUniversity: null,
      UniversityNameOfUser: null,
      UserType: null,
      Username: form.value.UsersEnteredUsername,
      _id: null,
    };


    if(!formIsValid(form)){
      alert("Sign in fields are invalid!");
    }
    else
    {
      var TypeOfUser: string | String;
      setTimeout( () => {TypeOfUser = this.loginService.getUsertypeIfUserIsRegistered(userToBeSearched)} , 3000);

      if (TypeOfUser == 'student')
      window.location.href = '/STUDENT';
      if (TypeOfUser == 'teacher')
      window.location.href = '/TEACHER';
      if (TypeOfUser == 'university')
      window.location.href = '/UNIVERSITY';
    }









    /**
    if (this.checkNDisplayErrors()) {
      alert('Errors in the Sigin process.\nThe error-full FORM:');
      console.log(form);
      return;
    } else
    {
      //if signin fields have valid inputs than this block will execute.
      //this block running means both inputs are entered valid.

      //if username entered is Admin, then only following 4 lines will execute.
      // if (form.value.UsersEnteredUsername == 'Admin') {
      //   this.loginService.loginAdmin(form.value.UsersEnteredPassword);
      //   return;
      // }

      //following code will be executed if username is not entered as Admin.














      //following is returning null
      var TheMatchedUser: Usersmodel = this.loginService.FecthTheMatchingUserForLogin(
        userToBeSearched
      );

      console.log("TheMatchedUser :>>>",TheMatchedUser);
      //if fetched user == null then show error and return
      //else user will be either uni, std or tchr and proceed to their login
      if (TheMatchedUser == null) {
        alert('This username is not registered with GBCL --');
        return;
      } else {
        var EnteredUN: string = form.value.UsersEnteredUsername;
        EnteredUN.toLowerCase();
        var fetchedUN: string = TheMatchedUser.Username;
        fetchedUN.toLowerCase();
        // for (let i = 0; i < Object.keys(this.FetchedTotalUsersForSignin).length; i++) {
        // fetchedUN.toLowerCase();
        if (fetchedUN == EnteredUN) {
          //checked if Username matched?

           //checks if Password matches?
          if (TheMatchedUser.Password == form.value.UsersEnteredPassword)
          {
            //if both matched, then according to usertype, visit their location.
            if (TheMatchedUser.UserType == 'student')
              window.location.href = '/STUDENT';
            if (TheMatchedUser.UserType == 'teacher')
              window.location.href = '/TEACHER';
            if (TheMatchedUser.UserType == 'university')
              window.location.href = '/UNIVERSITY';

            alert('THIS MESSAGE SHALL NEVEr BE DISPLAYED');
            // return;
          } else {
            alert('Enter correct Password');
            return;
          }
        }
        // }
        alert('This Username is not registered in GBCL 22222');
        return;
      }
    }*/
  }

  //each time focusouts of both inputs, it checks for the errors
  checkNDisplayErrors(): Boolean {
    this.user.Username.length < 3
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    this.user.Password.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
    // this.notAUser()
    //   ? (this.Errors.notAUser.status = true)
    //   : (this.Errors.notAUser.status = false);
    // console.log('password from db: ' + this.usersInfoListFromDB.Password);
    // console.log('user PRINTED INSIDE checkNDisplayErrors(): \n' + this.user);

    if (
      this.Errors.invalidPassword.status ||
      this.Errors.invalidUsername.status
      // || this.Errors.notAUser
    )
      return true;
    else return false;
  }

  notAUser(): Boolean {
    var isAUser: Boolean = false;
    if (this.usersInfoListFromDB != null) {
      for (var i = 0; i < Object.keys(this.usersInfoListFromDB).length; i++) {
        if (this.user.Username == this.usersInfoListFromDB[i].Username) {
          isAUser = true;
          return isAUser;
        }
      }
      return isAUser; //returned isUser = false, because no match was found in the list.
    } else return false;
  }
}
function formIsValid(form: NgForm):Boolean {
  //lets suppose there are no errors and signin fields have valid input.
  return true;
}

