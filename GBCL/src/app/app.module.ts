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
import { SlabDashboardComponent } from './student/slab-dashboard/slab-dashboard.component';
import { CpaComponent } from './student/slab-dashboard/cpa/cpa.component';
// import { LeaderoardComponent } from './student/slab-dashboard/leaderoard/leaderoard.component';
import { LeaderboardComponent } from './student/slab-dashboard/leaderboard/leaderboard.component';
// import { UniViewLabsComponent } from './university/labs/uni-view-labs/uni-view-labs.component';
// import { UniViewLabMembersComponent } from './university/labs/uni-view-lab-members/uni-view-lab-members.component';
// import { UniViewLabJoinRequestsComponent } from './university/labs/uni-view-lab-join-requests/uni-view-lab-join-requests.component';
// import { UniCreateLabComponent } from './university/labs/uni-create-lab/uni-create-lab.component';
// import { LabsComponent } from './university/labs/labs.component';



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
    SlabDashboardComponent,
    CpaComponent,
    // LeaderoardComponent,
    LeaderboardComponent
    // TeacherOutlineManagementComponent,
    // UniViewLabsComponent,
    // UniViewLabMembersComponent,
    // UniViewLabJoinRequestsComponent,
    // UniCreateLabComponent,
    // LabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
