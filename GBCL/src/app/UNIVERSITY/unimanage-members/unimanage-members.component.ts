import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { UsersService } from 'src/app/Services/users.service';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';

@Component({
  selector: 'app-unimanage-members',
  templateUrl: './unimanage-members.component.html',
  styleUrls: ['./unimanage-members.component.css']
})
export class UnimanageMembersComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  ngOnInit() {
    this.setALLErrorsToFalse();
    this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    // this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.UsernameObj = { Username: localStorage.getItem("UsersUsername") };
    this.fetchedUni = this.usersService.FetchThisUser(this.UsernameObj);
    setTimeout(() => {
      console.log('this.AllUsersRecieved ===>',this.AllUsersRecieved);
      this.localStorageUsername = this.fetchedUni[0].Username;
      this.UNIVERSITY_TITLE = this.fetchedUni[0].TitleOfUniversity;
    }, 1000);
    setTimeout(() => {
      console.log('this.AllUsersRecieved ===>',this.AllUsersRecieved);
      this.extractAffiliatedAndRejectedMembers();
    }, 1500);
  }


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
  // //////////////////////////////////////////\///

  private AllUsersRecieved: Usersmodel[] = [];
  private fetchedUni: Usersmodel[] = [];
  localStorageUsername: string;
  UsernameObj: { Username: string } = { Username: localStorage.getItem("UsersUsername") };
  UNIVERSITY_TITLE: string;
  MemberType = "Student";
  FacultyEdit = false;
  EditFacultyButtonText = "Edit";
  StudentEdit = false;
  EditStudentButtonText = "Edit";
  // CreateMemberProfileForm: NgForm;

  RejectedMembersEditButtonToggled = false;
  RejectedMembersEditButtonText = "Edit";
  RegisteredFaculty: Usersmodel[] = [];
  RegisteredStudents: Usersmodel[] = [];
  RejectedMembers: Usersmodel[] = [];
  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  VARIABLE DECLARATIONS ABOVE
  // //////////////////////////////////////////\///

  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  CORRECT CODE BELOW
  // //////////////////////////////////////////\///

  onMemberTypeButtonToggle() {
    if (this.MemberType == "Student") {
      this.MemberType = "Teacher";
    } else {
      this.MemberType = "Student";
    }
  }


  on_CreateMemberProfileSubmitButton_Clicked(createMemberForm: NgForm) {
    if (this.checkIfErrors()) {
      this.Errors.formHasErrors.status = true;
      this.Errors.profileCreated.status = false;
      return;
    } else {
      this.Errors.formHasErrors.status = false;
      this.Errors.profileCreated.status = true;
      const user: Usersmodel = {
        _id: '',
        LabJoinCodesOfJoinedLabs: null,
        LabJoinCodesOfAppliedLabs: null,
        Username: createMemberForm.value.UNcreateProfile.toLowerCase(),
        Password: createMemberForm.value.PWcreateProfile,
        FirstNameOfUser: createMemberForm.value.FNcreateProfile,
        LastNameOfUser: createMemberForm.value.LNcreateProfile,
        RegistrationNumberOfUser: createMemberForm.value.RegNcreateProfile,
        UniversityNameOfUser: this.UNIVERSITY_TITLE,
        UserType: this.MemberType.toLowerCase(),
        HECIDofUniversity: null,
        UserzAccessStatus: 'Allowed',
        TitleOfUniversity: null
      };
      // user.Username = user.Username.toLowerCase();

      this.usersService.createUser(user); //<--- this method should update user to DB
      setTimeout(() => { createMemberForm.resetForm }, 1500);


      console.log('THE MEMBER: \n', user);

    }
  }


  onRejectedMemberEditButtonToggle() {
    if (this.RejectedMembersEditButtonToggled == false) {
      this.RejectedMembersEditButtonText = "Hide Editing";
      this.RejectedMembersEditButtonToggled = true;
    } else {
      this.RejectedMembersEditButtonText = "Edit";
      this.RejectedMembersEditButtonToggled = false;
    }
  }



  DeleteThisUser(member: Usersmodel) {
    if (confirm("Are you sure you want to delete profile of :" + member.FirstNameOfUser + " " + member.LastNameOfUser)) {
      this.usersService.deleteThisUser(member._id);
      this.Errors.userDeleted.status = true;
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      return;
    }
  }




  RejectedMemberAllowAccessButtonClicked(member: Usersmodel) {
    if (member.UserzAccessStatus == 'Rejected') {
      if (confirm('Are you sure you want to allow access to : ' + member.FirstNameOfUser + ' ' + member.LastNameOfUser)) {
        const terminatedMember: Usersmodel = { ...member };
        terminatedMember.UserzAccessStatus = 'Allowed';
        this.usersService.updateThisUser(terminatedMember, member._id);
        // this.Errors.accessTerminated.status = false;
        this.Errors.accessAllowed.status = true;
        setTimeout(() => { window.location.reload() }, 3500);
      } else {
        return;
      }
    }

  }


  extractAffiliatedAndRejectedMembers() {
    // if (this.AffiliatedUniversitiesData.length == 0) {
    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      if ((this.AllUsersRecieved[i].UserType != 'university' || 'admin')
        && this.AllUsersRecieved[i].UniversityNameOfUser == this.UNIVERSITY_TITLE) {

        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Rejected') { this.RejectedMembers.push(this.AllUsersRecieved[i]); }


        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
          && this.AllUsersRecieved[i].UserType == 'student') { this.RegisteredStudents.push(this.AllUsersRecieved[i]); }

        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
          && this.AllUsersRecieved[i].UserType == 'teacher') { this.RegisteredFaculty.push(this.AllUsersRecieved[i]); }


      }
    }
    // }

  }

  onSubmit_UpdateButton(updateMemberForm: NgForm, OriginalMemberDetails: Usersmodel) {

    // const str: String = updateUniForm.value.UniUsername;
    // if (str != str.replace(/ /g, '')) {
    //   this.Errors.spacesAreNotAllowedInUsername.status = true;
    //   return;
    // }

    if (updateMemberForm.value.MemberUN == ''
      && updateMemberForm.value.MemberFN == ''
      && updateMemberForm.value.MemberLN == ''
      && updateMemberForm.value.MemberPW == ''
      && updateMemberForm.value.MemberRegN == ''
    ) {
      alert('You can\'t update empty fields');
      return;
    }


    if (updateMemberForm.value.MemberUN == ''
      || updateMemberForm.value.MemberFN == ''
      || updateMemberForm.value.MemberLN == ''
      || updateMemberForm.value.MemberPW == ''
      || updateMemberForm.value.MemberRegN == ''
    ) {
      // alert('You can\'t update empty fields');
      // return;
    } else
      if (updateMemberForm.value.MemberUN.toLowerCase() == OriginalMemberDetails.Username.toLowerCase()
        && updateMemberForm.value.MemberFN == OriginalMemberDetails.FirstNameOfUser
        && updateMemberForm.value.MemberLN == OriginalMemberDetails.LastNameOfUser
        && updateMemberForm.value.MemberPW == OriginalMemberDetails.Password
        && updateMemberForm.value.MemberRegN == OriginalMemberDetails.RegistrationNumberOfUser) {
        alert('You haven\'t changed any field, same values cannot be updated');
        return;
      }

    var UpdatedMemberUN = '';
    var UpdatedMemberFN = '';
    var UpdatedMemberLN = '';
    var UpdatedMemberPW = '';
    var UpdatedMemberRegN = '';

    if (updateMemberForm.value.MemberUN == '') {
      UpdatedMemberUN = OriginalMemberDetails.Username;
    }
    else {
      UpdatedMemberUN = updateMemberForm.value.MemberUN;
    }


    if (updateMemberForm.value.MemberFN == '') {
      UpdatedMemberFN = OriginalMemberDetails.FirstNameOfUser;
    } else {
      UpdatedMemberFN = updateMemberForm.value.MemberFN;
    }

    if (updateMemberForm.value.MemberLN == '') {
      UpdatedMemberLN = OriginalMemberDetails.LastNameOfUser;
    } else {
      UpdatedMemberLN = updateMemberForm.value.MemberLN;
    }

    if (updateMemberForm.value.MemberPW == '') {
      UpdatedMemberPW = OriginalMemberDetails.Password;
    } else {
      UpdatedMemberPW = updateMemberForm.value.MemberPW;
    }

    if (updateMemberForm.value.MemberRegN == '') {
      UpdatedMemberRegN = OriginalMemberDetails.RegistrationNumberOfUser;
    } else {
      UpdatedMemberRegN = updateMemberForm.value.MemberRegN;
    }

    const UpdatedMemberAsAUser: Usersmodel = {
      FirstNameOfUser: UpdatedMemberFN,
      HECIDofUniversity: OriginalMemberDetails.HECIDofUniversity,
      LastNameOfUser: UpdatedMemberLN,
      LabJoinCodesOfJoinedLabs: OriginalMemberDetails.LabJoinCodesOfJoinedLabs,
      LabJoinCodesOfAppliedLabs: OriginalMemberDetails.LabJoinCodesOfAppliedLabs,
      Password: UpdatedMemberPW,
      RegistrationNumberOfUser: UpdatedMemberRegN,
      TitleOfUniversity: OriginalMemberDetails.TitleOfUniversity,
      UniversityNameOfUser: OriginalMemberDetails.UniversityNameOfUser,
      UserType: OriginalMemberDetails.UserType,
      Username: UpdatedMemberUN,
      UserzAccessStatus: OriginalMemberDetails.UserzAccessStatus,
      _id: OriginalMemberDetails._id
    }

    console.log('UpdatedMemberAsAUser ===> ', UpdatedMemberAsAUser);

    // console.log('UpdatedUniAsAUser\n', UpdatedUniAsAUser);
    if (this.checkIfErrors()) {
      this.Errors.formHasErrors.status = true;
      this.Errors.profileUpdated.status = false;
      return;
    } else {
      this.Errors.formHasErrors.status = false;
      if (OriginalMemberDetails.UserzAccessStatus == 'Rejected') {
        if (confirm('Are you sure you want to update these values?\nThis will only update the fields,\nIt ' +
          'won\'t allow access to this member unless Allow Access Button clicked.')) {

          // this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

          setTimeout(() => {
            this.usersService.updateThisUser(UpdatedMemberAsAUser, OriginalMemberDetails._id);
          }, 750);
          this.Errors.profileUpdated.status = true;
          updateMemberForm.resetForm();
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        } else {
          return;
        }
      } else {
        if (confirm('Are you sure you want to update these values?')) {
          // console.log(OriginalUniDetails._id);
          // console.log(OriginalUniDetails.Username);
          // this.usersService.updateUsernameOfUserExverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

          setTimeout(() => {
            this.usersService.updateThisUser(UpdatedMemberAsAUser, OriginalMemberDetails._id);
          }, 750);
          this.Errors.profileUpdated.status = true;
          updateMemberForm.resetForm();
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        } else {
          return;
        }
      }

    }


  }









  checkUsernameOfMemberIfVALIDandUNIQUE(UN: string, OldUN: string) {

    UN.length < 5
      ? (this.Errors.invalidUsername.status = true)
      : (this.Errors.invalidUsername.status = false);

    if (UN.length == 0) { this.Errors.emptyField.status = true; }
    else {
      this.Errors.emptyField.status = false;
      UN != UN.replace(/ /g, '')
        ? (this.Errors.spacesAreNotAllowed.status = true)
        : (this.Errors.spacesAreNotAllowed.status = false);
    }
    // check uniqieness below
    // var userEnteredUN = '';
    if (UN != null) {
      // userEnteredUN = UN;
      if (this.AllUsersRecieved != null) {
        for (var i = 0; i < Object.keys(this.AllUsersRecieved).length; i++) {
          // var quotedUserEnteredUN = '"' + UN + '"';
          // var IteratedUNinForLoop: string = JSON.stringify(
          //   this.AllUsersRecieved[i].Username
          // );
          if (this.AllUsersRecieved[i].Username.toLowerCase() == UN.toLowerCase()
            && this.AllUsersRecieved[i].Username.toLowerCase() != OldUN.toLowerCase()) {
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

  checkPasswordOfMember(PW: string) {
    PW.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
    PW.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
  }

  checkFNameOfMember(FName: string) {
    FName.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
    FName.length < 3
      ? (this.Errors.invalidFName.status = true)
      : (this.Errors.invalidFName.status = false);
  }
  checkLNameOfMember(LName: string) {
    LName.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
    LName.length < 3
      ? (this.Errors.invalidLName.status = true)
      : (this.Errors.invalidLName.status = false);
  }
  checkRegNOfMember(regNum: string) {
    regNum.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
    regNum.length < 4
      ? (this.Errors.invalidRegistrationNumber.status = true)
      : (this.Errors.invalidRegistrationNumber.status = false);
  }

  setALLErrorsToFalse() {
    this.Errors.emptyField.status = true;
    this.Errors.spacesAreNotAllowed.status = false;
    this.Errors.invalidFName.status = false;
    this.Errors.invalidLName.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidUsername.status = false;
    this.Errors.invalidRegistrationNumber.status = false;
    this.Errors.usernameNotUnique.status = false;
    this.Errors.formHasErrors.status = false;
    this.Errors.profileCreated.status = false;
    this.Errors.profileUpdated.status = false;
    this.Errors.userDeleted.status = false;
    this.Errors.accessAllowed.status = false;
  }

  checkIfErrors(): boolean {
    if (
      this.Errors.spacesAreNotAllowed.status ||
      this.Errors.emptyField.status ||
      this.Errors.profileCreated.status ||
      this.Errors.accessAllowed.status ||
      this.Errors.profileUpdated.status ||
      this.Errors.userDeleted.status ||
      this.Errors.invalidFName.status ||
      this.Errors.invalidLName.status ||
      this.Errors.invalidPassword.status ||
      this.Errors.invalidRegistrationNumber.status ||
      this.Errors.invalidUsername.status ||
      this.Errors.usernameNotUnique.status
    )
      return true;
    else return false;
  }






  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }


  onFacultyEditToggle(FacultyEditForm: NgForm,OldUN: string) {
    this.setALLErrorsToFalse();
    if (this.FacultyEdit == false) {
      this.FacultyEdit = true;
      this.EditFacultyButtonText = "Hide Edit";
      this.checkFNameOfMember(FacultyEditForm.value.MemberFN);
      this.checkLNameOfMember(FacultyEditForm.value.MemberLN);
      this.checkPasswordOfMember(FacultyEditForm.value.MemberPW);
      this.checkRegNOfMember(FacultyEditForm.value.MemberRegN);
      this.checkUsernameOfMemberIfVALIDandUNIQUE(FacultyEditForm.value.MemberUN,OldUN);
    } else {
      this.EditFacultyButtonText = "Edit";
      this.FacultyEdit = false;
      // FacultyEditForm.resetForm();
    }
  }


  onStudentEditToggle(StudentEditForm: NgForm,OldUN: string) {
    this.setALLErrorsToFalse();
    if (this.StudentEdit == false) {
      this.StudentEdit = true;
      this.EditStudentButtonText = "Hide Edit";
      this.checkFNameOfMember(StudentEditForm.value.MemberFN);
      this.checkLNameOfMember(StudentEditForm.value.MemberLN);
      this.checkPasswordOfMember(StudentEditForm.value.MemberPW);
      this.checkRegNOfMember(StudentEditForm.value.MemberRegN);
      this.checkUsernameOfMemberIfVALIDandUNIQUE(StudentEditForm.value.MemberUN, OldUN);
    } else {
      this.EditStudentButtonText = "Edit";
      this.StudentEdit = false;
      // StudentEditForm.resetForm();
    }
  }


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  CORRECT CODE ABOVE
  // //////////////////////////////////////////\///








  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  FAKE INITIALIZATIONS BELOW
  // //////////////////////////////////////////\///


  Errors = {
    emptyField: {
      status: true,
      message: 'One or more fields are empty.',
    },
    userDeleted: {
      status: true,
      message: 'This member\'s profile has been delete.',
    },
    accessAllowed: {
      status: true,
      message: 'Access allowed for this member.',
    },
    invalidUsername: {
      status: true,
      message: 'Username should be atleast 5 characters).',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters).',
    },
    usernameNotUnique: {
      status: true,
      message: 'This username has already been taken. kindly enter some other.',
    },
    formHasErrors: {
      status: true,
      message: 'Form has errors, kindly resolve them first.\nProfile not created yet.',
    },
    invalidFName: {
      status: true,
      message: 'First Name should be atleast 3 characters).',
    },
    invalidLName: {
      status: true,
      message: 'Last Name should be atleast 3 characters).',
    },
    invalidRegistrationNumber: {
      status: true,
      message: 'Registration Number should be minimum of 4 characters).',
    },
    spacesAreNotAllowed: {
      status: true,
      message: 'Spaces are not allowed this field',
    },
    profileUpdated: {
      status: true,
      message:
        'Member\'s Profile updated successfully.',
    },
    profileCreated: {
      status: true,
      message:
        'Profile created successfully.\nMember can Login now.',
    }
  };




  StudentsData = [{
    Id: 'std1',
    name: 'Abdur Rehman',
    UniTitle: 'COMSATS University Islamabad',
    AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
    AccessStatus: 'Pending'
  },
  {
    Id: 'std2',
    name: 'Saad Rafique',
    UniTitle: 'Iqra University Karachi',
    AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
    AccessStatus: 'Pending'
  },
  {
    Id: 'std3',
    name: 'Umer Ashraf',
    UniTitle: 'FAST NU Lhr',
    AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
    AccessStatus: 'Pending'
  }
  ];





  // FacultyData = [{
  //   Id: 'fac1',
  //   name: 'Hassan Mansoor',
  //   UniTitle: 'COMSATS University Islamabad',
  //   AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
  //   AccessStatus: 'Pending'
  // },
  // {
  //   Id: 'fac2',
  //   name: 'Dr. Ishtiaq Ahmed',
  //   UniTitle: 'IIUI University',
  //   AccessStatuses: { allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted' },
  //   AccessStatus: 'Pending'
  // }
  // ];


  // //////////////////////////////////////////\///
  // //////////////////////////////////////////\///  FAKE INITIALIZATIONS ABOVE
  // //////////////////////////////////////////\///

}
