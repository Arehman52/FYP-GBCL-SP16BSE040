import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { UsersService } from 'src/app/Services/users.service';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

@Component({
  selector: 'app-unimanage-members',
  templateUrl: './unimanage-members.component.html',
  styleUrls: ['./unimanage-members.component.css']
})
export class UnimanageMembersComponent implements OnInit {

  constructor(private usersService:UsersService) { }
  ngOnInit() {
    this.setALLErrorsToFalse();
    this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    // this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.UsernameObj = { Username: localStorage.getItem("UsersUsername") };
    this.fetchedUni = this.usersService.FetchThisUser2(this.UsernameObj);
    setTimeout(() => {
      this.localStorageUsername = this.fetchedUni[0].Username;
      this.UNIVERSITY_TITLE = this.fetchedUni[0].TitleOfUniversity;
      setTimeout(() => {
      this.extractAffiliatedAndRejectedMembers();
    }, 200);
    }, 700);
  }


// //////////////////////////////////////////\///
// //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
// //////////////////////////////////////////\///

  private AllUsersRecieved:Usersmodel[] = [];
  private fetchedUni:Usersmodel[] = [];
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
  RegisteredFaculty:Usersmodel[] = [];
  RegisteredStudents:Usersmodel[] = [];
  RejectedMembers:Usersmodel[] = [];
// //////////////////////////////////////////\///
// //////////////////////////////////////////\///  VARIABLE DECLARATIONS ABOVE
// //////////////////////////////////////////\///

// //////////////////////////////////////////\///
// //////////////////////////////////////////\///  CORRECT CODE BELOW
// //////////////////////////////////////////\///

onMemberTypeButtonToggle(){
  if(this.MemberType == "Student"){
    this.MemberType = "Teacher";
  }else{
    this.MemberType = "Student";
  }
}


on_CreateMemberProfileSubmitButton_Clicked(createMemberForm:NgForm){
  if(this.checkIfErrors())
  {
    this.Errors.formHasErrors.status = true;
    this.Errors.formSubmittedSuccessfuly.status = false;
    return;
  }else{
    this.Errors.formHasErrors.status = false;
    this.Errors.formSubmittedSuccessfuly.status = true;
    const user:Usersmodel = {
      _id: '',
      Username: createMemberForm.value.UNcreateProfile,
      Password: createMemberForm.value.PWcreateProfile,
      FirstNameOfUser: createMemberForm.value.FNcreateProfile,
      LastNameOfUser: createMemberForm.value.LNcreateProfile,
      RegistrationNumberOfUser: createMemberForm.value.RegNcreateProfile,
      UniversityNameOfUser: this.localStorageUsername,
      UserType: this.MemberType.toLowerCase(),
      HECIDofUniversity: null,
      UserzAccessStatus: 'Allowed',
      TitleOfUniversity: null
    };

    this.usersService.createUser(user); //<--- this method should update user to DB
    setTimeout(()=>{createMemberForm.resetForm},1500);


    console.log('THE MEMBER: \n',user);

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
  if (confirm("Are you sure you want to delete profile of :" + member.FirstNameOfUser + " "+member.LastNameOfUser)) {
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
    if (confirm('Are you sure you want to allow access to : ' + member.FirstNameOfUser+' '+member.LastNameOfUser)) {
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
      &&  this.AllUsersRecieved[i].UniversityNameOfUser == this.UNIVERSITY_TITLE)
       {

        if(this.AllUsersRecieved[i].UserzAccessStatus == 'Rejected')
        {this.RejectedMembers.push(this.AllUsersRecieved[i]);}


        if(this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
        && this.AllUsersRecieved[i].UserType == 'student')
        {this.RegisteredStudents.push(this.AllUsersRecieved[i]);}

        if(this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
        && this.AllUsersRecieved[i].UserType == 'teacher')
        {this.RegisteredFaculty.push(this.AllUsersRecieved[i]);}


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

  // if (updateUniForm.value.UniTitle == ''
  //   && updateUniForm.value.UniHECID == ''
  //   && updateUniForm.value.UniUsername == ''
  //   && updateUniForm.value.UniPassword == ''
  // ) {
  //   alert('You can\'t update empty fields');
  //   return;
  // }

  // if (updateUniForm.value.UniTitle.toLowerCase() == OriginalUniDetails.TitleOfUniversity.toLowerCase()
  //   && updateUniForm.value.UniHECID == OriginalUniDetails.HECIDofUniversity
  //   && updateUniForm.value.UniUsername.toLowerCase() == OriginalUniDetails.Username.toLowerCase()
  //   && updateUniForm.value.UniPassword == OriginalUniDetails.Password
  // ) {
  //   alert('You haven\'t changed any field, same values cannot be updated');
  //   return;
  // }

  // var UpdatedUniTitle = '';
  // var UpdatedUniHECID = '';
  // var UpdatedUniUsername = '';
  // var UpdatedUniPassword = '';

  // if (updateUniForm.value.UniTitle == '') {
  //   UpdatedUniTitle = OriginalUniDetails.TitleOfUniversity;
  // }
  // else {
  //   UpdatedUniTitle = updateUniForm.value.UniTitle;
  // }


  // if (updateUniForm.value.UniHECID == '') {
  //   UpdatedUniHECID = OriginalUniDetails.HECIDofUniversity;
  // } else {
  //   UpdatedUniHECID = updateUniForm.value.UniHECID;
  // }

  // if (updateUniForm.value.UniUsername == '') {
  //   UpdatedUniUsername = OriginalUniDetails.Username.toLocaleLowerCase();
  // } else {
  //   UpdatedUniUsername = updateUniForm.value.UniUsername.toLocaleLowerCase();
  // }

  // if (updateUniForm.value.UniPassword == '') {
  //   UpdatedUniPassword = OriginalUniDetails.Password;
  // } else {
  //   UpdatedUniPassword = updateUniForm.value.UniPassword;
  // }



  // const UpdatedUniAsAUser: Usersmodel = {
  //   FirstNameOfUser: OriginalUniDetails.FirstNameOfUser,
  //   HECIDofUniversity: UpdatedUniHECID,
  //   LastNameOfUser: OriginalUniDetails.LastNameOfUser,
  //   Password: UpdatedUniPassword,
  //   RegistrationNumberOfUser: OriginalUniDetails.RegistrationNumberOfUser,
  //   TitleOfUniversity: UpdatedUniTitle,
  //   UniversityNameOfUser: OriginalUniDetails.UniversityNameOfUser,
  //   UserType: OriginalUniDetails.UserType,
  //   Username: UpdatedUniUsername,
  //   UserzAccessStatus: OriginalUniDetails.UserzAccessStatus,
  //   _id: OriginalUniDetails._id
  // }


  // // console.log('UpdatedUniAsAUser\n', UpdatedUniAsAUser);
  // if (this.areThereAnyErrors()) {
  //   this.Errors.formHasErrors.status = true;
  //   this.Errors.profileUpdated.status = false;
  //   return;
  // } else {
  //   this.Errors.formHasErrors.status = false;
  //   if (OriginalUniDetails.UserzAccessStatus == 'Rejected') {
  //     if (confirm('Are you sure you want to update these values?\nThis will only update the fields,\nIt ' +
  //       'won\'t allow access to this university unless Allow Access Button clicked.')) {
  //       // console.log(OriginalUniDetails._id);
  //       // console.log(OriginalUniDetails.Username);
  //       this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

  //       setTimeout(() => {
  //         this.usersService.updateThisUser(UpdatedUniAsAUser, OriginalUniDetails._id);
  //       }, 750);
  //       this.Errors.profileUpdated.status = true;
  //       updateUniForm.resetForm();
  //       // setTimeout(() => {
  //       //   window.location.reload();
  //       // }, 3500);
  //     } else {
  //       return;
  //     }
  //   } else {
  //     if (confirm('Are you sure you want to update these values?')) {
  //       console.log(OriginalUniDetails._id);
  //       console.log(OriginalUniDetails.Username);
  //       this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

  //       setTimeout(() => {
  //         this.usersService.updateThisUser(UpdatedUniAsAUser, OriginalUniDetails._id);
  //       }, 750);
  //       this.Errors.profileUpdated.status = true;
  //       updateUniForm.resetForm();
  //       // setTimeout(() => {
  //       //   window.location.reload();
  //       // }, 3500);
  //     } else {
  //       return;
  //     }
  //   }

  // }


}









checkUsernameOfMemberIfVALIDandUNIQUE(UN:string) {
  UN.length < 5
    ? (this.Errors.invalidUsername.status = true)
    : (this.Errors.invalidUsername.status = false);

  UN.length == 0
    ? (this.Errors.emptyField.status = true)
    : (this.Errors.emptyField.status = false);
  // check uniqieness below
  // var userEnteredUN = '';
  if (UN != null)
   {
    // userEnteredUN = UN;
    if (this.AllUsersRecieved != null)
    {
      for (var i = 0; i < Object.keys(this.AllUsersRecieved).length; i++)
      {
        var quotedUserEnteredUN = '"' + UN + '"';
        var IteratedUNinForLoop: string = JSON.stringify(
          this.AllUsersRecieved[i].Username
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

checkPasswordOfMember(PW:string){
  PW.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
  PW.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
}

checkFNameOfMember(FName:string){
  FName.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
  FName.length < 3
      ? (this.Errors.invalidFName.status = true)
      : (this.Errors.invalidFName.status = false);
}
checkLNameOfMember(LName:string){
  LName.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
  LName.length < 3
      ? (this.Errors.invalidLName.status = true)
      : (this.Errors.invalidLName.status = false);
}
checkRegNOfMember(regNum:string){
  regNum.length == 0
      ? (this.Errors.emptyField.status = true)
      : (this.Errors.emptyField.status = false);
  regNum.length < 4
      ? (this.Errors.invalidRegistrationNumber.status = true)
      : (this.Errors.invalidRegistrationNumber.status = false);
}

setALLErrorsToFalse() {
  this.Errors.invalidFName.status = false;
  this.Errors.invalidLName.status = false;
  this.Errors.invalidPassword.status = false;
  this.Errors.invalidUsername.status = false;
  this.Errors.invalidRegistrationNumber.status = false;
  this.Errors.usernameNotUnique.status = false;
  this.Errors.formHasErrors.status = false;
  this.Errors.formSubmittedSuccessfuly.status = false;
}

checkIfErrors(): boolean{
  if (
    this.Errors.emptyField.status ||
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






  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }


  onFacultyEditToggle(){
    this.setALLErrorsToFalse();
    if(this.FacultyEdit == false){
      this.FacultyEdit = true;
      this.EditFacultyButtonText = "Hide Edit";
    }else{
      this.EditFacultyButtonText = "Edit";
      this.FacultyEdit = false;
    }
  }


  onStudentEditToggle(){
    this.setALLErrorsToFalse();
    if(this.StudentEdit == false){
      this.StudentEdit = true;
      this.EditStudentButtonText = "Hide Edit";
    }else{
      this.EditStudentButtonText = "Edit";
      this.StudentEdit = false;
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
  formSubmittedSuccessfuly: {
    status: true,
    message:
      'Profile created successfully.\nMember can Login now.',
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
      'University\'s Profile updated successfully.',
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
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  },
  {
    Id: 'std2',
    name: 'Saad Rafique',
    UniTitle: 'Iqra University Karachi',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  },
  {
    Id: 'std3',
    name: 'Umer Ashraf',
    UniTitle: 'FAST NU Lhr',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending'
  }
];





FacultyData = [{
  Id: 'fac1',
  name: 'Hassan Mansoor',
  UniTitle: 'COMSATS University Islamabad',
  AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
  AccessStatus: 'Pending'
},
{
  Id: 'fac2',
  name: 'Dr. Ishtiaq Ahmed',
  UniTitle: 'IIUI University',
  AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
  AccessStatus: 'Pending'
}
];


// //////////////////////////////////////////\///
// //////////////////////////////////////////\///  FAKE INITIALIZATIONS ABOVE
// //////////////////////////////////////////\///

}
