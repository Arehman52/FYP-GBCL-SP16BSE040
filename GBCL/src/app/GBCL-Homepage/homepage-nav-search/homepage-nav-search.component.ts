import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

// import { HomepageService } from '../homepage.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.setAllErrorsFalse();
  }


  user: Usersmodel = {
    FirstNameOfUser: '',
    HECIDofUniversity: '',
    LastNameOfUser: '',
    Password: '',
    RegistrationNumberOfUser: '',
    TitleOfUniversity: '',
    UniversityNameOfUser: '',
    UserType: '',
    _id: '',
    Username: '',
  };

  usersInfoListFromDB: any = {}; //downloaded list of all users

  Errors = {
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



  loginUser(form: NgForm) { //when login is clicked this fn is executed.

    var userToBeSearched: Usersmodel = {
      FirstNameOfUser: '',
      HECIDofUniversity: '',
      LastNameOfUser: '',
      Password: form.value.UsersEnteredPassword,
      RegistrationNumberOfUser: '',
      TitleOfUniversity: '',
      UniversityNameOfUser: '',
      UserType: '',
      Username: form.value.UsersEnteredUsername,
      _id: '',
    };


    if(form.value.UsersEnteredPassword.length == 0 ||
      form.value.UsersEnteredUsername.length == 0)
    {
      alert("Fields cannot be empty!!");
      return;
    }

    ///====================================
    ///CORRECTED CODE TILL HERE
    ///====================================

    if (this.formIsInvalid(form)) {
      return;
    }
    else {
      var TheMatchedUser: Usersmodel[] = [];

      setTimeout(() => {
        TheMatchedUser = this.loginService.FecthTheMatchingUserForLogin(
          userToBeSearched);

      }, 4000);

      setTimeout(() => {
        console.log("TheMatchedUserTheMatchedUserTheMatchedUser", TheMatchedUser);

      if (TheMatchedUser[0].UserType == 'student')
      window.location.href = '/STUDENT';
    if (TheMatchedUser[0].UserType == 'teacher')
      window.location.href = '/TEACHER';
    if (TheMatchedUser[0].UserType == 'university')
      window.location.href = '/UNIVERSITY';
      }, 5000);

    }

  }

  //each time focusouts of both inputs, it checks for the errors
  checkNDisplayErrors(): Boolean {
    this.user.Username.length < 3
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    this.user.Password.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);

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

  formIsInvalid(form: NgForm): Boolean {
    console.log("form.value.UsersEnteredUsername.length",form.value.UsersEnteredUsername.length);

    // console.log("(<HTMLInputElement>document.getElementById(\"name\")).value",
    // (<HTMLDialogElement>document.getElementById("LoadingModal")).showModal();
    form.value.UsersEnteredUsername.length < 3
    ? (this.Errors.invalidUsername.status = true)
    : (this.Errors.invalidUsername.status = false);
    form.value.UsersEnteredPassword.length < 8
    ? (this.Errors.invalidPassword.status = true)
    : (this.Errors.invalidPassword.status = false);



      // || this.Errors.notAUser
  if (!(this.Errors.invalidPassword.status) && !(this.Errors.invalidUsername.status))
    {
    return false; //returns false if signin fields have valid input.
  }
  else
  {
    return true;
  }

  }

  setAllErrorsFalse() {
    this.Errors.invalidUsername.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.notAUser.status = false;
    this.Errors.incorrectPassword.status = false;
  }


}

