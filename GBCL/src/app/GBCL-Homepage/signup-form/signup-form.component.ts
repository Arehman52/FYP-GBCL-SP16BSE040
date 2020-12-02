import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { Usersmodel } from '../usersmodel.model';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {

  constructor(public homepageService: HomepageService) {}

  ngOnInit() {
    // this.user.UniversityIDOfUser = 'zeroindexuniselect';
    this.setALLErrorsToFalse();
    this.user.UniversityNameOfUser = 'NotListedHere';
  }



  // UniS:HTMLSelectElement = null;


  user = {
    UserType: '',
    // attribs of UserType = Student/Teacher
    FirstName: '',
    LastName: '',
    UniversityNameOfUser: 'NotListedHere',
    // UniversityIDOfUser: null,
    RegistrationNumberInUni: '',
    // attribs of UserType = University
    TheUniversityName: '',
    HECIDforTheUniversity: '',
    //common attribs
    Username: '',
    Password: '',
  };

  Errors = {
    //below errors are for fields in common.
    "invalidUsername": {"status":true, "message": "Username should be atleast 5 characters)."},
    "invalidPassword": {"status":true, "message": "Password should be atleast 8 characters)."},
    //below are for fields of non UNIVERSITY users.
    "invalidFName": {"status":true, "message": "First Name should be atleast 3 characters)."},
    "invalidLName": {"status":true, "message": "Last Name should be atleast 3 characters)."},
    "invalidRegistrationNumber": {"status":true, "message": "Registration Number should be minimum of 4 characters)."},
    // "UniversityNotListed": {"status":true, "message": "You have to select a university."},
    //below are fields for UNIVERSITY.
    "invalidNameOfTheUNIVERSITY": {"status":true, "message": "University name can't be less than 2 characters."},
    "invalidHECID": {"status":true, "message": "You can't enter a HEC ID with less than 3 characters."}
  }



  UniversitiesListFromDB = [
    {
      // uniID: 'NotListedHere',
      uniName: 'Not Listed!'
    },
    {
      // uniID: 'u001',
      uniName: 'COMSATS University Islamabad'
    },
    {
      // uniID: 'u002',
      uniName: 'IIUI Islamabad'
    },
    {
      // uniID: 'u003',
      uniName: 'FAST NUCES Islamabad'
    }
  ];



  onSignUpClicked(form: NgForm)
  {
    //assign remaining inputs to user
    this.assignRemainingInputs(form, this.user.UserType);
    //returns true id no errors found.
    if (this.checknDisplayErrors(form, this.user.UserType))
    {
      //checkErrors here and set their statuses to true

      alert('Form not submitted due to errors!');
      console.log('Form not submitted due to errors!');
      console.log(this.user);
      return;
    }
    else
    {
      //call the service method here and update the fields in Database

      console.log(this.user);
      alert("Form has no errors now. and is about to be sent to server.");
      // const user = {
      //   EmailAddress: form.value.EnteredEmaildsadasasdsad,
      //   Password: form.value.EnteredPasswordcdsdslvnlsdj,
      // };
      // this.homepageService.createUser(user.EmailAddress, user.Password);    //<--- this method should update user to DB
    }
  }

  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================


  getTheUser()
  {
    this.homepageService.getUser();
  }

  //==================
  //==================
  //==================
  //==================
  //==================

  //following method is called when usertype selection is changed,
  onUsersSelectChange(opt: HTMLSelectElement) {
    // this.UsertypS = opt;
    if (opt.value == 'teacher') {
      this.user.UserType = 'teacher';
      this.setAllFieldsToNull();
      this.setAllErrorsToTrueForUser('non-uni');
      console.log(this.user.UserType);
      // console.log(this.user);
    } else if (opt.value == 'student') {
      this.user.UserType = 'student';
      this.setAllFieldsToNull();
      this.setAllErrorsToTrueForUser('non-uni');
      console.log(this.user.UserType);
      // console.log(this.user);
    } else if (opt.value == 'university') {
      this.user.UserType = 'university';
      this.setAllFieldsToNull();
      this.setAllErrorsToTrueForUser('uni');
      console.log(this.user.UserType);
      // console.log(this.user);
    } else {
      alert('something fishy');
    }
  }


  onUniversitiesSelectChange(optUni: HTMLSelectElement){


    this.user.UniversityNameOfUser = optUni.value;
    console.log(this.user);



    // this.UniS = optUni;
      // // this.user.UniversityNameOfUser = optUni.value;
      // for(let i = 0; i<this.UniversitiesListFromDB.length; i++){
      //   if(this.UniversitiesListFromDB[i].uniName==optUni.value){
      //     this.user.UniversityNameOfUser =  this.UniversitiesListFromDB[i].uniName;    ///UNIVERITY OF user ASSIGNED.
      //     // alert("Uni: "+optUni.value+" has been set to user object");
      //     console.log(this.user);
      //     return;
      //   }
      // }
      // this.user.UniversityNameOfUser = this.UniversitiesListFromDB.uniID]
    // }
  }

  //================================================================ utility Functions
  //===================================================================================


  setAllFieldsToNull(){
      this.user.HECIDforTheUniversity = null;
      this.user.TheUniversityName = null;
      this.user.FirstName = null;
      this.user.LastName = null;
      this.user.RegistrationNumberInUni = null;
      this.user.UniversityNameOfUser = null;
    this.user.Username =  null;
    this.user.Password =  null;
    // this.user = null;
    console.log("nulled user below:");
    console.log(this.user);
  }





  setAllErrorsToTrueForUser(user: string) {
    if (user == 'uni') {
      // this.Errors.UniversityNotSelected.status = false;
      // this.Errors.invalidFName.status = false;
      // this.Errors.invalidLName.status = false;
      this.Errors.invalidHECID.status = true;
      this.Errors.invalidNameOfTheUNIVERSITY.status = true;
      // this.Errors.universityNotListed.status = false;
      // this.Errors.invalidRegistrationNumber.status = false;
      }else
    if (user == 'non-uni') {
      // this.Errors.UniversityNotSelected.status = true;
      this.Errors.invalidFName.status = true;
      this.Errors.invalidLName.status = true;
      this.Errors.invalidRegistrationNumber.status = true;
    }else
    {
      alert("see signup-form.compo.ts file in setAllErrorsToTrueForUser()");
    }
    this.Errors.invalidPassword.status = true;
    this.Errors.invalidUsername.status = true;
  }

  //====================================


  assignRemainingInputs(form: NgForm, user: string){

    if(user == "teacher" || user == "student"){
      this.user.FirstName = form.value.UsersEnteredFName;
      this.user.LastName = form.value.UsersEnteredLName;
      this.user.RegistrationNumberInUni = form.value.UsersEnteredRegistrationNumber;

    }else{
      this.user.HECIDforTheUniversity = form.value.UniversitysEnteredHECID;
      this.user.TheUniversityName = form.value.UniversitysEnteredName;
    }
    this.user.Username = form.value.UsersEnteredUsername;
    this.user.Password = form.value.UsersEnteredPassword;
    this.user.UniversityNameOfUser = form.value.UniversitiesSelection; //assign uni selection's value
    console.log("User below after assignRemInps() executiion");
    console.log(this.user);
    console.log("and form below after  assignRemInps() executiion");
    console.log(form);

    console.log("\n\nassignRemainingInputs() executed successfully.");
  }



  //this fuction only sets active error's statuses to true
  checknDisplayErrors(form: NgForm, user: string): Boolean {
    if(user!='university'){
      this.user.FirstName.length<3 ? this.Errors.invalidFName.status = true : this.Errors.invalidFName.status = false;
      this.user.LastName.length<3 ? this.Errors.invalidLName.status = true : this.Errors.invalidLName.status = false;
      this.user.RegistrationNumberInUni.length<4 ? this.Errors.invalidRegistrationNumber.status = true : this.Errors.invalidRegistrationNumber.status = false;
    }else{
      this.user.HECIDforTheUniversity.length<3 ? this.Errors.invalidHECID.status = true : this.Errors.invalidHECID.status = false;
      this.user.TheUniversityName.length<2 ? this.Errors.invalidNameOfTheUNIVERSITY.status = true : this.Errors.invalidNameOfTheUNIVERSITY.status = false;
    }

    this.user.Password.length<8 ? this.Errors.invalidPassword.status = true : this.Errors.invalidPassword.status = false;
    this.user.Username.length<5 ? this.Errors.invalidUsername.status = true : this.Errors.invalidUsername.status = false;
    console.log("inside cheknDispErrz");
    // console.log(this.Errors);
    // console.log(this.user);

    if(this.Errors.invalidFName.status || this.Errors.invalidLName.status
    || this.Errors.invalidPassword.status || this.Errors.invalidRegistrationNumber.status
    || this.Errors.invalidUsername.status)
    return true;
    else
    return false;

  }
  // checkErrorss(form: NgForm){
  //   //check values against the fields
  //   //if invalid value then set related error's status to true else false.

  // }

  //=====================================

  //folowing is called in onInit()
  setALLErrorsToFalse() {
    // this.Errors.UniversityNotSelected.status = false;
    this.Errors.invalidFName.status = false;
    this.Errors.invalidLName.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.invalidRegistrationNumber.status = false;
    this.Errors.invalidHECID.status = false;
    this.Errors.invalidNameOfTheUNIVERSITY.status = false;
    // this.Errors.UniversityNotSelected.status = false;
  }
}
