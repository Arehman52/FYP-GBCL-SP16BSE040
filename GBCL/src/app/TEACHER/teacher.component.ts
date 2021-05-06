import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TEACHERComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  labs = [ {title: 'JAVA OOP', Class: 'BSE-2B', Instructor: 'Mr. Ashfaq Hussain Farooqi',
              members: 41} ];



localStorageUsername = localStorage.getItem("UsersUsername");

onLogout(){
  localStorage.clear();
  window.location.href="/";
}


}
