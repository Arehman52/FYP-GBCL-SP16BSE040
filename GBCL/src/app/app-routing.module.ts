import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './ADMIN/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'ADMIN/admin-dashboard', component: AdminDashboardComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
