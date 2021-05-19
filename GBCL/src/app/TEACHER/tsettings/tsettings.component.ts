import { Component } from '@angular/core';

@Component({
  selector: 'app-tsettings',
  templateUrl: './tsettings.component.html',
  styleUrls: ['./tsettings.component.css']
})
export class TeachersettingsComponent {

  constructor() { }
  labs = [{}];




  localStorageUsername = localStorage.getItem("UsersUsername");
  localStorageFirstName = localStorage.getItem("UserzFirstNameOfUser");
  localStorageLastName = localStorage.getItem("UserzLastNameOfUser");
  localStorageUserzRegistrationNum = localStorage.getItem("UserzRegistrationNumberOfUser");
  localStorageUserzUniversity = localStorage.getItem("UserzUniversityNameOfUser");





  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }


}
