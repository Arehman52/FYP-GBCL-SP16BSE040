import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentAttemptedLabTaskmodel } from '../MODELS/Student-Frontend-Models/StudentAttemptedLabTaskmodel.model';

@Injectable({
  providedIn: 'root'
})
export class StudentAttemptedLabTasksService {

  constructor(private http: HttpClient) { }

  RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab(LabJoinCode: string, StudentzUsername: string): StudentAttemptedLabTaskmodel[] {
    let objStudentzUsernameAndLabJoinCode: StudentAttemptedLabTaskmodel = {
      AttemptedLabTask_id: '',
      // LabTaskAnswerByTeacher: '',
      LabTaskTitle: '', LabTaskSolutionByTeacher: '', LabTaskMatchPercentage: 0,
      LabTaskXPs: 0, GainedXPs: 0, LabJoinCode: LabJoinCode, LabTaskAnswerCode: '', LabTaskAnswerInput: '', LabTaskAnswerOutput: '', LabTaskAttempted: false, LabTaskChecked: false, LabTaskQuestion: '', StudentzUsername: StudentzUsername, _id: ''
    };

    var allStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfthisStudandThisLab: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/StudentAttemptedLabTasks/RecieveAllStudentAttemptedLabTasksOfthisStudandThisLab/',
        objStudentzUsernameAndLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfthisStudandThisLab).length; i++) {
          allStudentAttemptedLabTasksOfthisStudandThisLab.push(responseData.AllStudentAttemptedLabTasksOfthisStudandThisLab[i]);
        }
      });
    return allStudentAttemptedLabTasksOfthisStudandThisLab;

  }








  createThisStudentAttemptedLabTask(labTask: StudentAttemptedLabTaskmodel): StudentAttemptedLabTaskmodel[] {
    let arrResult: StudentAttemptedLabTaskmodel[] = [];
    this.http.post<{ message: string, result: StudentAttemptedLabTaskmodel }>('http://localhost:3000/api/StudentAttemptedLabTasks/createThisStudentAttemptedLabTask', labTask)
      .subscribe((responseData) => {
        console.log(responseData);
        arrResult.push(responseData.result);
      });
    return arrResult;

  }


  RecieveAllStudentAttemptedLabTasksOfThisLab(objLabJoinCode: { LabJoinCode: string; }): StudentAttemptedLabTaskmodel[] {
    let allStudentAttemptedLabTasksOfThisLab: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfThisLab: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/StudentAttemptedLabChallenges/RecieveAllStudentAttemptedLabTasksOfThisLab', objLabJoinCode
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfThisLab).length; i++) {
          allStudentAttemptedLabTasksOfThisLab.push(responseData.AllStudentAttemptedLabTasksOfThisLab[i]);
        }
      });

    return allStudentAttemptedLabTasksOfThisLab;
  }







  RecieveAllStudentAttemptedLabTasksOfThisStudent(objStudentzUsername: { StudentzUsername: string; }): StudentAttemptedLabTaskmodel[] {
    let allStudentAttemptedLabTasksOfThisStudent: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .post<{ message: string; AllStudentAttemptedLabTasksOfThisStudent: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api/StudentAttemptedLabTasks/RecieveAllStudentAttemptedLabTasksOfThisStudent', objStudentzUsername
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasksOfThisStudent).length; i++) {
          allStudentAttemptedLabTasksOfThisStudent.push(responseData.AllStudentAttemptedLabTasksOfThisStudent[i]);
        }
      });

    return allStudentAttemptedLabTasksOfThisStudent;
  }













  RecieveAllStudentAttemptedLabTasks(): StudentAttemptedLabTaskmodel[] {
    var alltasks: StudentAttemptedLabTaskmodel[] = [];
    this.http
      .get<{ message: string; AllStudentAttemptedLabTasks: StudentAttemptedLabTaskmodel[] }>(
        'http://localhost:3000/api//api/StudentAttemptedLabTasks/RecieveAllStudentAttemptedLabTasks'
      )
      .subscribe((responseData) => {
        for (let i = 0; i < Object.keys(responseData.AllStudentAttemptedLabTasks).length; i++) {
          alltasks.push(responseData.AllStudentAttemptedLabTasks[i]);
        }
      });
    // console.log('this.AllUsersRecieved FROM SERVICE===>', alltasks);
    return alltasks;

  }








}
