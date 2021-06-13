import { Component, OnInit } from '@angular/core';
import { LabNumbersModel } from 'src/app/MODELS/Lab-Frontend-Models/LabNumbersmodel.model';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { LabTasksService } from 'src/app/Services/lab-tasks.service';
import { LabsService } from 'src/app/Services/labs.service';


@Component({
  selector: 'app-tviewalllabs',
  templateUrl: './tviewalllabs.component.html',
  styleUrls: ['./tviewalllabs.component.css']
})
export class TviewalllabsComponent implements OnInit {

  constructor(private labsService:LabsService, private labTasksService:LabTasksService) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.localStorageUsername = localStorage.getItem("UsersUsername");
    this.LabNumbers = this.labsService.fetchLabNumbersOfThisLab(this.LabID);
    this.LabTaskzz = this.labTasksService.getAllLabTasksOfThisLabFromDB({LabJoinCode:this.LabID});
  }

  LabID:string = '';
  localStorageUsername: string = '';

  CURRENT_LABNUMBERZ_TASKS:LabTasksmodel[] = [];
  extractLabTasksOfThisLabNumber(LabNumber:LabNumbersModel){
    console.log("this.LabTaskzz : ",this.LabTaskzz);
    this.CURRENT_LABNUMBERZ_TASKS = [];
    for(let i=0; i<this.LabTaskzz.length;i++){
      for(let j=0; j<LabNumber.LabTaskIds.length;j++){
        if(this.LabTaskzz[i]._id.includes(LabNumber.LabTaskIds[j])){
          this.CURRENT_LABNUMBERZ_TASKS.push(this.LabTaskzz[i]);
        }
      }
    }
  }

  LabNumbers: LabNumbersModel[] = [
    // {LabJoinCode:'123456789', LabNumber:1, LabTaskIds: ['123','126'], _id:'123456'},
    // {LabJoinCode:'123456789', LabNumber:2, LabTaskIds: ['124','125'], _id:'123457'},
    // {LabJoinCode:'123456789', LabNumber:3, LabTaskIds: ['127','128'], _id:'123458'},
];


  LabTaskzz:LabTasksmodel[] = [
    // {_id:'123', LabJoinCode:'abc123', LabTaskQuestion: 'Question 1', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 1 ', LabTaskTitle:'title 1', LabTaskXPs:20},
    // {_id:'124', LabJoinCode:'abc123', LabTaskQuestion: 'Question 2', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 2 ', LabTaskTitle:'title 2', LabTaskXPs:20},
    // {_id:'125', LabJoinCode:'abc123', LabTaskQuestion: 'Question 3', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 3 ', LabTaskTitle:'title 3', LabTaskXPs:20},
    // {_id:'126', LabJoinCode:'abc123', LabTaskQuestion: 'Question 4', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 4 ', LabTaskTitle:'title 4', LabTaskXPs:10},
    // {_id:'127', LabJoinCode:'abc123', LabTaskQuestion: 'Question 5', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 5 ', LabTaskTitle:'title 5', LabTaskXPs:20},
    // {_id:'128', LabJoinCode:'abc123', LabTaskQuestion: 'Question 6', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 6 ', LabTaskTitle:'title ++6', LabTaskXPs:20},
  ];





  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/TEACHER"
  }
}
