import { Usersmodel } from './usersmodel.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HomepageService{
  private user: Usersmodel[] = [];
  
  // tslint:disable-next-line: typedef
  getUser() {
    // return [...this.user];
    console.log(this.user);
  }

  // tslint:disable-next-line: typedef
  createUser(UserEmail: string, UserPassword: string){
    // tslint:disable-next-line: object-literal-shorthand
    const user: Usersmodel = {UserEmail: UserEmail, UserPassword: UserPassword};
    this.user.push(user);
  }
}


