import { Component, OnInit } from '@angular/core';
import { Usersmodel } from '../MODELS/Usersmodel.model';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-gbcl-homepage',
  templateUrl: './gbcl-homepage.component.html',
  styleUrls: ['./gbcl-homepage.component.css']
})
export class GBCLHomepageComponent implements OnInit {

  constructor(private usersService:UsersService) {

  }

  ngOnInit(): void {
    this.UsersRecieved = this.usersService.RecieveAllUsersFromDB();
    this.usersService.getServerStatus();
  }

  UsersRecieved:Usersmodel[] = [];


  // console.log('in homepage: this.UsersRecieved: ',this.UsersRecieved);
}
