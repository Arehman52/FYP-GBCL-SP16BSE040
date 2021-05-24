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
      this.extractAffiliatedAndRejectedUniversitiesData();
    }, 700);
    this.setALLErrorsToFalse();
    this.AllUsersRecievedFromDB = this.usersService.RecieveAllUsersFromDB();
  }


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
  // //////////////////////////////////////////\///

  EditButtonToggled = false;
  EditButtonText = "Edit";
  RejectedUniEditButtonToggled = false;
  RejectedUniEditButtonText = "Edit";
  RejectedUniversitiesData: Usersmodel[] = [];
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



  extractAffiliatedAndRejectedUniversitiesData() {
    if (this.AffiliatedUniversitiesData.length == 0) {
      for (var i = 0; i < this.AllUsersRecievedFromDB.length; i++) {
        if (this.AllUsersRecievedFromDB[i].UserType == 'university'
          &&
          (this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Allowed'
            || this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Terminated')
        ) {
          this.AffiliatedUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
        }
        if (this.AllUsersRecievedFromDB[i].UserType == 'university'
          && this.AllUsersRecievedFromDB[i].UserzAccessStatus == 'Rejected'

        ) {
          this.RejectedUniversitiesData.push(this.AllUsersRecievedFromDB[i]);
        }
      }
    }

  }



  TerminateAccessButtonToggle(AccessStatus: string) {
    if (AccessStatus == 'Terminated') {
      this.TerminateAccessButtonText = "Allow Access";
    } else {
      this.TerminateAccessButtonText = "Terminate Access";
    }
  }

  TerminateAccessButtonClicked(Uni: Usersmodel) {
    if (Uni.UserzAccessStatus == 'Terminated') {
      if (confirm('Are you sure you want to allow access to university : ' + Uni.TitleOfUniversity)) {
        const terminatedUni: Usersmodel = { ...Uni };
        terminatedUni.UserzAccessStatus = 'Allowed';
        this.usersService.updateThisUser(terminatedUni, Uni._id);
        this.Errors.accessTerminated.status = false;
        this.Errors.accessAllowed.status = true;
        setTimeout(() => { window.location.reload() }, 2500);
      } else {
        return;
      }
    } else {
      if (confirm('Are you sure you want to terminate access of university : ' + Uni.TitleOfUniversity)) {
        const terminatedUni: Usersmodel = { ...Uni };
        terminatedUni.UserzAccessStatus = 'Terminated';
        this.usersService.updateThisUser(terminatedUni, Uni._id);
        this.Errors.accessAllowed.status = false;
        this.Errors.accessTerminated.status = true;
        setTimeout(() => { window.location.reload() }, 2500);
      } else {
        return;
      }
    }

  }
  RejectedUniAllowAccessButtonClicked(Uni: Usersmodel) {
    if (Uni.UserzAccessStatus == 'Rejected') {
      if (confirm('Are you sure you want to allow access to university : ' + Uni.TitleOfUniversity)) {
        const terminatedUni: Usersmodel = { ...Uni };
        terminatedUni.UserzAccessStatus = 'Allowed';
        this.usersService.updateThisUser(terminatedUni, Uni._id);
        this.Errors.accessTerminated.status = false;
        this.Errors.accessAllowed.status = true;
        setTimeout(() => { window.location.reload() }, 2500);
      } else {
        return;
      }
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
  onRejectedUniEditButtonToggle() {
    if (this.RejectedUniEditButtonToggled == false) {
      this.RejectedUniEditButtonText = "Hide Editing";
      this.RejectedUniEditButtonToggled = true;
    } else {
      this.RejectedUniEditButtonText = "Edit";
      this.RejectedUniEditButtonToggled = false;
    }
  }



  DeleteThisUser(uni: Usersmodel) {
    if (confirm("Are you sure you want to delete " + uni.TitleOfUniversity + " University")) {
      this.usersService.deleteThisUser(uni._id);
      this.Errors.userDeleted.status = true;
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } else {
      return;
    }
  }





  onSubmit_UpdateButton(updateUniForm: NgForm, OriginalUniDetails: Usersmodel) {

    const str: String = updateUniForm.value.UniUsername;
    if (str != str.replace(/ /g, '')) {
      this.Errors.spacesAreNotAllowedInUsername.status = true;
      return;
    }

    if (updateUniForm.value.UniTitle == ''
      && updateUniForm.value.UniHECID == ''
      && updateUniForm.value.UniUsername == ''
      && updateUniForm.value.UniPassword == ''
    ) {
      alert('You can\'t update empty fields');
      return;
    }

    if (updateUniForm.value.UniTitle.toLowerCase() == OriginalUniDetails.TitleOfUniversity.toLowerCase()
      && updateUniForm.value.UniHECID == OriginalUniDetails.HECIDofUniversity
      && updateUniForm.value.UniUsername.toLowerCase() == OriginalUniDetails.Username.toLowerCase()
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
      UpdatedUniUsername = OriginalUniDetails.Username.toLocaleLowerCase();
    } else {
      UpdatedUniUsername = updateUniForm.value.UniUsername.toLocaleLowerCase();
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
      LabJoinCodesOfJoinedLabs: OriginalUniDetails.LabJoinCodesOfJoinedLabs,
      LabJoinCodesOfAppliedLabs: OriginalUniDetails.LabJoinCodesOfAppliedLabs,
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
      if (OriginalUniDetails.UserzAccessStatus == 'Rejected') {
        if (confirm('Are you sure you want to update these values?\nThis will only update the fields,\nIt ' +
          'won\'t allow access to this university unless Allow Access Button clicked.')) {
          // console.log(OriginalUniDetails._id);
          // console.log(OriginalUniDetails.Username);
          this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

          setTimeout(() => {
            this.usersService.updateThisUser(UpdatedUniAsAUser, OriginalUniDetails._id);
          }, 750);
          this.Errors.profileUpdated.status = true;
          updateUniForm.resetForm();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3500);
        } else {
          return;
        }
      } else {
        if (confirm('Are you sure you want to update these values?')) {
          // console.log(OriginalUniDetails._id);
          // console.log(OriginalUniDetails.Username);
          this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

          setTimeout(() => {
            this.usersService.updateThisUser(UpdatedUniAsAUser, OriginalUniDetails._id);
          }, 750);
          this.Errors.profileUpdated.status = true;
          updateUniForm.resetForm();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3500);
        } else {
          return;
        }
      }

    }


  }

  areThereAnyErrors(): boolean {

    return (
      this.Errors.invalidHECID.status ||
      this.Errors.invalidPassword.status ||
      this.Errors.invalidTitle.status ||
      this.Errors.invalidUsername.status ||
      this.Errors.uniTitleNotUnique.status ||
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


    //Warns any field is left empty before submission,
    if (registerUniForm.value.UniTitle == ''
      || registerUniForm.value.UniHECID == ''
      || registerUniForm.value.UniUsername == ''
      || registerUniForm.value.UniPassword == ''
    ) {
      alert('You must fill in all fields');
      return;
    }




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
          LabJoinCodesOfJoinedLabs: null,
          LabJoinCodesOfAppliedLabs: null,
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


    registerUniForm.resetForm();
    setTimeout(() => { window.location.reload() }, 3500);

  }


  // checkUsernameIfUNIQUEorINVALIDforRegisterUniForm0(registerUniForm: NgForm){


  //   const str: String = registerUniForm.value.UniUsername;
  //   if(str != str.replace(/ /g,'')){
  //     this.Errors.spacesAreNotAllowedInUsername.status = true;
  //     // return;
  //   }else{
  //     this.Errors.spacesAreNotAllowedInUsername.status = false;
  //   }


  //   registerUniForm.value.UniUsername.length < 5
  //     ? (this.Errors.invalidUsername.status = true)
  //     : (this.Errors.invalidUsername.status = false);
  //   // check uniqieness below
  //   var userEnteredUN = '';
  //   if (registerUniForm.value.UniUsername != null) {
  //     userEnteredUN = registerUniForm.value.UniUsername;
  //     if (this.AllUsersRecievedFromDB != null) {
  //       for (var i = 0; i < Object.keys(this.AllUsersRecievedFromDB).length; i++) {
  //         var quotedUserEnteredUN = '"' + userEnteredUN + '"';
  //         var IteratedUNinForLoop: string = JSON.stringify(
  //           this.AllUsersRecievedFromDB[i].Username
  //         );
  //         console.log("IteratedUNinForLoop.toLowerCase() ",IteratedUNinForLoop.toLowerCase());
  //         console.log("quotedUserEnteredUN.toLowerCase() ",quotedUserEnteredUN.toLowerCase());
  //         if (IteratedUNinForLoop.toLowerCase() == quotedUserEnteredUN.toLowerCase()) {
  //           console.log('user was matched');
  //           this.Errors.usernameNotUnique.status = true;
  //           return true;
  //         } else {
  //           this.Errors.usernameNotUnique.status = false;
  //           // return false;
  //         }
  //       }
  //     }
  //   }

  // }
  checkUsernameIfUNIQUEorINVALIDinUniForm(updateUniForm: NgForm, originalUsername: string): boolean {

    //this method isdifferent than checkUsernameIfUNIQUEorINVALIDupdateUniForm()
    //difference is where user matches
    const str: String = updateUniForm.value.UniUsername;
    if (str != str.replace(/ /g, '')) {
      this.Errors.spacesAreNotAllowedInUsername.status = true;
      // return;
    } else {
      this.Errors.spacesAreNotAllowedInUsername.status = false;
    }


    updateUniForm.value.UniUsername.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);
    // check uniqieness below
    var userEnteredUN = '';
    if (updateUniForm.value.UniUsername != null) {
      userEnteredUN = updateUniForm.value.UniUsername;
      if (this.AllUsersRecievedFromDB != null) {
        for (var i = 0; i < Object.keys(this.AllUsersRecievedFromDB).length; i++) {
          var quotedUserEnteredUN = '"' + userEnteredUN + '"';
          var IteratedUNinForLoop: string = JSON.stringify(
            this.AllUsersRecievedFromDB[i].Username
          );
          // console.log("IteratedUNinForLoop.toLowerCase() ", IteratedUNinForLoop.toLowerCase());
          // console.log("quotedUserEnteredUN.toLowerCase() ", quotedUserEnteredUN.toLowerCase());
          if (IteratedUNinForLoop.toLowerCase() == quotedUserEnteredUN.toLowerCase()) {
            if (IteratedUNinForLoop.toLowerCase() != '"' + originalUsername + '"') {
              this.Errors.usernameNotUnique.status = true;
              console.log('user was matched');
              return true;
            }
          } else {
            this.Errors.usernameNotUnique.status = false;
            // return false;
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





  checkkk(val: string): boolean {
    if (val.length < 2)
      return true;
    else
      return false;
  }

  checkTitleForOfUniversityVALIDandUNIQUE(form: NgForm, originalUniTitle: string) {
    // if (form.value.UniTitle.length < 2) {
    //   this.Errors.invalidTitle.status = true
    //   // returnqw
    // }
    // else {
    // }
    //this.AllUsersRecievedFromDB

    this.Errors.invalidTitle.status = this.checkkk(form.value.UniTitle);

    var EnteredUniTitle = form.value.UniTitle.toLowerCase();
    if (EnteredUniTitle != null) {
      // EnteredUniTitle =
      if (this.AllUsersRecievedFromDB != null) {
        for (var i = 0; i < Object.keys(this.AllUsersRecievedFromDB).length; i++) {
          if(this.AllUsersRecievedFromDB[i].UserType == 'university')
          {    // var quotedEnteredUniTitle = '"' + EnteredUniTitle + '"';
            var IteratedTITLEinForLoop: string = this.AllUsersRecievedFromDB[i].TitleOfUniversity.toLowerCase();
            // console.log("IteratedUNinForLoop.toLowerCase() ", IteratedUNinForLoop.toLowerCase());
            // console.log("quotedUserEnteredUN.toLowerCase() ", quotedUserEnteredUN.toLowerCase());
            if (IteratedTITLEinForLoop == EnteredUniTitle
              && IteratedTITLEinForLoop != originalUniTitle.toLowerCase()) {

              this.Errors.uniTitleNotUnique.status = true;
              console.log('user was matched');
              return true;

            } else {
              this.Errors.uniTitleNotUnique.status = false;
              // return false;
            }
          }
        }
      }
    }
  }
  setALLErrorsToFalse() {
    this.Errors.uniTitleNotUnique.status = false;
    this.Errors.spacesAreNotAllowedInUsername.status = false;
    this.Errors.accessTerminated.status = false;
    this.Errors.accessAllowed.status = false;
    this.Errors.userDeleted.status = false;
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
      this.Errors.uniTitleNotUnique.status ||
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


  // Unis = [
  //   { uniTitle: 'CUI Isb', id: 'ab', status: 'allowed' },
  //   { uniTitle: 'CUI Lhr', id: 'bc', status: 'allowed' },
  //   { uniTitle: 'CUI Wah', id: 'cd', status: 'allowed' },
  //   { uniTitle: 'CUI Vehari', id: 'de', status: 'allowed' },
  //   { uniTitle: 'CUI Taxila', id: 'ef', status: 'allowed' }
  // ];




  Errors = {
    invalidTitle: {
      status: true,
      message: 'Title should be atleast 2 characters.',
    },
    uniTitleNotUnique: {
      status: true,
      message: 'This title is taken, Type a different one.',
    },
    accessAllowed: {
      status: true,
      message: 'Access status of this university has been allowed',
    },
    accessTerminated: {
      status: true,
      message: 'Access status of this university has been terminated',
    },
    userDeleted: {
      status: true,
      message: 'Records of this university has been deleted.',
    },
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters.',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters.',
    },
    invalidHECID: {
      status: true,
      message: 'HECID should be atleast 3 characters.',
    },

    formHasErrors: {
      status: true,
      message: 'Form has errors, kindly resolve them first.',
    },
    usernameNotUnique: {
      status: true,
      message: 'This username has already been taken. kindly enter some other.',
    },
    spacesAreNotAllowedInUsername: {
      status: true,
      message: 'Spaces are not allowed in Username field',
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
