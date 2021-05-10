import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluate-students',
  templateUrl: './evaluate-students.component.html',
  styleUrls: ['./evaluate-students.component.css']
})
export class EvaluateStudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }

}
