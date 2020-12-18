import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(public homepageService: HomepageService) {}

  ngOnInit(): void {
    this.usersInfoListFromDB = this.homepageService.getUsersInfoFromDB();
  }


  //   Download a copy of registered usenames, Take Input from Input Fields,
  //   match the entered username with downloaded inputs on focusout.
  //   IF FOUNDAMATCH THEN SHOWnSET ERROR TRUE ELSE SET FALSE.
  //   onSigninClick check if errors are resolved? if true then login else alert('theERRORmessage')

  user = { username: '', password: '' };
  // {      Username: 'user1', Password: 'user1', UserType: 'teacher', RegisteredWithGBCL: true },
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
    }
  };

  //assigns value of inputs when they change from earlier after focus outs but here The Event being handled is onChange()
  assignInputs(form: NgForm) {
    //both inputs to local variables

    this.user.username = form.value.UsersEnteredUsername;
    this.user.password = form.value.UsersEnteredPassword;

    console.log('AFTER ASSIGNING:');
    console.log(this.user);
  }

  loginUser(form: NgForm) {
    // checkErrors and if no error then proceed the LOGIN
    if (this.checkNDisplayErrors()) {
      console.log(
        'Errors in the Sigin form, returned/stopped here.\nThe error-full FORM:'
      );
      console.log(form);
      return;
    } else {
      console.log(
        'Form has no errors...and user shall be proceeded witht the access.\nThe ERROR-FREE FORM:'
      );
      console.log(form);
    }
  }

  //each time focusouts of both inputs, it checks for the errors
  checkNDisplayErrors(): Boolean {
    this.user.username.length < 3
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    this.user.password.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
    this.notAUser()
      ? (this.Errors.notAUser.status = true)
      : (this.Errors.notAUser.status = false);
    console.log('password from db: ' + this.usersInfoListFromDB.Password);
    console.log('user PRINTED INSIDE checkNDisplayErrors(): \n' + this.user);

    if (
      this.Errors.invalidPassword ||
      this.Errors.invalidUsername ||
      this.Errors.notAUser
    )
      return true;
    else return false;
  }

  notAUser(): Boolean {
    var isAUser: Boolean = false;
    if (this.usersInfoListFromDB != null) {
      for (var i = 0; i < Object.keys(this.usersInfoListFromDB).length; i++) {
        if (this.user.username == this.usersInfoListFromDB[i].Username) {
          isAUser = true;
          return isAUser;
        }
      }
      return isAUser; //returned isUser = false, because no match was found in the list.
    } else return false;
  }
}
