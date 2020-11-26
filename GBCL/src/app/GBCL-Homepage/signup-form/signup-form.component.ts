import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usersmodel } from '../usersmodel.model';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  constructor(public homepageService: HomepageService) {  }
  ngOnInit() {  }
  EnteredEmailAddress = "";
  EnteredPassword = "";
  storedUsers:Usersmodel[] = [];
  onSignUpClicked(form: NgForm){
    if(form.invalid){
      console.log("invalid data entered");
      return;
    }
    const user = {
      EmailAddress: form.value.EnteredEmailAddress,
      Password: form.value.EnteredPassword
    };
    this.homepageService.createUser(user.EmailAddress, user.Password);  }

  getTheUser(){
    this.homepageService.getUser();
  }



}
