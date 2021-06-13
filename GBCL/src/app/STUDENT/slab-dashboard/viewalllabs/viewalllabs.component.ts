import { Component, OnInit } from '@angular/core';
import { LabNumbersModel } from 'src/app/MODELS/Lab-Frontend-Models/LabNumbersmodel.model';
import { LabTasksmodel } from 'src/app/MODELS/Lab-Frontend-Models/labTasksmodel.model';
import { StudentAttemptedLabTaskmodel } from 'src/app/MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';
import { StudentzUsernameAndLabJoinCodemodel } from 'src/app/MODELS/Student-Frontend-Models/StudentzUsernameAndLabJoinCodemodel.model';
import { StudLabDataAndStatsmodel } from 'src/app/MODELS/Student-Frontend-Models/StudLabDataAndStatsmodel.model';
import { LabTasksService } from 'src/app/Services/lab-tasks.service';
import { LabsService } from 'src/app/Services/labs.service';
import { StudentAttemptedLabTasksService } from 'src/app/Services/student-attempted-lab-tasks.service';
import { StudentLabDataService } from 'src/app/Services/student-lab-data.service';

@Component({
  selector: 'app-viewalllabs',
  templateUrl: './viewalllabs.component.html',
  styleUrls: ['./viewalllabs.component.css']
})
export class ViewalllabsComponent implements OnInit {

  constructor(private labsService: LabsService,
    private labTasksService: LabTasksService,
    private studentLabDataService: StudentLabDataService,
    private studentAttemptedLabTasksService: StudentAttemptedLabTasksService,
  ) { }

  ngOnInit(): void {
    this.LabID = localStorage.getItem("LabID");
    this.localStorageUsername = localStorage.getItem("UsersUsername");
    this.LabNumbers = this.labsService.fetchLabNumbersOfThisLab(this.LabID);
    // this.LabTaskzz = this.labTasksService.getAllLabTasksOfThisLabFromDB({ LabJoinCode: this.LabID });
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    let StudentzUsernameAndLabID: StudentzUsernameAndLabJoinCodemodel = { LabJoinCode: this.LabID, StudentzUsername: this.localStorageUsername };
    this.STUDz_FETCHED_STATS_FROM_Db = this.studentLabDataService.getCurrentStatsOfThisStudent(StudentzUsernameAndLabID);

    this.showSpinner = true;
    let objLabJoinCode: { LabJoinCode: string } = { LabJoinCode: this.LabID };
    this.AllLabTasksOfThisLabFromDB = this.labTasksService.getAllLabTasksOfThisLabFromDB(objLabJoinCode);
    // this.AllStudentAttemptedLabTasksOfthisStudandThisLab = this.studentAttemptedLabTasksService.RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(this.LabID, this.localStorageUsername);

    setTimeout(() => {
      this.showSpinner = false;
      this.extractUnAttemptedLabTasks();

      // console.log("this.attemptedLabTasks : ",this.attemptedLabTasks);
      // console.log("this.unAttemptedLabTasks : ",this.unAttemptedLabTasks);
      // console.log("this.AllLabTasksOfThisLabFromDB : ",this.AllLabTasksOfThisLabFromDB);
      // console.log("this.AllStudentAttemptedLabTasksOfthisStudandThisLab : ",this.AllStudentAttemptedLabTasksOfthisStudandThisLab);
    }, 1200);

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

  }



  LabID: string;
  localStorageUsername: string = '';
  CURRENT_LABNUMBERZ_TASKS: LabTasksmodel[] = [];

  extractLabTasksOfThisLabNumber(LabNumber: LabNumbersModel) {
    // console.log("this.LabTaskzz : ", this.LabTaskzz);
    this.CURRENT_LABNUMBERZ_TASKS = [];
    for (let i = 0; i < this.unAttemptedLabTasks.length; i++) {
      for (let j = 0; j < LabNumber.LabTaskIds.length; j++) {
        if (this.unAttemptedLabTasks[i]._id.includes(LabNumber.LabTaskIds[j])) {
          this.CURRENT_LABNUMBERZ_TASKS.push(this.unAttemptedLabTasks[i]);
        }
      }
    }
  }

  LabNumbers: LabNumbersModel[] = [
    // {LabJoinCode:'123456789', LabNumber:1, LabTaskIds: ['123','126'], _id:'123456'},
    // {LabJoinCode:'123456789', LabNumber:2, LabTaskIds: ['124','125'], _id:'123457'},
    // {LabJoinCode:'123456789', LabNumber:3, LabTaskIds: ['127','128'], _id:'123458'},
  ];


  // LabTaskzz: LabTasksmodel[] = [
  //   // {_id:'123', LabJoinCode:'abc123', LabTaskQuestion: 'Question 1', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 1 ', LabTaskTitle:'title 1', LabTaskXPs:20},
  //   // {_id:'124', LabJoinCode:'abc123', LabTaskQuestion: 'Question 2', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 2 ', LabTaskTitle:'title 2', LabTaskXPs:20},
  //   // {_id:'125', LabJoinCode:'abc123', LabTaskQuestion: 'Question 3', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 3 ', LabTaskTitle:'title 3', LabTaskXPs:20},
  //   // {_id:'126', LabJoinCode:'abc123', LabTaskQuestion: 'Question 4', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 4 ', LabTaskTitle:'title 4', LabTaskXPs:10},
  //   // {_id:'127', LabJoinCode:'abc123', LabTaskQuestion: 'Question 5', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 5 ', LabTaskTitle:'title 5', LabTaskXPs:20},
  //   // {_id:'128', LabJoinCode:'abc123', LabTaskQuestion: 'Question 6', AttemptedByStudents:['stud'], LabTaskAnswer:'Anser 6 ', LabTaskTitle:'title ++6', LabTaskXPs:20},
  // ];



  onAttemptClicked(task: LabTasksmodel) {
    this.showSpinner = true;
    // console.log("d(task: LabTasksmodel) {d(task: LabTasksmodel) {, ", task);
    task.TaskBeingAttempted = true;
    this.labTasksService.updateThisLabTask(task);
    setTimeout(()=>{window.location.href = "/STUDENT/Lab/CPA"},2500);

  }

  onExitLabClicked() {
    localStorage.removeItem('LabID');
    window.location.href = "/STUDENT";
  }

  onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }












  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////


  showSpinner: boolean = false;
  AllLabTasksOfThisLabFromDB: LabTasksmodel[] = [];
  // AllStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] = [];
  attemptedLabTasks: LabTasksmodel[] = [];
  unAttemptedLabTasks: LabTasksmodel[] = [];
  STUDz_FETCHED_STATS_FROM_Db: StudLabDataAndStatsmodel[];



  extractUnAttemptedLabTasks() {
    this.unAttemptedLabTasks = [];
    this.attemptedLabTasks = [];

    for (let i = 0; i < this.AllLabTasksOfThisLabFromDB.length; i++) {
      if (this.AllLabTasksOfThisLabFromDB[i].AttemptedByStudents.includes(this.localStorageUsername)) {
        this.attemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      } else {
        this.unAttemptedLabTasks.push(this.AllLabTasksOfThisLabFromDB[i]);
      }
    }

  }














}
