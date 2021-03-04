import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  

  Unis = [
    {uniTitle: 'CUI Isb', id: 'ab'},
    {uniTitle: 'CUI Lhr', id: 'bc'},
    {uniTitle: 'CUI Wah', id: 'cd'},
    {uniTitle: 'CUI Vehari', id: 'de'},
    {uniTitle: 'CUI Taxila', id: 'ef'}
]


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

}
