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
  LabID = localStorage.getItem("LabID");

  MCQ_ChallengesToEvaluate = [{_id:'12aa25',title:'title A'}, {_id:'12aadww25',title:'title B'}];
  nonMCQ_ChallengesToEvaluate = [{_id:'12aa25',title:'title A'}, {_id:'12aadww25',title:'title B'}];





  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }

}
