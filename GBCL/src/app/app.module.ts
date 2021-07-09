import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';





// =============================================My imports below
// Angular n other imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Homepage imports
import { AboutusComponent } from './gbcl-homepage/aboutus/aboutus.component';
import { SignupFormComponent } from './gbcl-homepage/signup-form/signup-form.component';
import { GBCLHomepageComponent } from './gbcl-homepage/gbcl-homepage.component';
import { HomepageNavSearchComponent } from './gbcl-homepage/homepage-nav-search/homepage-nav-search.component';

// Admin imports
import { AdminComponent } from './admin/admin.component';
import { ManageUniversitiesComponent } from './admin/manage-universities/manage-universities.component';


// Student imports
import { STUDENTComponent } from './student/student.component';
import { SlabDashboardComponent } from './student/slab-dashboard/slab-dashboard.component';
import { CpaComponent } from './student/slab-dashboard/cpa/cpa.component';
import { LeaderboardComponent } from './student/slab-dashboard/leaderboard/leaderboard.component';
import { ChallengesComponent } from './student/slab-dashboard/challenges/challenges.component';
import { SsettingsComponent } from './student/ssettings/ssettings.component';
import { RivalsComponent } from './student/slab-dashboard/rivals/rivals.component';

// Teacher imports
import { TEACHERComponent } from './teacher/teacher.component';
import { TlabDashboardComponent } from './teacher/tlab-dashboard/tlab-dashboard.component';

// University imports
import { UNIVERSITYComponent } from './university/university.component';

import { TeachersettingsComponent } from './TEACHER/tsettings/tsettings.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageLabtasksComponent } from './teacher/tlab-dashboard/manage-labtasks/manage-labtasks.component';
import { ManageChallengesComponent } from './teacher/tlab-dashboard/manage-challenges/manage-challenges.component';
import { ViewLeaderboardComponent } from './teacher/tlab-dashboard/view-leaderboard/view-leaderboard.component';
import { RouterModule } from '@angular/router';
import { GithubcodeforformvalidationComponent } from './misc/concepts/githubcodeforformvalidation/githubcodeforformvalidation.component';
import { TestConceptsComponent } from './misc/concepts/test-concepts/test-concepts.component';
import { UnimanageMembersComponent } from './university/unimanage-members/unimanage-members.component';
import { UnimanageLabsComponent } from './university/unimanage-labs/unimanage-labs.component';
import { ManageStudentsComponent } from './teacher/tlab-dashboard/manage-students/manage-students.component';
import { EvaluateStudentsComponent } from './teacher/tlab-dashboard/evaluate-students/evaluate-students.component';
// Misc imports
import { Error404Component } from './MISC/error404/error404.component';
import { UnimanageJoinrequestsComponent } from './university/unimanage-joinrequests/unimanage-joinrequests.component';
import { ViewalllabsComponent } from './student/slab-dashboard/viewalllabs/viewalllabs.component';
import { TviewalllabsComponent } from './teacher/tlab-dashboard/tviewalllabs/tviewalllabs.component';
import { DoksPrototypeComponent } from './misc/tests/doks-prototype/doks-prototype.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageNavSearchComponent,
    AboutusComponent,
    SignupFormComponent,
    GBCLHomepageComponent,
    AdminComponent,
    ManageUniversitiesComponent,
    STUDENTComponent,
    SlabDashboardComponent,
    CpaComponent,
    LeaderboardComponent,
    ChallengesComponent,
    TEACHERComponent,
    UNIVERSITYComponent,
    Error404Component,
    SsettingsComponent,
    RivalsComponent,
    TlabDashboardComponent,
    TeachersettingsComponent,
    ManageLabtasksComponent,
    ManageChallengesComponent,
    ViewLeaderboardComponent,
    UnimanageMembersComponent,
    UnimanageLabsComponent,
    ManageStudentsComponent,
    EvaluateStudentsComponent,



    //delete following components
    GithubcodeforformvalidationComponent,
    TestConceptsComponent,
    UnimanageJoinrequestsComponent,
    ViewalllabsComponent,
    TviewalllabsComponent,
    DoksPrototypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
