import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CpasService } from './cpas.service';

@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent {

  constructor(private cpasService: CpasService){}



  tasks = [
    {
      taskID: '1',
      taskTitle: 'Task 01',
      XPsAllocated: '05',
      taskContent: 'Create a String variable and store the text "Hello World!"',
    },
    {
      taskID: '2',
      taskTitle: 'Task 02',
      XPsAllocated: '10',
      taskContent: 'Create an array of fruits having five different fruits in it.',
    },
    {
      taskID: '3',
      taskTitle: 'Task 03',
      XPsAllocated: '05',
      taskContent: 'This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.This is the content of task 3.',
    },
    {
      taskID: '4',
      taskTitle: 'Task 04',
      XPsAllocated: '25',
      taskContent: 'This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.This is the content of task 4.',
    },
  ];



  OutputConsole = 'The output of the program will be displayed here!';

  onRunClicked(codeForm: NgForm){

    var results = this.cpasService.RunTheCOde(codeForm.value.Code);

    console.log(results);
    this.OutputConsole = results.toString();
  }




localStorageUsername = localStorage.getItem("UsersUsername");

onLogout(){
  localStorage.clear();
  window.location.href="/";
}




}
