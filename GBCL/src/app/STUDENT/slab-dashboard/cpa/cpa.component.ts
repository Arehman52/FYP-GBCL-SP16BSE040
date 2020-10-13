import { Component } from '@angular/core';

@Component({
  selector: 'app-cpa',
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.css'],
})
export class CpaComponent {
  members = [
    {
      StudentID: 's1',
      status: 'online',
    }
  ];
  tasks = [
    {
      taskID: '1',
      taskTitle: 'Task 01',
      XPsAllocated: '05',
      taskContent: 'This is the content of task 1.',
    },
    {
      taskID: '2',
      taskTitle: 'Task 02',
      XPsAllocated: '10',
      taskContent: 'This is the content of task 2.',
    },
    {
      taskID: '3',
      taskTitle: 'Task 03, Upload the CV in JPEG format in the portal.',
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
}
