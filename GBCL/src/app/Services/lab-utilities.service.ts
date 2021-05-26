import { Injectable } from '@angular/core';
import { LabTasksmodel } from '../MODELS/Lab-Frontend-Models/labTasksmodel.model';

@Injectable({
  providedIn: 'root'
})
export class LabUtilitiesService {

  constructor() { }


  labTasks: LabTasksmodel[] = [
    {
    _id: '1000', LabID:
      '60ad1ff672937f04c4cbbc6b', // Java Beginners
    labTaskXPs: 20, labTaskQuestion: 'write a program to print "hello world!." on console', labTaskAnswer: 'print("Hello World!")', labTaskTitle: 'write a program to print'
  },
    {
    _id: '1002', LabID:
      '60acfa627528b30d4448f0e7', // Java Beginners
    labTaskXPs: 20, labTaskQuestion: 'write a program to print your registration.', labTaskAnswer: 'print("SPxx-BSE-xxx")', labTaskTitle: 'write a program to print your'
  },
    {
    _id: '1004', LabID:
      '60acfa627528b30d4448f0e7', // Java Beginners
    labTaskXPs: 20, labTaskQuestion: 'write a program to print to sum 5 and 35.', labTaskAnswer: 'print("Sum of 5 and 35 = "+Math.add(5,35))', labTaskTitle: 'write a program to print'
  },
    {
    _id: '1003', LabID:
      '60ad1ff672937f04c4cbbc6b', // Java Beginners
    labTaskXPs: 20, labTaskQuestion: 'write a program to find even and odd numbers.', labTaskAnswer: '', labTaskTitle: 'write a program to find even'
  },
];


  getLabTasks(): LabTasksmodel[] {
    return this.labTasks;
  }

  creatNewTask(labTask: LabTasksmodel) {
    this.labTasks.push(labTask);
    console.log('this.labTasks',this.labTasks);
  }



  deleteTask(taskId: string) {
    let newcopyOflabTasks: LabTasksmodel[] = [];

    for (let i = 0; i < this.labTasks.length; i++) {
      if (this.labTasks[i]._id.includes(taskId)) {
        console.log("Task deleted: ", this.labTasks[i]);
      } else {
        newcopyOflabTasks.push(this.labTasks[i]);
      }
    }



    console.log("After Loop this.labTasks ", this.labTasks);
    console.log("After Loop newcopyOflabTasks <===>  <===>: ", newcopyOflabTasks);
    this.labTasks = [];
    console.log("After this.labTasks = []; ==> this.labTasks ", this.labTasks);
    this.labTasks = newcopyOflabTasks;
    console.log("After this.labTasks = newcopyOflabTasks; ==> this.labTasks ", this.labTasks);





  }
}
