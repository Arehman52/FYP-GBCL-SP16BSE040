import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomepageService } from 'src/app/gbcl-homepage/homepage.service';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

@Component({
  selector: 'app-manage-universities',
  templateUrl: './manage-universities.component.html',
  styleUrls: ['./manage-universities.component.css']
})
export class ManageUniversitiesComponent implements OnInit {

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.setALLErrorsToFalse();
    this.AllUsersRecievedFromDB = this.homepageService.RecieveAllUsersFromDB();
  }


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
  // //////////////////////////////////////////\///

  EditButtonToggled = false;
  EditButtonText = "Edit";
  private AllUsersRecievedFromDB: Usersmodel[] = [];
  localStorageUsername = localStorage.getItem("UsersUsername");

  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS ABOVE
  // //////////////////////////////////////////\///


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  CORRECT CODE BELOW
  // //////////////////////////////////////////\///



  // //////////////////////////////////////////\///////////////////////////\///
  //    BELOW is     (( ManageUniversities --> AffiliatedUniversities --> Edit ))
  // //////////////////////////////////////////\///////////////////////////\///

  onEditButtonToggle() {

    if (this.EditButtonToggled == false) {
      this.EditButtonText = "Hide Editing";
      this.EditButtonToggled = true;
    } else {
      this.EditButtonText = "Edit";
      this.EditButtonToggled = false;
    }

  }

  onSubmit_UpdateButton(updateUniForm: NgForm) {
    var txt = '';
    if (confirm("Are you sure you want to update these values for this University?")) {
      txt = "You pressed OK!";
    } else {
      txt = "You pressed Cancel!";
      return;
    }
    alert(txt);
  }

  // //////////////////////////////////////////\///////////////////////////\///
  //    ABOVE is     (( ManageUniversities --> AffiliatedUniversities --> Edit ))
  // //////////////////////////////////////////\///////////////////////////\///



onLogout(){
  localStorage.clear();
  window.location.href="/";
}

  // //////////////////////////////////////////\///////////////////////////\///
  //    BELOW is     (( ManageUniversities --> Register a Unniversity ))
  // //////////////////////////////////////////\///////////////////////////\///

  onSubmit_RegisterButton(registerUniForm: NgForm) {
    if (this.checkIfErrors()) {
      this.Errors.formHasErrors.status = true;
      this.Errors.profileCreated.status = false;
      return;
    } else {

      this.Errors.formHasErrors.status = false;

      if (confirm("Are you sure you want to Register this University\'s profile with these values?")) {
        const UniUniAsAUser: Usersmodel = {
          FirstNameOfUser: null,
          HECIDofUniversity: registerUniForm.value.UniHECID,
          LastNameOfUser: null,
          Password: registerUniForm.value.UniPassword,
          UserzAccessStatus: 'Allowed',
          RegistrationNumberOfUser: null,
          _id: null,
          Username: registerUniForm.value.UniUsername,
          UserType: 'university',
          UniversityNameOfUser: null,
          TitleOfUniversity: registerUniForm.value.UniTitle
        }
        this.homepageService.createUser(UniUniAsAUser);
        this.Errors.profileCreated.status = true;
      } else {
        return;
      }
    }

  }


  checkUsernameOfUniversity(registerUniForm: NgForm) {
    registerUniForm.value.UniUsername.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    // check uniqieness below
    var userEnteredUN = '';
    if (registerUniForm.value.UniUsername != null) {
      userEnteredUN = registerUniForm.value.UniUsername;
      if (this.AllUsersRecievedFromDB != null) {
        for (var i = 0; i < Object.keys(this.AllUsersRecievedFromDB).length; i++) {
          var quotedUserEnteredUN = '"' + userEnteredUN + '"';
          var IteratedUNinForLoop: string = JSON.stringify(
            this.AllUsersRecievedFromDB[i].Username
          );
          if (IteratedUNinForLoop.toLowerCase() == quotedUserEnteredUN.toLowerCase()) {
            this.Errors.usernameNotUnique.status = true;
            console.log('user was matched');
            return;
          } else {
            this.Errors.usernameNotUnique.status = false;
          }
        }
      }
    }

  }

  checkPasswordForRegisterUniversity(registerUniForm: NgForm) {
    registerUniForm.value.UniPassword.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
  }

  checkHECIDForRegisterUniversity(registerUniForm: NgForm) {
    registerUniForm.value.UniHECID.length < 3
      ? (this.Errors.invalidHECID.status = true)
      : (this.Errors.invalidHECID.status = false);
  }
  checkTitleForRegisterUniversity(registerUniForm: NgForm) {
    registerUniForm.value.UniTitle.length < 2
      ? (this.Errors.invalidTitle.status = true)
      : (this.Errors.invalidTitle.status = false);
  }
  setALLErrorsToFalse() {
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.usernameNotUnique.status = false;
    this.Errors.formHasErrors.status = false;
    this.Errors.invalidHECID.status = false;
    this.Errors.invalidTitle.status = false;
    this.Errors.profileCreated.status = false;
    this.Errors.profileUpdated.status = false;
  }

  checkIfErrors(): boolean {
    if (
      this.Errors.invalidHECID.status ||
      this.Errors.invalidTitle.status ||
      this.Errors.invalidPassword.status ||
      this.Errors.invalidUsername.status ||
      this.Errors.usernameNotUnique.status
    )
      return true;
    else return false;
  }
  // //////////////////////////////////////////\///////////////////////////\///
  //    ABOVE is     (( ManageUniversities --> Register a Unniversity ))
  // //////////////////////////////////////////\///////////////////////////\///




  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  CORRECT CODE ABOVE
  // //////////////////////////////////////////\///








  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  FAKE INITIALIZATIONS BELOW
  // //////////////////////////////////////////\///


  Unis = [
    { uniTitle: 'CUI Isb', id: 'ab', status: 'allowed' },
    { uniTitle: 'CUI Lhr', id: 'bc', status: 'allowed' },
    { uniTitle: 'CUI Wah', id: 'cd', status: 'allowed' },
    { uniTitle: 'CUI Vehari', id: 'de', status: 'allowed' },
    { uniTitle: 'CUI Taxila', id: 'ef', status: 'allowed' }
  ];




  Errors = {
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters).',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters).',
    },
    invalidHECID: {
      status: true,
      message: 'HECID should be atleast 3 characters).',
    },
    invalidTitle: {
      status: true,
      message: 'Title should be atleast 2 characters).',
    },
    usernameNotUnique: {
      status: true,
      message: 'This username has already been taken. kindly enter some other.',
    },
    formHasErrors: {
      status: true,
      message: 'Form has errors, kindly resolve them first.',
    },
    profileUpdated: {
      status: true,
      message:
        'University\'s Profile updated successfully.',
    },
    profileCreated: {
      status: true,
      message:
        'Profile created successfully.\nMember can Login now.',
    }
  };

  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  FAKE INITIALIZATIONS ABOVE
  // //////////////////////////////////////////\///


}
