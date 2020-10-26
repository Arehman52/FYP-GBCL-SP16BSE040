import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';





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

// Student imports
import { STUDENTComponent } from './student/student.component';
import { SlabDashboardComponent } from './student/slab-dashboard/slab-dashboard.component';
import { CpaComponent } from './student/slab-dashboard/cpa/cpa.component';
import { LeaderboardComponent } from './student/slab-dashboard/leaderboard/leaderboard.component';
import { ChallengesComponent } from './student/slab-dashboard/challenges/challenges.component';

// Teacher imports
import { TEACHERComponent } from './teacher/teacher.component';

// University imports
import { UNIVERSITYComponent } from './university/university.component';

// Misc imports
import { Error404Component } from './MISC/error404/error404.component';
import { SsettingsComponent } from './student/ssettings/ssettings.component';



@NgModule({
  declarations: [
    AppComponent,

    HomepageNavSearchComponent,
    AboutusComponent,
    SignupFormComponent,
    GBCLHomepageComponent,

    AdminComponent,

    STUDENTComponent,
    SlabDashboardComponent,
    CpaComponent,
    LeaderboardComponent,
    ChallengesComponent,

    TEACHERComponent,

    UNIVERSITYComponent,

    Error404Component,

    SsettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
