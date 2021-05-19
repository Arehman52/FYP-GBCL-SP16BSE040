import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ssettings',
  templateUrl: './ssettings.component.html',
  styleUrls: ['./ssettings.component.css']
})
export class SsettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  localStorageUsername = localStorage.getItem("UsersUsername");
  localStorageFirstName = localStorage.getItem("UserzFirstNameOfUser");
  localStorageLastName = localStorage.getItem("UserzLastNameOfUser");
  localStorageUserzRegistrationNum = localStorage.getItem("UserzRegistrationNumberOfUser");
  localStorageUserzUniversity = localStorage.getItem("UserzUniversityNameOfUser");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }
}
