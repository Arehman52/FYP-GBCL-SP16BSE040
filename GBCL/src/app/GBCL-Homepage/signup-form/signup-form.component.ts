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
    this.user.UniversityIDOfUser = 'NotListedHere';
  }

  //===========================================variables
  //====================================================
  // usertype = 'nill';
  private UsertypS:HTMLSelectElement;
  private univS:HTMLSelectElement;

  //===========================================user obj
  //===================================================
  user = {
    UserType: '',
    // attribs of UserType = Student/Teacher
    FirstName: '',
    LastName: '',
    UniversityNameOfUser: 'na',
    UniversityIDOfUser: 'NotListedHere',
    RegistrationNumberInUni: '',
    // attribs of UserType = University
    TheUniversityName: '',
    HECIDforTheUniversity: '',
    //common attribs
    Username: '',
    Password: '',
  };

  //=============================================initiallizations below
  //====================================================================

  Errors = {
    //below are fields in common.
    "invalidUsername": {"status":true, "message": "Enter a valid Username (atleast 5 characters)."},
    "invalidPassword": {"status":true, "message": "Enter a valid Password (atleast 8 characters)."},
    //below are fields for non UNIVERSITY users.
    "invalidFName": {"status":true, "message": "Enter a valid First Name (atleast 3 characters)."},
    "invalidLName": {"status":true, "message": "Enter a valid Last Name (atleast 3 characters)."},
    "invalidRegistrationNumber": {"status":true, "message": "You have entered an invalid Registration Number (min 4 characters)."},
    // "UniversityNotListed": {"status":true, "message": "You have to select a university."},
    //below are fields for UNIVERSITY.
    "invalidNameOfTheUNIVERSITY": {"status":true, "message": "University name can't be less than 2 characters."},
    "invalidHECID": {"status":true, "message": "You can't enter a HEC ID with less than 3 characters."}
  }




  UniversitiesListFromDB = [
    {
      uniID: 'NotListedHere',
      uniName: 'Not Listed!',
    },
    {
      uniID: 'u001',
      uniName: 'COMSATS University Islamabad',
    },
    {
      uniID: 'u002',
      uniName: 'IIUI Islamabad',
    },
    {
      uniID: 'u003',
      uniName: 'FAST NUCES Islamabad',
    },
  ];

  //================================================= Functionalities below
  //========================================================================

  onSignUpClicked(form: NgForm)
  {
    //assign remaining inputs to user
    this.assignRemainingInputs(form);
    alert(Object.keys(this.Errors).length);
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
    this.UsertypS = opt;
    if (opt.value == 'teacher') {
      this.user.UserType = 'teacher';
      this.setAllFieldsToEmptyForUser('uni');
      this.setAllErrorsToTrueForUser('non-uni');
      console.log('teacher');
      console.log(this.user);
    } else if (opt.value == 'student') {
      this.user.UserType = 'student';
      this.setAllFieldsToEmptyForUser('uni');
      this.setAllErrorsToTrueForUser('non-uni');
      console.log(this.user.UserType);
      console.log(this.user);
    } else if (opt.value == 'university') {
      this.user.UserType = 'university';
      this.setAllFieldsToEmptyForUser('non-uni');
      this.setAllErrorsToTrueForUser('uni');
      console.log(this.user.UserType);
      console.log(this.user);
    } else {
      alert('something fishy');
    }
  }


  onUniversitiesSelectChange(optUni: HTMLSelectElement){
    this.univS = optUni;

    // if(optUni.value == 'NotListedHere') alert("Your University isn't Registered with GBCL!");
    // else
    // {
      this.user.UniversityIDOfUser = optUni.value;
      for(let i = 0; i<this.UniversitiesListFromDB.length; i++){
        if(this.UniversitiesListFromDB[i].uniID==optUni.value){
          this.user.UniversityNameOfUser =  this.UniversitiesListFromDB[i].uniName;    ///UNIVERITY OF user ASSIGNED.
          // alert("Uni: "+optUni.value+" has been set to user object");
          console.log(this.user);
          return;
        }
      }
      // this.user.UniversityNameOfUser = this.UniversitiesListFromDB.uniID]
    // }
  }

  //================================================================ utility Functions
  //===================================================================================


  setAllFieldsToEmptyForUser(user: string){
    if(user == "uni"){
      this.user.HECIDforTheUniversity = '';
      this.user.TheUniversityName = '';
    }
    else
    if(user == "non-uni"){
      this.user.FirstName = '';
      this.user.LastName = '';
      this.user.RegistrationNumberInUni = '';
      this.user.UniversityNameOfUser = '';
      this.user.UniversityIDOfUser = '';
    }
  }





  setAllErrorsToTrueForUser(user: string) {
    if (user == 'uni') {
      // this.Errors.UniversityNotSelected.status = false;
      this.Errors.invalidFName.status = false;
      this.Errors.invalidLName.status = false;
      this.Errors.invalidPassword.status = true;
      this.Errors.invalidUsername.status = true;
      // this.Errors.universityNotListed.status = false;
      this.Errors.invalidRegistrationNumber.status = false;
      }else
    if (user == 'non-uni') {
      // this.Errors.UniversityNotSelected.status = true;
      this.Errors.invalidFName.status = true;
      this.Errors.invalidLName.status = true;
      this.Errors.invalidPassword.status = true;
      this.Errors.invalidUsername.status = true;
      // this.Errors.universityNotListed.status = true;
      this.Errors.invalidRegistrationNumber.status = true;
    }else
    {
      alert("see signup-form.compo.ts file in setAllErrorsToTrueForUser()");
    }
  }

  //====================================


  assignRemainingInputs(form: NgForm){

    this.user.Username = form.value.UsersEnteredUsername;
    this.user.Password = form.value.UsersEnteredPassword;
    this.user.FirstName = form.value.UsersEnteredFName;
    this.user.LastName = form.value.UsersEnteredLName;
    this.user.RegistrationNumberInUni = form.value.UsersEnteredRegistrationNumber;
    console.log("assignRemainingInputs() executed successfully.");
  }



  //this fuction only sets active error's statuses to true
  checknDisplayErrors(form: NgForm, user: string): Boolean {
    this.user.FirstName.length<3 ? this.Errors.invalidFName.status = true : this.Errors.invalidFName.status = false;
    this.user.LastName.length<3 ? this.Errors.invalidLName.status = true : this.Errors.invalidLName.status = false;
    this.user.Password.length<8 ? this.Errors.invalidPassword.status = true : this.Errors.invalidPassword.status = false;
    this.user.Username.length<5 ? this.Errors.invalidUsername.status = true : this.Errors.invalidUsername.status = false;
    this.user.RegistrationNumberInUni.length<4 ? this.Errors.invalidRegistrationNumber.status = true : this.Errors.invalidRegistrationNumber.status = false;


    console.log("inside cheknDispErrz");
    console.log(this.Errors);
    console.log(this.user);


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
    // this.Errors.UniversityNotSelected.status = false;
  }
}
