import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { UsersService } from 'src/app/Services/users.service';




@Component({
  selector: 'app-homepage-nav-search',
  templateUrl: './homepage-nav-search.component.html',
  styleUrls: ['./homepage-nav-search.component.css'],
})
export class HomepageNavSearchComponent implements OnInit {
  constructor(private usersService: UsersService) { }



  ngOnInit(): void {
    this.setAllErrorsToFalse();
  }


  showSpinner: boolean = false;
  // spinnerbtn:HTMLButtonElement



  // onClickToggleSpinner(){
  //   this.showSpinner = !this.showSpinner;
  // }

  // setSpinnerVisible(opt:boolean){
  //   this.showSpinner = opt;
  // }


  onKeyUpUsernameInput(UsernameInput: String) {
    if (UsernameInput.length < 5) {
      this.Errors.invalidUsername.status = true;
    } else {
      this.Errors.invalidUsername.status = false;
    }
    // this.Errors.notAUser.status = false;
  }

  onKeyUpPasswordInput(PasswordInput: String) {
    if (PasswordInput.length < 8) {
      this.Errors.invalidPassword.status = true;
    } else {
      this.Errors.invalidPassword.status = false;
    }
  }

  Errors = {
    userTerminatedLoginAccessBecauseUniTerminated: {
      status: true,
      message: 'Your access to GBCL is terminated because your university\'s access terminated temporarily',
    },
    userTerminatedLoginAccess: {
      status: true,
      message: 'Your access to GBCL is temporarily terminated.',
    },
    userRejectedLoginAccess: {
      status: true,
      message: 'Your registration request was rejected.',
    },
    userPendingLoginAccess: {
      status: true,
      message: 'You cannot login yet, your registration is not approved yet.',
    },
    uniPendingLoginAccess: {
      status: true,
      message: 'You cannot login yet, Admin has to approve your registration.',
    },
    //below errors are for fields in common.
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters.',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters.',
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


  setAllErrorsToFalse() {  //total Errors count = 9
    this.Errors.userTerminatedLoginAccessBecauseUniTerminated.status = false;
    this.Errors.userTerminatedLoginAccess.status = false;
    this.Errors.userRejectedLoginAccess.status = false;
    this.Errors.userPendingLoginAccess.status = false;
    this.Errors.uniPendingLoginAccess.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.notAUser.status = false;
    this.Errors.incorrectPassword.status = false;
  }



  loginUser(form: NgForm) {
    var LoginUserzUniversityAsUser: Usersmodel[] = [];
    var TheMatchedUser: Usersmodel[];

    this.setAllErrorsToFalse();

    var usernameToBeSearched:{Username:string} = {Username: form.value.UsersEnteredUsername.toLowerCase()};

    var formValueUsername = form.value.UsersEnteredUsername.toLowerCase();
    var formValuePassword = form.value.UsersEnteredPassword;
    if (this.checkErrors(formValueUsername,formValuePassword)) {
      alert("Sign in fields are invalid!");
    }
    else {
      this.showSpinner = true;
      setTimeout(() => {
        TheMatchedUser = this.usersService.FetchThisUser(
          usernameToBeSearched);
        console.log('TheMatchedUser  :', TheMatchedUser);
      }, 1000);

      setTimeout(() => {

        // console.log('TheMatchedUser  :', TheMatchedUser);
        if (TheMatchedUser[0] == null || undefined) {
          this.showSpinner = false;
          console.log('length is == zerooooooooooooooooo');
          this.Errors.notAUser.status = true;
          return;
        }
        else {

          this.showSpinner = false;
          if (formValuePassword === TheMatchedUser[0].Password) {


            if (TheMatchedUser[0].UserType == 'admin')
              window.location.href = '/ADMIN';


            if (TheMatchedUser[0].UserzAccessStatus == 'Allowed') {

              localStorage.setItem("UsersUsername", TheMatchedUser[0].Username);
              localStorage.setItem("UsersUsertype", TheMatchedUser[0].UserType);
              localStorage.setItem("UniversityTitle", TheMatchedUser[0].TitleOfUniversity);
              localStorage.setItem("UserzUniversityNameOfUser", TheMatchedUser[0].UniversityNameOfUser);
              // localStorage.setItem("UserzUniversityNameOfUser", TheMatchedUser[0].UniversityNameOfUser);
              localStorage.setItem("UserzFirstNameOfUser", TheMatchedUser[0].FirstNameOfUser);
              localStorage.setItem("UserzLastNameOfUser", TheMatchedUser[0].LastNameOfUser);
              localStorage.setItem("UserzRegistrationNumberOfUser", TheMatchedUser[0].RegistrationNumberOfUser);
              // alert(TheMatchedUser[0].TitleOfUniversity);

              if (TheMatchedUser[0].UserType != 'university' || 'admin')
                this.Errors.incorrectPassword.status = false;



              if (TheMatchedUser[0].UserType == 'student' || 'teacher') {
                console.log("TheMatchedUser[0].UserType == 'student' || 'teacher'");

                LoginUserzUniversityAsUser = this.usersService.FetchThisUniversityByItsTitle(TheMatchedUser[0].UniversityNameOfUser);
                console.log('LoginUserzUniversityAsUser : ', LoginUserzUniversityAsUser);

                setTimeout(() => {

                  if (LoginUserzUniversityAsUser[0].UserzAccessStatus == 'Terminated') {
                    console.log('LoginUserzUniversityAsUser[0].UserzAccessStatus == "Terminated"');
                    //display YOUR University is Terminated Error
                    this.Errors.userTerminatedLoginAccessBecauseUniTerminated.status = true;
                    return;
                  }
                  if (LoginUserzUniversityAsUser[0].UserzAccessStatus == 'Allowed') {
                    console.log("LoginUserzUniversityAsUser[0].UserzAccessStatus == 'Allowed'");
                    if (TheMatchedUser[0].UserType == 'student')
                      window.location.href = '/STUDENT';
                    if (TheMatchedUser[0].UserType == 'teacher')
                      window.location.href = '/TEACHER';

                  }
                }, 1300);
              }

              if (TheMatchedUser[0].UserType == 'university' && TheMatchedUser[0].UserzAccessStatus == 'Allowed') {
                console.log("TheMatchedUser[0].UserType == 'university' && TheMatchedUser[0].UserzAccessStatus == 'Allowed'");
                window.location.href = '/UNIVERSITY';
              }
            }




            if (TheMatchedUser[0].UserzAccessStatus == 'Pending') {
              // this.showSpinner = false;
              console.log("TheMatchedUser[0].UserzAccessStatus == 'Pending'");
              if (TheMatchedUser[0].UserType == 'university') {
                this.Errors.uniPendingLoginAccess.status = true;

                return;
              } else {
                this.Errors.userPendingLoginAccess.status = true;

                return;
              }

              // TheMatchedUser.length = 0;
            }



            if (TheMatchedUser[0].UserzAccessStatus == 'Rejected') {
              console.log("TheMatchedUser[0].UserzAccessStatus == 'Rejected'");
              this.Errors.userRejectedLoginAccess.status = true;
              // this.showSpinner = false;

              return;
            }



            if (TheMatchedUser[0].UserzAccessStatus == 'Terminated') {
              console.log("TheMatchedUser[0].UserzAccessStatus == 'Terminated'");
              // this.showSpinner = false;
              this.Errors.userTerminatedLoginAccess.status = true;

              return;
            }

          } else {
            this.Errors.incorrectPassword.status = true;
            return;
          }




        }
      }, 3000);

    }



  }


  //each time focusouts of both inputs, it checks for the errors
  checkErrors(username: string,pw: string): Boolean {
    username.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    pw.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
    // this.notAUser()
    //   ? (this.Errors.notAUser.status = true)
    //   : (this.Errors.notAUser.status = false);
    // console.log('password from db: ' + this.usersInfoListFromDB.Password);
    // console.log('user PRINTED INSIDE checkNDisplayErrors(): \n' + this.user);


    console.log("this.Errors.invalidPassword.status ||this.Errors.invalidUsername.status = ",
      (this.Errors.invalidPassword.status || this.Errors.invalidUsername.status));
    if (
      this.Errors.invalidPassword.status ||
      this.Errors.invalidUsername.status
      // || this.Errors.notAUser
      // || this.Errors.incorrectPassword
    )
      return true;
    else return false;
  }

  notAUser(): Boolean {  //keeper
    // var isAUser: Boolean = false;
    // if (this.usersInfoListFromDB != null) {
    //   for (var i = 0; i < Object.keys(this.usersInfoListFromDB).length; i++) {
    //     if (this.user.Username == this.usersInfoListFromDB[i].Username) {
    //       isAUser = true;
    //       return isAUser;
    //     }
    //   }
    //   return isAUser; //returned isUser = false, because no match was found in the list.
    // } else return false;
    return false;
  }



  //////=========================================
  ////CORRECT CODE ABOVE THIS POINT
  //////=========================================












  // usder: Usersmodel = {
  //   FirstNameOfUser: null,
  //   HECIDofUniversity: null,
  //   LastNameOfUser: null,
  //   Password: '',
  //   RegistrationNumberOfUser: null,
  //   TitleOfUniversity: null,
  //   UniversityNameOfUser: null,
  //   UserType: null,
  //   _id: null,
  //   Username: '',
  // };

  // usersInfoListFromDB: any = {}; //downloaded list of all users

  //assigns value of inputs when they change from earlier after focus outs but here The Event being handled is onChange()
  // assignInputs(form: NgForm) {
  //   //both inputs to local variables

  //   this.user.Username = form.value.UsersEnteredUsername;
  //   this.user.Password = form.value.UsersEnteredPassword;

  //   // console.log('AFTER ASSIGNING:');
  //   // console.log(this.user);
  // }










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
      //   this.usersService.loginAdmin(form.value.UsersEnteredPassword);
    //   return;
    // }

    //following code will be executed if username is not entered as Admin.














    //following is returning null
    var TheMatchedUser: Usersmodel = this.usersService.FecthTheMatchingUserForLogin(
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




}//end of .ts class






