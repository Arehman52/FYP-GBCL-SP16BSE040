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

const routes: Routes = [
    { path: '', component: GBCLHomepageComponent},
    { path: 'ADMIN', component: AdminComponent},
    { path: 'STUDENT', component: STUDENTComponent},
    { path: 'STUDENT/Lab', component: SlabDashboardComponent},
    { path: 'STUDENT/Lab/CPA', component: CpaComponent},
    { path: 'STUDENT/Lab/Leaderboard', component: LeaderboardComponent},
    { path: 'TEACHER', component: TEACHERComponent},
    { path: 'UNIVERSITY', component: UNIVERSITYComponent},
    { path: '**', component: Error404Component}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
