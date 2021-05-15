import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

@Component({
  selector: 'app-manage-universities',
  templateUrl: './manage-universities.component.html',
  styleUrls: ['./manage-universities.component.css']
})
export class ManageUniversitiesComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.extractAffiliatedUniversitiesData();
    }, 700);
    this.setALLErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
  }


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
  // //////////////////////////////////////////\///

  EditButtonToggled = false;
  EditButtonText = "Edit";
  private AllUsersRecievedFromDB: Usersmodel[] = [];
  AffiliatedUniversitiesData: Usersmodel[] = [];
  localStorageUsername = localStorage.getItem("UsersUsername");
  TerminateAccessButtonText = '';


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS ABOVE
  // //////////////////////////////////////////\///


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  CORRECT CODE BELOW
  // //////////////////////////////////////////\///



  // //////////////////////////////////////////\///////////////////////////\///
  //    BELOW is     (( ManageUniversities --> AffiliatedUniversities --> Edit ))
  // //////////////////////////////////////////\///////////////////////////\///



  extractAffiliatedUniversitiesData() {
    if (this.AffiliatedUniversitiesData.length == 0) {
      for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
        if (this.AllUsersRecievedFromDB[i].UserType == 'university'
          &&
          (this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Allowed'
            || this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Terminated')
        ) {
          this.AffiliatedUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
        }
      }
    }

  }


  TerminateAccessButtonToggled(accessStatus: string) {

    // console.log('accessStatus  : ',accessStatus);
    if (accessStatus == 'Terminated') {
      this.TerminateAccessButtonText = "Allow Access";
    } else {
      this.TerminateAccessButtonText = "Terminate Access";
    }

  }
  onEditButtonToggle() {
    if (this.EditButtonToggled == false) {
      this.EditButtonText = "Hide Editing";
      this.EditButtonToggled = true;
    } else {
      this.EditButtonText = "Edit";
      this.EditButtonToggled = false;
    }

  }

  onSubmit_UpdateButton(updateUniForm: NgForm, OriginalUniDetails: Usersmodel) {
    if (updateUniForm.value.UniTitle == ''
      && updateUniForm.value.UniHECID == ''
      && updateUniForm.value.UniUsername == ''
      && updateUniForm.value.UniPassword == ''
    ) {
      alert('You can\'t update empty fields');
      return;
    }

    if (updateUniForm.value.UniTitle == OriginalUniDetails.TitleOfUniversity
      && updateUniForm.value.UniHECID == OriginalUniDetails.HECIDofUniversity
      && updateUniForm.value.UniUsername == OriginalUniDetails.Username
      && updateUniForm.value.UniPassword == OriginalUniDetails.Password
    ) {
      alert('You haven\'t changed any field, same values cannot be updated');
      return;
    }

    var UpdatedUniTitle = '';
    var UpdatedUniHECID = '';
    var UpdatedUniUsername = '';
    var UpdatedUniPassword = '';

    if (updateUniForm.value.UniTitle == '') {
      UpdatedUniTitle = OriginalUniDetails.TitleOfUniversity;
    }
    else {
      UpdatedUniTitle = updateUniForm.value.UniTitle;
    }


    if (updateUniForm.value.UniHECID == '') {
      UpdatedUniHECID = OriginalUniDetails.HECIDofUniversity;
    } else {
      UpdatedUniHECID = updateUniForm.value.UniHECID;
    }

    if (updateUniForm.value.UniUsername == '') {
      UpdatedUniUsername = OriginalUniDetails.Username;
    } else {
      UpdatedUniUsername = updateUniForm.value.UniUsername;
    }

    if (updateUniForm.value.UniPassword == '') {
      UpdatedUniPassword = OriginalUniDetails.Password;
    } else {
      UpdatedUniPassword = updateUniForm.value.UniPassword;
    }



    const UpdatedUniAsAUser: Usersmodel = {
      FirstNameOfUser: OriginalUniDetails.FirstNameOfUser,
      HECIDofUniversity: UpdatedUniHECID,
      LastNameOfUser: OriginalUniDetails.LastNameOfUser,
      Password: UpdatedUniPassword,
      RegistrationNumberOfUser: OriginalUniDetails.RegistrationNumberOfUser,
      TitleOfUniversity: UpdatedUniTitle,
      UniversityNameOfUser: OriginalUniDetails.UniversityNameOfUser,
      UserType: OriginalUniDetails.UserType,
      Username: UpdatedUniUsername,
      UserzAccessStatus: OriginalUniDetails.UserzAccessStatus,
      _id: OriginalUniDetails._id
    }


    // console.log('UpdatedUniAsAUser\n', UpdatedUniAsAUser);
    if (this.areThereAnyErrors()) {
      this.Errors.formHasErrors.status = true;
      this.Errors.profileUpdated.status = false;
      return;
    } else {
      this.Errors.formHasErrors.status = false;
      if (confirm('Are you sure you want to update these values?')) {
        this.usersService.updateThisUser(UpdatedUniAsAUser);
        this.Errors.profileUpdated.status = true;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        return;
      }
    }


  }

  areThereAnyErrors(): boolean {

    return (
      this.Errors.invalidHECID.status ||
      this.Errors.invalidPassword.status ||
      this.Errors.invalidTitle.status ||
      this.Errors.invalidUsername.status ||
      this.Errors.usernameNotUnique.status
    );
  }
  // //////////////////////////////////////////\///////////////////////////\///
  //    ABOVE is     (( ManageUniversities --> AffiliatedUniversities --> Edit ))
  // //////////////////////////////////////////\///////////////////////////\///



  onLogout() {
    localStorage.clear();
    window.location.href = "/";
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
        this.usersService.createUser(UniUniAsAUser);
        this.Errors.profileCreated.status = true;
      } else {
        return;
      }
    }

  }


  checkUsernameIfUNIQUEorINVALID(registerUniForm: NgForm): boolean {
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
            return true;
          } else {
            this.Errors.usernameNotUnique.status = false;
            return false;
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
