import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { STUDENTComponent } from './student/student.component';
import { HomepageNavSearchComponent } from './gbcl-homepage/homepage-nav-search/homepage-nav-search.component';
import { AboutusComponent } from './gbcl-homepage/aboutus/aboutus.component';
import { SignupFormComponent } from './gbcl-homepage/signup-form/signup-form.component';
import { AdminComponent } from './admin/admin.component';
import { GBCLHomepageComponent } from './gbcl-homepage/gbcl-homepage.component';
import { TEACHERComponent } from './teacher/teacher.component';
import { UNIVERSITYComponent } from './university/university.component';
import { Error404Component } from './MISC/error404/error404.component';
import { AdminSidenavComponent } from './admin/admin-sidenav/admin-sidenav.component';
import { AdminMainareaComponent } from './admin/admin-mainarea/admin-mainarea.component';
import { ViewUnisComponent } from './admin/subpages/view-unis/view-unis.component';
import { EditUniComponent } from './admin/subpages/edit-uni/edit-uni.component';
import { StudentLabComponent } from './student/student-lab/student-lab.component';



@NgModule({
  declarations: [
    AppComponent,
    STUDENTComponent,
    HomepageNavSearchComponent,
    AboutusComponent,
    SignupFormComponent,
    AdminComponent,
    GBCLHomepageComponent,
    TEACHERComponent,
    UNIVERSITYComponent,
    Error404Component,
    AdminSidenavComponent,
    AdminMainareaComponent,
    ViewUnisComponent,
    EditUniComponent,
    StudentLabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
