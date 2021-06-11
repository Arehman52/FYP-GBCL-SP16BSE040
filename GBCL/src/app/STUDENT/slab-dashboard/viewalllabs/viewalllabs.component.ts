import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewalllabs',
  templateUrl: './viewalllabs.component.html',
  styleUrls: ['./viewalllabs.component.css']
})
export class ViewalllabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.localStorageUsername = localStorage.getItem("UsersUsername");

  }



  LabID: string;
  localStorageUsername: string = '';



  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT";
  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }



}
