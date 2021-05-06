import { Component } from '@angular/core';

@Component({
  selector: 'app-tsettings',
  templateUrl: './tsettings.component.html',
  styleUrls: ['./tsettings.component.css']
})
export class TeachersettingsComponent {

  constructor() { }
  labs = [ {} ];





localStorageUsername = localStorage.getItem("UsersUsername");

onLogout(){
  localStorage.clear();
  window.location.href="/";
}


}
