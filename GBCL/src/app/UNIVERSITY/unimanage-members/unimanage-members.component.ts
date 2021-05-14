import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';


import { HomepageService } from 'src/app/gbcl-homepage/homepage.service';
import { UniversityModel } from 'src/app/MODELS/universitymodel.model';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';

@Component({
  selector: 'app-unimanage-members',
  templateUrl: './unimanage-members.component.html',
  styleUrls: ['./unimanage-members.component.css']
})
export class UnimanageMembersComponent implements OnInit {

  constructor(private homepageService:HomepageService) { }
  ngOnInit() {
    this.setALLErrorsToFalse();
    this.UsersRecievedFromDBForSignup = this.homepageService.RecieveAllUsersFromDB();
  }


// //////////////////////////////////////////\///
// //////////////////////////////////////////\///  VARIABLE DECLARATIONS BELOW
// //////////////////////////////////////////\///

  private UsersRecievedFromDBForSignup:Usersmodel[] = [];
  localStorageUsername = localStorage.getItem("UsersUsername");
  MemberType = "Student";
  FacultyEdit = false;
  EditFacultyButtonText = "Edit";
  StudentEdit = false;
  EditStudentButtonText = "Edit";
  // CreateMemberProfileForm: NgForm;

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

    this.homepageService.createUser(user); //<--- this method should update user to DB
    setTimeout(()=>{createMemberForm.resetForm},1500);


    console.log('THE MEMBER: \n',user);

  }
}

checkUsernameOfMember(createMemberForm:NgForm) {
  createMemberForm.value.UNcreateProfile.length < 5
    ? (this.Errors.invalidUsername.status = true)
    : (this.Errors.invalidUsername.status = false);
  // check uniqieness below
  var userEnteredUN = '';
  if (createMemberForm.value.UNcreateProfile != null)
   {
    userEnteredUN = createMemberForm.value.UNcreateProfile;
    if (this.UsersRecievedFromDBForSignup != null)
    {
      for (var i = 0; i < Object.keys(this.UsersRecievedFromDBForSignup).length; i++)
      {
        var quotedUserEnteredUN = '"' + userEnteredUN + '"';
        var IteratedUNinForLoop: string = JSON.stringify(
          this.UsersRecievedFromDBForSignup[i].Username
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

checkPasswordOfMember(createMemberForm:NgForm){
  createMemberForm.value.PWcreateProfile.length < 8
      ? (this.Errors.invalidPassword.status = true)
      : (this.Errors.invalidPassword.status = false);
}

checkFNameOfMember(createMemberForm:NgForm){
  createMemberForm.value.FNcreateProfile.length < 3
      ? (this.Errors.invalidFName.status = true)
      : (this.Errors.invalidFName.status = false);
}
checkLNameOfMember(createMemberForm:NgForm){
  createMemberForm.value.LNcreateProfile.length < 3
      ? (this.Errors.invalidLName.status = true)
      : (this.Errors.invalidLName.status = false);
}
checkRegNOfMember(createMemberForm:NgForm){
  createMemberForm.value.RegNcreateProfile.length < 4
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
    if(this.FacultyEdit == false){
      this.FacultyEdit = true;
      this.EditFacultyButtonText = "Hide Edit";
    }else{
      this.EditFacultyButtonText = "Edit";
      this.FacultyEdit = false;
    }
  }


  onStudentEditToggle(){
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
};


  UniversitiesData: UniversityModel[] = [{
    Id: 'uni1',
    UniTitle: 'COMSATS University Islamabad',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending',
    HECID: 'FAC241',
    FacultyCount: 85,
    LabsCount: 34,
    StudentsCount: 391
  },
  {
    Id: 'uni2',
    UniTitle: 'COMSATS University Lahore',
    AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'},
    AccessStatus: 'Pending',
    HECID: 'FAC242',
    FacultyCount: 25,
    LabsCount: 28,
    StudentsCount: 208
  }];


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
