import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-labtasks',
  templateUrl: './manage-labtasks.component.html',
  styleUrls: ['./manage-labtasks.component.css']
})
export class ManageLabtasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  
  localStorageUsername = localStorage.getItem("UsersUsername");

  onLogout(){
    localStorage.clear();
    window.location.href="/";
  }


}
