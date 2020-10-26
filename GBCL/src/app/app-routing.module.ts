import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AdminComponent } from './admin/admin.component';
import { STUDENTComponent } from './student/student.component';
import { TEACHERComponent } from './teacher/teacher.component';
import { UNIVERSITYComponent } from './university/university.component';
import { GBCLHomepageComponent } from './gbcl-homepage/gbcl-homepage.component';
import { Error404Component } from './MISC/error404/error404.component';
import { SlabDashboardComponent } from './student/slab-dashboard/slab-dashboard.component';
import { CpaComponent } from './student/slab-dashboard/cpa/cpa.component';
import { LeaderboardComponent } from './student/slab-dashboard/leaderboard/leaderboard.component';
import { ChallengesComponent } from './student/slab-dashboard/challenges/challenges.component';
import { SsettingsComponent } from './student/ssettings/ssettings.component';

const routes: Routes = [
  // Homepage routes
    { path: '', component: GBCLHomepageComponent},
  // Admin routes
  { path: 'ADMIN', component: AdminComponent},
  // Student routes
  { path: 'STUDENT', component: STUDENTComponent}, // dashboard
  { path: 'STUDENT/Lab', component: SlabDashboardComponent}, // lab dashboard for student
  { path: 'STUDENT/Lab/Challenges', component: ChallengesComponent},
  { path: 'STUDENT/Lab/CPA', component: CpaComponent},
  { path: 'STUDENT/Lab/Leaderboard', component: LeaderboardComponent},
  { path: 'STUDENT/Settings', component: SsettingsComponent},
  // Teacher routes
  { path: 'TEACHER', component: TEACHERComponent},
  // University routes
    { path: 'UNIVERSITY', component: UNIVERSITYComponent},
  // Misc routes
    { path: '**', component: Error404Component}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
