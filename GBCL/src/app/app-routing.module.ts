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
import { TeachersettingsComponent } from './TEACHER/tsettings/tsettings.component';
import { RivalsComponent } from './student/slab-dashboard/rivals/rivals.component';
import { TlabDashboardComponent } from './teacher/tlab-dashboard/tlab-dashboard.component';
import { ViewLeaderboardComponent } from './teacher/tlab-dashboard/view-leaderboard/view-leaderboard.component';
import { ManageLabtasksComponent } from './teacher/tlab-dashboard/manage-labtasks/manage-labtasks.component';
import { ManageChallengesComponent } from './teacher/tlab-dashboard/manage-challenges/manage-challenges.component';
import { ManageUniversitiesComponent } from './admin/manage-universities/manage-universities.component';
// import { JoinRequestsComponent } from './admin/join-requests/join-requests.component';
import { UnimanageJoinrequestsComponent } from './university/unimanage-joinrequests/unimanage-joinrequests.component';
import { GithubcodeforformvalidationComponent } from './misc/concepts/githubcodeforformvalidation/githubcodeforformvalidation.component';
import { UnimanageLabsComponent } from './university/unimanage-labs/unimanage-labs.component';
import { UnimanageMembersComponent } from './university/unimanage-members/unimanage-members.component';
import { ManageStudentsComponent } from './teacher/tlab-dashboard/manage-students/manage-students.component';
import { EvaluateStudentsComponent } from './teacher/tlab-dashboard/evaluate-students/evaluate-students.component';
// import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
// import { ManageeChallengesComponent } from './teacher/tlab-dashboard/managee-challenges/managee-challenges.component';
// import { ManageeLabtasksComponent } from './teacher/tlab-dashboard/managee-labtasks/managee-labtasks.component';

const routes: Routes = [
  // Homepage routes
  { path: '', component: GBCLHomepageComponent},
  // Admin routes
  { path: 'ADMIN', component: AdminComponent},
  { path: 'ADMIN/ManageUniversities', component: ManageUniversitiesComponent},
  // Student routes
  { path: 'STUDENT', component: STUDENTComponent}, // dashboard
  { path: 'STUDENT/Lab', component: SlabDashboardComponent}, // lab dashboard for student
  { path: 'STUDENT/Lab/Challenges', component: ChallengesComponent},
  { path: 'STUDENT/Lab/CPA', component: CpaComponent},
  { path: 'STUDENT/Lab/Leaderboard', component: LeaderboardComponent},
  { path: 'STUDENT/Lab/Rivals', component: RivalsComponent},
  { path: 'STUDENT/Settings', component: SsettingsComponent},
  // Teacher routes
  { path: 'TEACHER', component: TEACHERComponent},
  { path: 'TEACHER/Lab', component: TlabDashboardComponent},
  { path: 'TEACHER/Lab/Leaderboard', component: ViewLeaderboardComponent},
  { path: 'TEACHER/Lab/Labtasks', component: ManageLabtasksComponent},
  { path: 'TEACHER/Lab/Challenges', component: ManageChallengesComponent},
  { path: 'TEACHER/Lab/ManageStudents', component: ManageStudentsComponent},
  { path: 'TEACHER/Lab/EvaluateStudents', component: EvaluateStudentsComponent},
  { path: 'TEACHER/Settings', component: TeachersettingsComponent},
  // University routes
  { path: 'UNIVERSITY', component: UNIVERSITYComponent},
  { path: 'UNIVERSITY/ManageMembers', component: UnimanageMembersComponent},
  { path: 'UNIVERSITY/ManageJoinRequests', component: UnimanageJoinrequestsComponent},
  { path: 'UNIVERSITY/ManageLabs', component: UnimanageLabsComponent},
  // Misc routes
  { path: 'Testconcepts', component: GithubcodeforformvalidationComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
