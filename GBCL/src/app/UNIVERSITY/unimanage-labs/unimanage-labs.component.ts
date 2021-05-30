import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Labsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labsmodel.model';
import { LabJoinRequestsmodel } from 'src/app/MODELS/Lab-Frontend-Models/labJoinRequestsmodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { Usersmodel } from 'src/app/MODELS/Usersmodel.model';
import { LabsService } from 'src/app/Services/labs.service';
import { UsersService } from 'src/app/Services/users.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';


@Component({
  selector: 'app-unimanage-labs',
  templateUrl: './unimanage-labs.component.html',
  styleUrls: ['./unimanage-labs.component.css']
})
export class UnimanageLabsComponent implements OnInit {

  constructor(private studentLabDataService:StudentLabDataService, private usersService: UsersService, private labsService: LabsService) { }

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
      this.populateMemberLabJoinRequests();
    }, 1500);
  }


  private fetchedUni: Usersmodel[] = [];
  private AllUsersRecieved: Usersmodel[] = [];
  private AllLabsRecieved: Labsmodel[] = [];
  public RegisteredFaculty: Usersmodel[] = [];
  public RegisteredLabs: Labsmodel[] = [];
  Users_WhoAppliedFor_LabAccess: Usersmodel[] = [];
  Users_ViewLabMembers: Usersmodel[] = [];
  localStorageUsername: string;
  UsernameObj: { Username: string } = { Username: localStorage.getItem("UsersUsername") };
  UNIVERSITY_TITLE: string;
  LabEdit = false;
  EditLabButtonText = "Edit";
  showInstructorChangingWarning = true;
  viewLabMembersToggled = false;
  LabInstructorzFN: string;
  LabInstructorzLN: string;


  MembersLabJoinRequests: LabJoinRequestsmodel[] =
    [
      // {LabJoinCode: '254ax',LabAccessStatus: 'Applied',LabTitle: 'Introduction to Java', UserFN: 'Bilal', UserLN: 'Khursheed', UserType: 'student',RegN: '254ax',LabInstructor:'Farooq Iqbal',_id:'cdsdddd'}
    ];



  viewLabMembersToggle() {
    if (this.viewLabMembersToggled == false) { // means button is clicked to view members
      this.viewLabMembersToggled = true;

    } else {
      this.viewLabMembersToggled = false;
    }
  }


  extract_ViewLabMembers_onViewLabMembersClicked(lab: Labsmodel) {


    this.LabInstructorzFN = '';
    this.LabInstructorzLN = '';
    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      // console.log("this.AllUsersRecieved[i].Username ===> ", this.AllUsersRecieved[i].Username);
      // console.log("UsernameOfLabInstructor ===> ", UsernameOfLabInstructor);
      if (this.AllUsersRecieved[i].Username == lab.LabInstructor) {
        this.LabInstructorzFN = this.AllUsersRecieved[i].FirstNameOfUser;
        this.LabInstructorzLN = this.AllUsersRecieved[i].LastNameOfUser;
      }
    }






    this.Users_ViewLabMembers = [];
    // if(this.viewLabMembersToggled == false){ // means button is clicked to view members
    //   this.viewLabMembersToggled = true;

    let arrayAllUsersRecieved_i_LabJoinCodesOfJoinedLab: string[] = [];
    // lab._id;
    // this.Users_ViewLabMembers;
    for (let i = 0; i < this.AllUsersRecieved.length; i++) {
      arrayAllUsersRecieved_i_LabJoinCodesOfJoinedLab = this.AllUsersRecieved[i].LabJoinCodesOfJoinedLabs;


      for (let j = 0; j < arrayAllUsersRecieved_i_LabJoinCodesOfJoinedLab.length; j++) {
        if (arrayAllUsersRecieved_i_LabJoinCodesOfJoinedLab[j] == lab._id) {
          this.Users_ViewLabMembers.push(this.AllUsersRecieved[i]);
        }
      }
    }

    // console.log(this.Users_ViewLabMembers);

  }



  populateMemberLabJoinRequests() {
    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      if (this.AllUsersRecieved[i].UniversityNameOfUser == this.UNIVERSITY_TITLE) {
        //show lab join request of user only if he is allowed
        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
          && this.AllUsersRecieved[i].UserType == 'teacher' || 'student') {
          this.Users_WhoAppliedFor_LabAccess.push(this.AllUsersRecieved[i]);
        }
      }
    }
    // Users_WhoAppliedFor_LabAccess filled with Users till here.
    let AppliedJoinCodesOfCurrent_i_User: string[] = [];

    for (let i = 0; i < this.Users_WhoAppliedFor_LabAccess.length; i++) {
      //all lab join codes of one user below  [string]
      AppliedJoinCodesOfCurrent_i_User = this.Users_WhoAppliedFor_LabAccess[i].LabJoinCodesOfAppliedLabs
      //AppliedJoinCodesOfCurrent_i_User ==> ['lab01' , 'lab02' , 'lab03' , 'lab04' ]
      for (let j = 0; j < this.AllLabsRecieved.length; j++) {
        for (let k = 0; k < AppliedJoinCodesOfCurrent_i_User.length; k++) {
          if (AppliedJoinCodesOfCurrent_i_User[k] == this.AllLabsRecieved[j]._id) {
            //populate here.
            let one_labjoinrequests: LabJoinRequestsmodel = {
              LabAccessStatus: 'Applied', LabInstructor: this.AllLabsRecieved[j].LabInstructor, RegN: this.Users_WhoAppliedFor_LabAccess[i].RegistrationNumberOfUser, UserFN: this.Users_WhoAppliedFor_LabAccess[i].FirstNameOfUser, UserLN: this.Users_WhoAppliedFor_LabAccess[i].LastNameOfUser, UserType: this.Users_WhoAppliedFor_LabAccess[i].UserType, LabJoinCode: this.AllLabsRecieved[j]._id, LabTitle: this.AllLabsRecieved[j].LabTitle, _Userzid: this.Users_WhoAppliedFor_LabAccess[i]._id, UserzUsername: this.Users_WhoAppliedFor_LabAccess[i].Username
            }
            this.MembersLabJoinRequests.push(one_labjoinrequests);
          }
        }
      }



      // labjoinrequests this.AllLabsRecieved;
    }










  }


  onAcceptLabJoinRequestButtonClicked(MemberLabJoinRequest: LabJoinRequestsmodel) {
    if (confirm("Are you sure you want to accept lab request of \nthis user: " + MemberLabJoinRequest.UserFN + " " + MemberLabJoinRequest.UserLN)) {
      let objUsername: { Username: string } = { Username: MemberLabJoinRequest.UserzUsername };
      let Member: Usersmodel[] = [];
      Member = this.usersService.FetchThisUser(objUsername);
      setTimeout(() => {
        let newLabJoinCodesOfAppliedLabs: string[] = [];
        for (let i = 0; i < Member[0].LabJoinCodesOfAppliedLabs.length; i++) {
          if (Member[0].LabJoinCodesOfAppliedLabs[i] != MemberLabJoinRequest.LabJoinCode) {
            newLabJoinCodesOfAppliedLabs.push(Member[0].LabJoinCodesOfAppliedLabs[i]);
          }
        }


        Member[0].LabJoinCodesOfAppliedLabs = [...newLabJoinCodesOfAppliedLabs];
        Member[0].LabJoinCodesOfJoinedLabs.push(MemberLabJoinRequest.LabJoinCode);


        let studLabDataAndStatsFreshRecord: StudLabDataAndStatsmodel = {
          _id: '', Appreciated: false, LabJoinCode: MemberLabJoinRequest.LabJoinCode, LevelUpdateViewed: false,Promoted:false, Demoted:false, RivalStudents: [],
          StudentzLabAccessStatus: 'Allowed', StudentzUsername: Member[0].Username, StudentzFN: Member[0].FirstNameOfUser,StudentzLN: Member[0].LastNameOfUser, Warned: false,
          currentBadge: 'Beginner I', currentCPPs: 0, currentLevel: 0, currentXPs: 0
        };

        this.studentLabDataService.createFreshStudentLabDataRecord(studLabDataAndStatsFreshRecord);
        this.usersService.updateThisUser(Member[0], Member[0]._id);
      }, 3500);

      this.Errors.labJoinRequestAccepted.status = true;
      setTimeout(() => { window.location.reload() }, 4000);
    }

  }



  onDeleteLabJoinRequestButtonClicked(MemberLabJoinRequest: LabJoinRequestsmodel) {
    if (confirm("Are you sure you want to DELETE lab request of \nthis user: " + MemberLabJoinRequest.UserFN + " " + MemberLabJoinRequest.UserLN)) {
      let objUsername: { Username: string } = { Username: MemberLabJoinRequest.UserzUsername };
      let Member: Usersmodel[] = [];
      Member = this.usersService.FetchThisUser(objUsername);
      setTimeout(() => {
        let newLabJoinCodesOfAppliedLabs: string[] = [];
        for (let i = 0; i < Member[0].LabJoinCodesOfAppliedLabs.length; i++) {
          if (Member[0].LabJoinCodesOfAppliedLabs[i] == MemberLabJoinRequest.LabJoinCode) {
            console.log('Member[0].LabJoinCodesOfAppliedLabs[i] ==>', Member[0].LabJoinCodesOfAppliedLabs[i]);
            console.log('MemberLabJoinRequest.LabJoinCode ==>', MemberLabJoinRequest.LabJoinCode);
          } else {
            newLabJoinCodesOfAppliedLabs.push(Member[0].LabJoinCodesOfJoinedLabs[i]);
          }
        }


        console.log('BEFORE Del=== Member[0].LabJoinCodesOfJoinedLabs', Member[0].LabJoinCodesOfAppliedLabs);
        // Member[0].LabJoinCodesOfJoinedLabs = [];
        Member[0].LabJoinCodesOfAppliedLabs = [...newLabJoinCodesOfAppliedLabs];
        console.log('AFTER Del=== Member[0].LabJoinCodesOfJoinedLabs', Member[0].LabJoinCodesOfAppliedLabs);
        this.usersService.updateThisUser(Member[0], Member[0]._id);
      }, 3500);

      this.Errors.labJoinRequestDeleted.status = true;
      setTimeout(() => { window.location.reload() }, 4000);
    }
  }

  onLabEditToggle(LabEditForm: NgForm) {
    this.setAllErrorsToFalse();
    // this.extractLabInstructorzFNandLN(UsernameOfLabInstructor);


    if (this.LabEdit == false) {
      this.LabEdit = true;
      this.EditLabButtonText = "Hide Edit";
    } else {
      this.EditLabButtonText = "Edit";
      this.LabEdit = false;
    }
  }









  setAllErrorsToFalse() {
    this.showInstructorChangingWarning = true;
    this.Errors.labJoinRequestDeleted.status = false;
    this.Errors.labJoinRequestAccepted.status = false;
    this.Errors.InstructorNotListedforCreateLab.status = false;
    this.Errors.InstructorNotListed.status = false;
    this.Errors.emptyField.status = false;
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
      // this.showInstructorChangingWarning ||
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



  onSubmit_UpdateButton(updateLabForm: NgForm, OriginalLabDetails: Labsmodel, onInstructorsSelectChange: HTMLSelectElement) {

    this.Errors.LabInstructorNotSelected.status = false;


    // console.log("OriginalLabDetails.LabInstructor == >", OriginalLabDetails.LabInstructor);
    // console.log("onInstructorsSelectChange.value == >", onInstructorsSelectChange.value);
    // if (OriginalLabDetails.LabInstructor == onInstructorsSelectChange.value) {
    //   alert('OriginalLabDetails.LabInstructor == onInstructorsSelectChange.value\n' +
    //     'OriginalLabDetails.LabInstructor = ' + OriginalLabDetails.LabInstructor +
    //     "\nonInstructorsSelectChange.value = " + onInstructorsSelectChange.value);
    // }

    // console.log("updateLabForm.value.LabTitle == >", updateLabForm.value.LabTitle);
    // console.log("updateLabForm.value.LabClass == >", updateLabForm.value.LabClassSection);
    //hopefully alert in this IF's Else will never be triggered....
    if (updateLabForm.value.LabTitle == ''
      && updateLabForm.value.DegreeProgram == ''
      && updateLabForm.value.LabClassSection == ''

    ) {
      alert('You can\'t update empty fields');
      return;
    }



    // console.log("OriginalLabDetails.LabTitle == >", updateLabForm.value.LabTitle);
    // console.log("OriginalLabDetails.LabProgram == >", OriginalLabDetails.LabProgram);
    // console.log("OriginalLabDetails.LabClass == >", OriginalLabDetails.LabClass);
    // console.log("OriginalLabDetails.LabInstructor == >", OriginalLabDetails.LabInstructor);
    // console.log("onInstructorsSelectChange.value == >", onInstructorsSelectChange.value);
    // console.log("OriginalLabDetails.LabInstructor == onInstructorsSelectChange.value == >", OriginalLabDetails.LabInstructor == onInstructorsSelectChange.value);
    //===============================================
    //===============================================
    // console.log("updateLabForm.value.LabTitle == OriginalLabDetails.LabTitle == >", updateLabForm.value.LabTitle == OriginalLabDetails.LabTitle);
    // console.log("updateLabForm.value.DegreeProgram == OriginalLabDetails.LabProgram == >", updateLabForm.value.DegreeProgram == OriginalLabDetails.LabProgram);
    // console.log("updateLabForm.value.LabClass == OriginalLabDetails.LabClass == >", updateLabForm.value.LabClassSection == OriginalLabDetails.LabClass);
    // console.log("(onInstructorsSelectChange.value == OriginalLabDetails.LabInstructor" +
    // "|| onInstructorsSelectChange.value == 'Change Instructor') == >", (onInstructorsSelectChange.value == OriginalLabDetails.LabInstructor || onInstructorsSelectChange.value == 'Change Instructor'));
    // console.log("onInstructorsSelectChange.value == >", onInstructorsSelectChange.value);
    // console.log("OriginalLabDetails.LabInstructor == >", OriginalLabDetails.LabInstructor);

    if (updateLabForm.value.LabTitle == OriginalLabDetails.LabTitle
      && updateLabForm.value.DegreeProgram == OriginalLabDetails.LabProgram
      && updateLabForm.value.LabClassSection == OriginalLabDetails.LabClass
      && (onInstructorsSelectChange.value == OriginalLabDetails.LabInstructor
        || onInstructorsSelectChange.value == 'Change Instructor')
    ) {

      alert('You haven\'t changed any field, same values cannot be updated');
      return;

    } else {

      let UpdatedLab: Labsmodel;

      if (onInstructorsSelectChange.value != OriginalLabDetails.LabInstructor) {
        let labInstructor: Usersmodel[] = [];
        let objUsername: { Username: string } = { Username: onInstructorsSelectChange.value };
        labInstructor = this.usersService.FetchThisUser(objUsername);
        setTimeout(() => {
          UpdatedLab = {
            _id: OriginalLabDetails._id,
            LabClass: updateLabForm.value.LabClassSection,
            LabInstructor: onInstructorsSelectChange.value,
            LabInstructorFN: labInstructor[0].FirstNameOfUser,
            LabInstructorLN: labInstructor[0].LastNameOfUser,
            LabProgram: updateLabForm.value.DegreeProgram,
            LabTitle: updateLabForm.value.LabTitle,
            UniversityNameOfLab: OriginalLabDetails.UniversityNameOfLab
          }

        }, 1200);
      } else {
        UpdatedLab = {
          _id: OriginalLabDetails._id,
          LabClass: updateLabForm.value.LabClassSection,
          LabInstructor: onInstructorsSelectChange.value,
          LabInstructorFN: OriginalLabDetails.LabInstructorFN,
          LabInstructorLN: OriginalLabDetails.LabInstructorLN,
          LabProgram: updateLabForm.value.DegreeProgram,
          LabTitle: updateLabForm.value.LabTitle,
          UniversityNameOfLab: OriginalLabDetails.UniversityNameOfLab
        }
      }


      if (UpdatedLab.LabInstructor == 'Change Instructor') {
        UpdatedLab.LabInstructor = OriginalLabDetails.LabInstructor;
      }
      console.log('UpdatedMemberAsAUser ===> ', UpdatedLab);


      setTimeout(() => {
        this.labsService.updateThisLab(UpdatedLab);
      }, 750);
      this.Errors.labUpdated.status = true;
      updateLabForm.resetForm();
      setTimeout(() => {
        window.location.reload();
      }, 3500);

    }

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
    if (confirm("Are you sure you want to delete this lab :" + lab.LabTitle + '\n'
      + '\nWARNING: IT WILL DELETE ALL ITS RECORDS FOR JOINED MEMBERS')) {
      this.labsService.DeleteThisLab(lab._id);
      var objLabId: { _id: string } = { _id: lab._id };
      var InstructorOfThisLab: Usersmodel[] = [];
      InstructorOfThisLab = this.usersService.FetchInstructorForThisLab(objLabId);
      setTimeout(() => {
        let arrayOfLabJoinCodesOfDownloadedInstructor = [...InstructorOfThisLab[0].LabJoinCodesOfJoinedLabs];
        console.log("arrayOfLabJoinCodesOfDownloadedInstructor ==> ", arrayOfLabJoinCodesOfDownloadedInstructor);


        let newArr: string[] = [];
        for (let i = 0; i < arrayOfLabJoinCodesOfDownloadedInstructor.length; i++) {
          InstructorOfThisLab[0].LabJoinCodesOfJoinedLabs.pop();
          // console.log("arrayOfLabJoinCodesOfDownloadedInstructor[i]",arrayOfLabJoinCodesOfDownloadedInstructor[i]);
          // console.log("lab._id",lab._id);
          if (arrayOfLabJoinCodesOfDownloadedInstructor[i].toString() === lab._id.toString()) {
            // console.log('LabId found in userz LabJoinCodesOfJoinedLabs fiels, now deleting that id.');
          } else {
            newArr.push(arrayOfLabJoinCodesOfDownloadedInstructor[i]);
          }
        }
        console.log("<=====newArr======>", newArr);
        InstructorOfThisLab[0].LabJoinCodesOfJoinedLabs = newArr;
        console.log("<=====InstructorOfThisLab[0].LabJoinCodesOfJoinedLabs======>", InstructorOfThisLab[0].LabJoinCodesOfJoinedLabs);

        this.usersService.updateThisUser(InstructorOfThisLab[0], InstructorOfThisLab[0]._id);


        this.Errors.labDeleted.status = true;
      }, 3500);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    } else {
      return;
    }
  }



  extractRegisteredLabs() {
    // if (this.AffiliatedUniversitiesData.length == 0) {
    for (var i = 0; i < this.AllLabsRecieved.length; i++) {
      if (this.AllLabsRecieved[i].UniversityNameOfLab == this.UNIVERSITY_TITLE) {
        this.RegisteredLabs.push(this.AllLabsRecieved[i]);
      }
    }

  }


  // extractLabInstructorzFNandLN(UsernameOfLabInstructor: string) {
  // this.LabInstructorzFN = '';
  // this.LabInstructorzLN = '';
  // for (var i = 0; i < this.AllUsersRecieved.length; i++) {
  //   // console.log("this.AllUsersRecieved[i].Username ===> ", this.AllUsersRecieved[i].Username);
  //   // console.log("UsernameOfLabInstructor ===> ", UsernameOfLabInstructor);
  //   if (this.AllUsersRecieved[i].Username == UsernameOfLabInstructor) {
  //     this.LabInstructorzFN = this.AllUsersRecieved[i].FirstNameOfUser;
  //     this.LabInstructorzLN = this.AllUsersRecieved[i].LastNameOfUser;
  //   }
  // }


  // }

  extractAffiliatedInstructors() {

    for (var i = 0; i < this.AllUsersRecieved.length; i++) {
      if (this.AllUsersRecieved[i].UniversityNameOfUser == this.UNIVERSITY_TITLE) {


        if (this.AllUsersRecieved[i].UserzAccessStatus == 'Allowed'
          && this.AllUsersRecieved[i].UserType == 'teacher') {

          this.RegisteredFaculty.push(this.AllUsersRecieved[i]);

        }
      }
    }

  }

  on_CreateLabSubmitButton_Clicked(createLabForm: NgForm, onInstructorsSelectChange: HTMLSelectElement) {


    let Lab: Labsmodel;
    let labInstructorFName: string = '';
    let labInstructorLName: string = '';
    // let labInstructor: Usersmodel;
    // let objUsername: { Username: string } = { Username: onInstructorsSelectChange.value };
    console.log("this.AllUsersRecieved" + this.AllUsersRecieved);
    for (let i = 0; i < this.AllUsersRecieved.length; i++) {
      if (this.AllUsersRecieved[i].Username == onInstructorsSelectChange.value) {
        labInstructorFName = this.AllUsersRecieved[i].FirstNameOfUser;
        // labInstructor.FirstNameOfUser = FN;
        labInstructorLName = this.AllUsersRecieved[i].LastNameOfUser;
        // labInstructor.LastNameOfUser = LN;
        // return;
      }
    }

    // labInstructor = this.usersService.FetchThisUser(objUsername);
    // setTimeout(() => {
    Lab = {
      LabClass: createLabForm.value.LabClassnSection,
      LabProgram: createLabForm.value.DegreeProgram,
      LabInstructor: onInstructorsSelectChange.value,
      LabInstructorFN: labInstructorFName,
      LabInstructorLN: labInstructorLName,
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


      var createdLab: Labsmodel[] = [];
      let LabInstructorAsAUser: Usersmodel[] = [];
      const objInstructorUsername: { Username: string } = { Username: Lab.LabInstructor };




      createdLab = this.labsService.createLab(Lab);
      LabInstructorAsAUser = this.usersService.FetchThisUser(objInstructorUsername);


      setTimeout(() => {
        // console.log("createdLab[0]",createdLab[0]);
        // let newLabJoinCodesOfJoinedLabs: string[] = [createdLab._id, "ABDURREHMAN"];
        // let newLabJoinCodesOfJoinedLabs: string[] = [];    <<<================
        // if (LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs != null || undefined) {
        //   for (var i = 0; i < LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs.length; i++) {
        //     // var labid: string = LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs[i].toString();
        //     // console.log("=====labid===",labid);
        //   }
        //   // newLabJoinCodesOfJoinedLabs.push(LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs.toString());
        //   // createdLab
        // }
        // newLabJoinCodesOfJoinedLabs.push(createdLab[0]._id);  <<<================
        // console.log("<========= ==== ======> ");
        // console.log("newLabJoinCodesOfJoinedLabs ==> ",newLabJoinCodesOfJoinedLabs);
        // console.log("newLabJoinCodesOfJoinedLabs.toString() ==> ",newLabJoinCodesOfJoinedLabs.toString());
        // console.log("<========= ==== ======> ");
        // console.log("newLabJoinCodesOfJoinedLabs ==> ",newLabJoinCodesOfJoinedLabs);
        // LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs.push(newLabJoinCodesOfJoinedLabs.toString()); <<<================
        LabInstructorAsAUser[0].LabJoinCodesOfJoinedLabs.push(createdLab[0]._id);
        this.usersService.updateThisUser(LabInstructorAsAUser[0], LabInstructorAsAUser[0]._id);
        // console.log("LabInstructorAsAUser[0] ==> ",LabInstructorAsAUser[0]);
        // this.labsService.setThisUserAsInstructorOfThisLab(Lab);
        setTimeout(() => { window.location.reload() }, 300);
      }, 5500);

    }
    // }, 1200);
  }









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


  Errors = {
    labJoinRequestAccepted: {
      status: true,
      message: 'Lab Join request of this member is Accepted.',
    },
    labJoinRequestDeleted: {
      status: true,
      message: 'Lab Join request of this member is Deleted.',
    },
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
        'Lab and it\'s records have been deleted successfully.',
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
