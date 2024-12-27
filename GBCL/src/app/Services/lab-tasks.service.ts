import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabTasksmodel } from '../MODELS/Lab-Frontend-Models/labTasksmodel.model';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class LabTasksService {

  constructor(private http:HttpClient) { }


  // //FOLLOWING CODE only used in "STUDENT/AllLabs"
  // private TASK_ATTEMPTING_IN_CPA:LabTasksmodel;
  // setCurrentLabTaskAttemptingInCPA(task: LabTasksmodel) {

  //   this.TASK_ATTEMPTING_IN_CPA = {AttemptedByStudents:['##','@@@'],_id:'@@@@',TaskBeingAttempted:false, LabJoinCode:'@@@@@@', LabTaskAnswer:'@@@@@', LabTaskQuestion:'@@@@', LabTaskTitle:'@@@@', LabTaskXPs:-1};
  //   let v = task.AttemptedByStudents;
  //   this.TASK_ATTEMPTING_IN_CPA.AttemptedByStudents = task.AttemptedByStudents;
  //   this.TASK_ATTEMPTING_IN_CPA.LabJoinCode = task.LabJoinCode;
  //   this.TASK_ATTEMPTING_IN_CPA.TaskBeingAttempted = task.TaskBeingAttempted;
  //   this.TASK_ATTEMPTING_IN_CPA.LabTaskAnswer = task.LabTaskAnswer;
  //   this.TASK_ATTEMPTING_IN_CPA.LabTaskQuestion = task.LabTaskQuestion;
  //   this.TASK_ATTEMPTING_IN_CPA.LabTaskTitle = task.LabTaskTitle;
  //   this.TASK_ATTEMPTING_IN_CPA.LabTaskXPs = task.LabTaskXPs;
  //   this.TASK_ATTEMPTING_IN_CPA._id = task._id;

  //   console.log("this.TASK_ATTEMPTING_IN_CPA   ::" ,this.TASK_ATTEMPTING_IN_CPA);
  // }

  // getCurrentLabTaskAttemptingInCPA(): LabTasksmodel {
  //   return this.TASK_ATTEMPTING_IN_CPA;
  // }
  // //ABOVE CODE only used in "STUDENT/AllLabs"




  createLabTask(labtask: LabTasksmodel):LabTasksmodel[] {
    console.log("labtask: LabTasksmodel from service : ", labtask);

    let labTask:LabTasksmodel[] = [];
    this.http
      .post<{ message: string; JustCreatedLabTask: LabTasksmodel }>(BASE_URL+'/api/LabTasks/CreateLabTask', labtask)
      .subscribe((responseData) => {
        labTask.push(responseData.JustCreatedLabTask);
        console.log("responseData from service : ", responseData);
      });
  return labTask;
  }



  DeletThisLabTask(labTaskId: string) {
    this.http.delete(BASE_URL+"/api/LabTasks/DeleteThisLabTask/" + labTaskId).subscribe(
      response => {
        console.log(response);
      }
    );

  }


  getAllLabTasksOfThisLabFromDB(objLabID: { LabJoinCode: string }): LabTasksmodel[] {
    let allLabtasksOfthislabFromDB: LabTasksmodel[] = [];
    this.http
      .post<{ message: string; AllLabTasksOfThisLabFromDB: LabTasksmodel[] }>(
        BASE_URL+'/api/LabTasks/getAllLabTasksOfThisLabFromDB', objLabID
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllLabTasksOfThisLabFromDB).length; i++) {
          allLabtasksOfthislabFromDB.push(responseData.AllLabTasksOfThisLabFromDB[i]);
        }
      });
    return allLabtasksOfthislabFromDB;

  }






  GetAllLabTasksFromDB(): LabTasksmodel[] {

    let AllLabTasks: LabTasksmodel[] = [];
    this.http
      .get<{ message: string; labTasks: LabTasksmodel[] }>(
        BASE_URL+'/api/LabTasks/GetAllLabTasksFromDB'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.labTasks).length; i++) {
          AllLabTasks.push(responseData.labTasks[i]);
        }
      });


    return AllLabTasks;

  }




  updateThisLabTask(UpdatedLabTask: LabTasksmodel) {
    console.log("loooooooooooooooooooooog");
    this.http.put(BASE_URL+"/api/LabTasks/UpdateThisLabTask/", UpdatedLabTask).subscribe(
      response => {
        console.log(response);
      });
  }


}
