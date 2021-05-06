import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.css']
})
export class ManageChallengesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }





localStorageUsername = localStorage.getItem("UsersUsername");

onLogout(){
  localStorage.clear();
  window.location.href="/";
}

}
