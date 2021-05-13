import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-universities',
  templateUrl: './manage-universities.component.html',
  styleUrls: ['./manage-universities.component.css']
})
export class ManageUniversitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Unis = [
    {uniTitle: 'CUI Isb', id: 'ab', status: 'allowed'},
    {uniTitle: 'CUI Lhr', id: 'bc', status: 'allowed'},
    {uniTitle: 'CUI Wah', id: 'cd', status: 'allowed'},
    {uniTitle: 'CUI Vehari', id: 'de', status: 'allowed'},
    {uniTitle: 'CUI Taxila', id: 'ef', status: 'allowed'                                                                          }
];


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


EditButtonToggled = false;
EditButtonText = "Edit";

onEditButtonToggle(){

  if(this.EditButtonToggled == false){
    this.EditButtonText = "Hide Editing";
    this.EditButtonToggled = true;
  }else{
    this.EditButtonText = "Edit";
    this.EditButtonToggled = false;
  }

}


}
