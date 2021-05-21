import { Component, OnInit } from '@angular/core';
import { Usersmodel } from '../MODELS/usersmodel.model';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UNIVERSITYComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.setAllErrorsToFalse();
    this.AllUsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.UsernameObj = { Username: localStorage.getItem("UsersUsername") };
    this.fetchedUni = this.usersService.FetchThisUser2(this.UsernameObj);
    setTimeout(() => {
      this.localStorageUsername = this.fetchedUni[0].Username;
      this.UNIVERSITY_TITLE = this.fetchedUni[0].TitleOfUniversity;
      this.UNIVERSITY_PW = this.fetchedUni[0].Password;
    }, 1200);
  }


  AllUsersRecieved: Usersmodel[];
  localStorageUsername: string;
  UsernameObj: { Username: string } = { Username: localStorage.getItem("UsersUsername") };
  fetchedUni: Usersmodel[];
  UNIVERSITY_TITLE: string;
  private UNIVERSITY_PW: string;

  onSubmit_updatePassword(newPassword: string) {
    //just update
    var updatedUser:Usersmodel = this.fetchedUni[0];
    updatedUser.Password = newPassword;
    console.log('updatedUser with newPassword ====>',updatedUser);
    setTimeout(() => {
      this.usersService.updateThisUser(updatedUser, updatedUser._id);
    }, 750);
    this.Errors.passwordUpdated.status = true;
  }

  onSubmit_updateTitle(newTitle: string) {
    //just update{{localStorageUsername}}
    var OldUser: Usersmodel = this.fetchedUni[0];
    // console.log('OldUser  =====>',OldUser);
    // console.log('newTitle  =====>',newTitle);
    // this.fetchedUni[0]
    var updatedUser: Usersmodel = {...OldUser};
    updatedUser.TitleOfUniversity = newTitle;
    // console.log('updatedUser  =====>',updatedUser);
    // this.fetchedUni[0].TitleOfUniversity = newTitle;
    this.usersService.updateUniversityNameOfUserEverywhereBecauseTitleOfUniversityHasBeenChanged(updatedUser, OldUser);

    setTimeout(() => {
      this.usersService.updateThisUser(updatedUser, this.fetchedUni[0]._id);
    }, 750);
    this.Errors.titleUpdated.status = true;
  }


  checkIfThereAreErrorsForUpdateTitle(): boolean {
    return (this.Errors.invalidTitle.status || this.Errors.uniTitleNotUnique.status
      || this.Errors.titleUpdated.status || this.Errors.emptyTitleField.status);
  }
  checkIfThereAreErrorsForUpdatePassword(): boolean {
    return (this.Errors.invalidPassword.status || this.Errors.matchedWithOldPassword.status || this.Errors.passwordUpdated.status || this.Errors.spacesAreNotAllowed.status || this.Errors.emptyPasswordField.status);
  }

  checkNewTitle(Title: string) {
    if (Title.length < 2) { this.Errors.invalidTitle.status = true; }
    else { this.Errors.invalidTitle.status = false; }

    if (Title.length == 0) { this.Errors.emptyTitleField.status = true; }
    else { this.Errors.emptyTitleField.status = false; }

    if (Title != null) {
      if (this.AllUsersRecieved != null) {
        for (var i = 0; i < Object.keys(this.AllUsersRecieved).length; i++) {
          if (this.AllUsersRecieved[i].UserType == 'university') {
            if (this.AllUsersRecieved[i].TitleOfUniversity.toLowerCase() == Title.toLowerCase()) {
              this.Errors.uniTitleNotUnique.status = true;
              console.log('user was matched');
              return true;
            } else {
              this.Errors.uniTitleNotUnique.status = false;
            }
          }
        }
      }
    }


  }
  checkNewPW(PW: string) {
    //also fetchthisuser and match with old password of this uni/user
    if (PW.length < 8) { this.Errors.invalidPassword.status = true; }
    else { this.Errors.invalidPassword.status = false; }

    if (PW.length == 0) { this.Errors.emptyPasswordField.status = true; }
    else { this.Errors.emptyPasswordField.status = false; }

    if (PW == this.UNIVERSITY_PW) { this.Errors.matchedWithOldPassword.status = true; }
    else { this.Errors.matchedWithOldPassword.status = false; }

    if (PW != PW.replace(/ /g, '')) { this.Errors.spacesAreNotAllowed.status = true; }
    else { this.Errors.spacesAreNotAllowed.status = false; }

  }


  setAllErrorsToFalse() {
    // this.Errors.emptyTitleField.status = false;
    // this.Errors.emptyPasswordField.status = false;
    this.Errors.invalidPassword.status = false;
    this.Errors.invalidTitle.status = false;
    this.Errors.matchedWithOldPassword.status = false;
    this.Errors.passwordUpdated.status = false;
    this.Errors.titleUpdated.status = false;
    this.Errors.spacesAreNotAllowed.status = false;
    this.Errors.uniTitleNotUnique.status = false;
  }


  Errors = {
    emptyPasswordField: {
      status: true,
      message: 'Title should be atleast 2 characters.',
    },
    emptyTitleField: {
      status: true,
      message: 'Title should be atleast 2 characters.',
    },
    invalidTitle: {
      status: true,
      message: 'Title should be atleast 2 characters.',
    },
    uniTitleNotUnique: {
      status: true,
      message: 'This title is taken, Type a different one.',
    },
    matchedWithOldPassword: {
      status: true,
      message: 'This is your old password, this password cannot be updated.',
    },
    invalidPassword: {
      status: true,
      message: 'Password should be atleast 8 characters.',
    },
    spacesAreNotAllowed: {
      status: true,
      message: 'Spaces are not allowed in this field.',
    },
    passwordUpdated: {
      status: true,
      message: 'Password updated successfully.',
    },
    titleUpdated: {
      status: true,
      message: 'Title updated successfully.',
    }
  };



  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

}
