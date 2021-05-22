import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Labsmodel } from 'src/app/MODELS/labsmodel.model';
import { Usersmodel } from 'src/app/MODELS/usersmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { UsersService } from 'src/app/Services/users.service';


@Component({
  selector: 'app-unimanage-labs',
  templateUrl: './unimanage-labs.component.html',
  styleUrls: ['./unimanage-labs.component.css']
})
export class UnimanageLabsComponent implements OnInit {

  constructor(private usersService: UsersService, private labsService: LabsService) { }

  ngOnInit(): void {
    this.setAllErrorsToFalse();
    this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.AllLabsRecieved = this.labsService.RecieveAllLabsFromDB();
    // this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.UsernameObj = { Username: localStorage.getItem("UsersUsername") };
    this.fetchedUni = this.usersService.FetchThisUser(this.UsernameObj);
    setTimeout(() => {
      this.localStorageUsername = this.fetchedUni[0].Username;
      this.UNIVERSITY_TITLE = this.fetchedUni[0].TitleOfUniversity;
    }, 1000);
    setTimeout(() => {
      console.log('this.AllUsersRecieved ===>', this.AllUsersRecieved);
      this.extractAffiliatedInstructors();
      this.extractRegisteredLabs();
    }, 1500);
  }


  private fetchedUni: Usersmodel[] = [];
  private AllUsersRecieved: Usersmodel[] = [];
  private AllLabsRecieved: Labsmodel[] = [];
  public RegisteredFaculty: Usersmodel[] = [];
  public RegisteredLabs: Labsmodel[] = [];
  localStorageUsername: string;
  UsernameObj: { Username: string } = { Username: localStorage.getItem("UsersUsername") };
  UNIVERSITY_TITLE: string;
  LabEdit = false;
  EditLabButtonText = "Edit";
  showInstructorChangingWarning = true;
  LabInstructorzFN: string;
  LabInstructorzLN: string;



  onLabEditToggle(LabEditForm: NgForm) {
    this.setAllErrorsToFalse();
    // this.extractLabInstructorzFNandLN(UsernameOfLabInstructor);


    if (this.LabEdit == false) {
      this.LabEdit = true;
      this.EditLabButtonText = "Hide Edit";
      // this.checkDegreeProgram(LabEditForm.value.DegreeProgram);
      // this.checkLNameOfMember(FacultyEditForm.value.MemberLN);
      // this.checkPasswordOfMember(FacultyEditForm.value.MemberPW);
      // this.checkRegNOfMember(FacultyEditForm.value.MemberRegN);
      // this.checkUsernameOfMemberIfVALIDandUNIQUE(FacultyEditForm.value.MemberUN,OldUN);
    } else {
      this.EditLabButtonText = "Edit";
      this.LabEdit = false;
      // FacultyEditForm.resetForm();
    }
  }




  onSubmit_UpdateButton(updateLabForm: NgForm, OriginalLabDetails: Labsmodel, onInstructorsSelectChange: HTMLSelectElement) {

    if (OriginalLabDetails.LabInstructor == onInstructorsSelectChange.value) {
      alert('You must ')
    }

    if (updateLabForm.value.LabTitle == ''
      && updateLabForm.value.DegreeProgram == ''
      && updateLabForm.value.LabClass == ''

    ) {
      alert('You can\'t update empty fields');
      return;
    }


    // if (updateMemberForm.value.MemberUN == ''
    //   || updateMemberForm.value.MemberFN == ''
    //   || updateMemberForm.value.MemberLN == ''
    //   || updateMemberForm.value.MemberPW == ''
    //   || updateMemberForm.value.MemberRegN == ''
    // ) {
    // alert('You can\'t update empty fields');
    // return;
    // } else
    //   if (updateMemberForm.value.MemberUN.toLowerCase() == OriginalMemberDetails.Username.toLowerCase()
    //     && updateMemberForm.value.MemberFN == OriginalMemberDetails.FirstNameOfUser
    //     && updateMemberForm.value.MemberLN == OriginalMemberDetails.LastNameOfUser
    //     && updateMemberForm.value.MemberPW == OriginalMemberDetails.Password
    //     && updateMemberForm.value.MemberRegN == OriginalMemberDetails.RegistrationNumberOfUser) {
    //     alert('You haven\'t changed any field, same values cannot be updated');
    //     return;
    //   }

    // var UpdatedMemberUN = '';
    // var UpdatedMemberFN = '';
    // var UpdatedMemberLN = '';
    // var UpdatedMemberPW = '';
    // var UpdatedMemberRegN = '';

    // if (updateMemberForm.value.MemberUN == '') {
    //   UpdatedMemberUN = OriginalMemberDetails.Username;
    // }
    // else {
    //   UpdatedMemberUN = updateMemberForm.value.MemberUN;
    // }


    // if (updateMemberForm.value.MemberFN == '') {
    //   UpdatedMemberFN = OriginalMemberDetails.FirstNameOfUser;
    // } else {
    //   UpdatedMemberFN = updateMemberForm.value.MemberFN;
    // }

    // if (updateMemberForm.value.MemberLN == '') {
    //   UpdatedMemberLN = OriginalMemberDetails.LastNameOfUser;
    // } else {
    //   UpdatedMemberLN = updateMemberForm.value.MemberLN;
    // }

    // if (updateMemberForm.value.MemberPW == '') {
    //   UpdatedMemberPW = OriginalMemberDetails.Password;
    // } else {
    //   UpdatedMemberPW = updateMemberForm.value.MemberPW;
    // }

    // if (updateMemberForm.value.MemberRegN == '') {
    //   UpdatedMemberRegN = OriginalMemberDetails.RegistrationNumberOfUser;
    // } else {
    //   UpdatedMemberRegN = updateMemberForm.value.MemberRegN;
    // }

    // const UpdatedMemberAsAUser: Usersmodel = {
    //   FirstNameOfUser: UpdatedMemberFN,
    //   HECIDofUniversity: OriginalMemberDetails.HECIDofUniversity,
    //   LastNameOfUser: UpdatedMemberLN,
    //   Password: UpdatedMemberPW,
    //   RegistrationNumberOfUser: UpdatedMemberRegN,
    //   TitleOfUniversity: OriginalMemberDetails.TitleOfUniversity,
    //   UniversityNameOfUser: OriginalMemberDetails.UniversityNameOfUser,
    //   UserType: OriginalMemberDetails.UserType,
    //   Username: UpdatedMemberUN,
    //   UserzAccessStatus: OriginalMemberDetails.UserzAccessStatus,
    //   _id: OriginalMemberDetails._id
    // }

    //  // console.log('UpdatedMemberAsAUser ===> ', UpdatedMemberAsAUser);

    //    // console.log('UpdatedUniAsAUser\n', UpdatedUniAsAUser);
    // if (this.checkIfErrors()) {
    //   this.Errors.formHasErrors.status = true;
    //   this.Errors.profileUpdated.status = false;
    //   return;
    // } else {
    //   this.Errors.formHasErrors.status = false;
    //   if (OriginalMemberDetails.UserzAccessStatus == 'Rejected') {
    //     if (confirm('Are you sure you want to update these values?\nThis will only update the fields,\nIt ' +
    //       'won\'t allow access to this member unless Allow Access Button clicked.')) {

    //       // this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

    //       setTimeout(() => {
    //         this.usersService.updateThisUser(UpdatedMemberAsAUser, OriginalMemberDetails._id);
    //       }, 750);
    //       this.Errors.profileUpdated.status = true;
    //       updateMemberForm.resetForm();
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 3500);
    //     } else {
    //       return;
    //     }
    //   } else {
    //     if (confirm('Are you sure you want to update these values?')) {
    //       // console.log(OriginalUniDetails._id);
    //       // console.log(OriginalUniDetails.Username);
    //       // this.usersService.updateUsernameOfUserExverywhereBecauseTitleOfUniversityHasBeenChanged(UpdatedUniAsAUser, OriginalUniDetails);

    //       setTimeout(() => {
    //         this.usersService.updateThisUser(UpdatedMemberAsAUser, OriginalMemberDetails._id);
    //       }, 750);
    //       this.Errors.profileUpdated.status = true;
    //       updateMemberForm.resetForm();
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 3500);
    //     } else {
    //       return;
    //     }
    //   }

    // }


  }







  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }



  // EditLabButtonText = "Edit";
  // LabEdit = false;
  // onLabEditToggle() {
  //   if (this.LabEdit == false) {
  //     this.LabEdit = true;
  //     this.EditLabButtonText = "Hide Edit";
  //   } else {
  //     this.EditLabButtonText = "Edit";
  //     this.LabEdit = false;
  //   }
  // }



  DeleteThisLab(lab: Labsmodel) {
    alert('functionality not implemented yet');
  }



  extractRegisteredLabs() {
    // if (this.AffiliatedUniversitiesData.length == 0) {
    for (var i = 0; i < this.AllLabsRecieved.length; i++) {
      if (this.AllLabsRecieved[i].UniversityNameOfLab == this.UNIVERSITY_TITLE) {
        this.RegisteredLabs.push(this.AllLabsRecieved[i]);
      }
    }

  }


  extractLabInstructorzFNandLN(UsernameOfLabInstructor: string) {
    this.LabInstructorzFN = '';
    this.LabInstructorzLN = '';
    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      console.log("this.AllUsersRecieved[i].Username ===> ", this.AllUsersRecieved[i].Username);
      console.log("UsernameOfLabInstructor ===> ", UsernameOfLabInstructor);
      if (this.AllUsersRecieved[i].Username == UsernameOfLabInstructor) {
        this.LabInstructorzFN = this.AllUsersRecieved[i].FirstNameOfUser;
        this.LabInstructorzLN = this.AllUsersRecieved[i].LastNameOfUser;
      }
    }


  }
  extractAffiliatedInstructors() {
    // if (this.AffiliatedUniversitiesData.length == 0) {
    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      if ((this.AllUsersRecieved[i].UserType != 'university' || 'admin')
        && this.AllUsersRecieved[i].UniversityNameOfUser == this.UNIVERSITY_TITLE) {

        // if (this.AllUsersRecieved[i].UserzAccessStatus == 'Rejected') { this.RejectedMembers.push(this.AllUsersRecieved[i]); }


        // if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
        //   && this.AllUsersRecieved[i].UserType == 'student') { this.RegisteredStudents.push(this.AllUsersRecieved[i]); }

        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
          && this.AllUsersRecieved[i].UserType == 'teacher') { this.RegisteredFaculty.push(this.AllUsersRecieved[i]); }


      }
    }
    // }

  }

  on_CreateLabSubmitButton_Clicked(createLabForm: NgForm, onInstructorsSelectChange: HTMLSelectElement) {
    // this.Errors.LabInstructorNotSelected.status


    const Lab: Labsmodel = {
      LabClass: createLabForm.value.LabClassnSection,
      LabProgram: createLabForm.value.DegreeProgram,
      LabInstructor: onInstructorsSelectChange.value,
      LabTitle: createLabForm.value.LabTitle,
      UniversityNameOfLab: this.fetchedUni[0].TitleOfUniversity,
      _id: null
    };

    this.checkDegreeProgram(Lab.LabProgram);
    this.checkLabClassSection(Lab.LabClass);
    this.checkLabTitle(Lab.LabTitle);
    this.onInstructorsSelectChange(onInstructorsSelectChange);
    if (!this.checkIfErrors()) {
      this.Errors.LabCreated.status = true;
      console.log('on_CreateLabSubmitButton_Clicked(createLabForm: NgForm) clicked : Lab ==> ', Lab);
      this.labsService.createLab(Lab);
    }
  }


  // Instructors = [{
  //   Username: 'RizwanRashid412', FirstNameOfUser: 'Rizwan', LastNameOfUser: 'Rashid'
  // }, { Username: 'Rashid365Mukhtar', FirstNameOfUser: 'Rashid', LastNameOfUser: 'Mukhtar' }, { Username: 'KulsoomMajid78451', FirstNameOfUser: 'Kulsoom', LastNameOfUser: 'Majid' }];

  onInstructorsSelectChange(onInstructorsSelectChange: HTMLSelectElement) {
    if (onInstructorsSelectChange.value == 'Not Listed!') {
      this.Errors.InstructorNotListed.status = true;
      this.showInstructorChangingWarning = false;
    } else {
      this.Errors.InstructorNotListed.status = false;
      this.showInstructorChangingWarning = true;
    }


    if (onInstructorsSelectChange.value == 'Choose an Instructor') {
      this.Errors.LabInstructorNotSelected.status = true;
    } else { this.Errors.LabInstructorNotSelected.status = false; }


  }





  onInstructorsSelectChangeforCreateLab(onInstructorsSelectChange: HTMLSelectElement) {
    if (onInstructorsSelectChange.value == 'Not Listed!') {
      this.Errors.InstructorNotListedforCreateLab.status = true;
    } else {
      this.Errors.InstructorNotListedforCreateLab.status = false;
    }


    if (onInstructorsSelectChange.value == 'Choose an Instructor') {
      this.Errors.LabInstructorNotSelected.status = true;
    } else { this.Errors.LabInstructorNotSelected.status = false; }


  }






  checkLabTitle(LabTitle: string) {
    if (LabTitle.length == 0) { this.Errors.emptyField.status = true; }
    else { this.Errors.emptyField.status = false; }

    if (LabTitle.length < 4) { this.Errors.invalidLabTitle.status = true; }
    else { this.Errors.invalidLabTitle.status = false; }
  }


  checkDegreeProgram(DegreeProgram: string) {
    if (DegreeProgram.length == 0) { this.Errors.emptyField.status = true; }
    else { this.Errors.emptyField.status = false; }

    if (DegreeProgram.length < 3) { this.Errors.invalidDegreeProgram.status = true; }
    else { this.Errors.invalidDegreeProgram.status = false; }
  }


  checkLabClassSection(LabClassSection: string) {
    if (LabClassSection.length == 0) { this.Errors.emptyField.status = true; }
    else { this.Errors.emptyField.status = false; }

    if (LabClassSection.length < 2) { this.Errors.invalidLabClassSection.status = true; }
    else { this.Errors.invalidLabClassSection.status = false; }
  }



  setAllErrorsToFalse() {
    this.showInstructorChangingWarning = true;
    this.Errors.InstructorNotListedforCreateLab.status = false;
    this.Errors.InstructorNotListed.status = false;
    this.Errors.emptyField.status = true;
    this.Errors.LabCreated.status = false;
    this.Errors.LabInstructorNotSelected.status = false;
    // this.Errors.formHasErrors.status = false;
    this.Errors.invalidDegreeProgram.status = false;
    this.Errors.invalidLabClassSection.status = false;
    this.Errors.invalidLabTitle.status = false;
    this.Errors.labUpdated.status = false;
    this.Errors.labDeleted.status = false;
  }

  checkIfErrors(): boolean {
    return (
      this.Errors.InstructorNotListedforCreateLab.status ||
      this.Errors.InstructorNotListed.status ||
      this.Errors.emptyField.status ||
      this.Errors.LabCreated.status ||
      this.Errors.labDeleted.status ||
      // this.Errors.formHasErrors.status ||
      this.Errors.invalidDegreeProgram.status ||
      this.Errors.invalidLabTitle.status ||
      this.Errors.LabInstructorNotSelected.status ||
      this.Errors.invalidLabClassSection.status ||
      this.Errors.labUpdated.status
    )

  }


  Errors = {
    InstructorNotListedforCreateLab: {
      status: true,
      message: 'Ask the instructor to register with GBCL first or create the profile for them.',
    },
    InstructorNotListed: {
      status: true,
      message: 'Ask the instructor to register with GBCL first or create the profile for them.',
    },
    LabInstructorNotSelected: {
      status: true,
      message: 'Lab Instructor must be selected.',
    },
    invalidLabClassSection: {
      status: true,
      message:
        'This field must be atleast 2 characters long.',
    },
    emptyField: {
      status: true,
      message: 'One or more fields are empty.',
    },
    // formHasErrors: {
    //   status: true,
    //   message: 'Form has errors, kindly resolve them first.\nProfile not created yet.',
    // },
    labDeleted: {
      status: true,
      message:
        'Lab has been deleted successfully.',
    },
    labUpdated: {
      status: true,
      message:
        'Lab details updated successfully.',
    },
    invalidLabTitle: {
      status: true,
      message:
        'Title must be atleast 4 characters long.',
    },
    invalidDegreeProgram: {
      status: true,
      message:
        'Class must be atleast 3 characters long.',
    },
    LabCreated: {
      status: true,
      message:
        'Lab created successfully.',
    }
  };











  //===========================================================================
  //===========================================================================
  //=====================      DUMMY DATA
  //===========================================================================
  //===========================================================================
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



}
