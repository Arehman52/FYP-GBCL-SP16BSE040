import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AdminComponent } from './admin/admin.component';
import { STUDENTComponent } from './student/student.component';
import { TEACHERComponent } from './teacher/teacher.component';
import { UNIVERSITYComponent } from './university/university.component';
import { GBCLHomepageComponent } from './gbcl-homepage/gbcl-homepage.component';
import { Error404Component } from './MISC/error404/error404.component';
import { EditUniComponent } from './admin/subpages/edit-uni/edit-uni.component';
import { ViewUnisComponent } from './admin/subpages/view-unis/view-unis.component';
import { LabsComponent } from './university/labs/labs.component';
import { StudentLabCpaComponent } from './student/student-lab/student-lab-cpa/student-lab-cpa.component';

const routes: Routes = [
    { path: '', component: GBCLHomepageComponent},
    { path: 'ADMIN', component: AdminComponent},
    { path: 'ADMIN/EditUniversity', component: EditUniComponent},
    { path: 'ADMIN/ViewUniversity', component: ViewUnisComponent},
    { path: 'STUDENT', component: STUDENTComponent},
    { path: 'STUDENT/Lab/CPA', component: StudentLabCpaComponent},
    // StudentLabCpaComponent is making trouble, visit lab button is not presenting this component!!!
    { path: 'TEACHER', component: TEACHERComponent},
    { path: 'UNIVERSITY', component: UNIVERSITYComponent},
    { path: 'UNIVERSITY/Labs-Dashboard', component: LabsComponent},
    { path: '**', component: Error404Component}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
