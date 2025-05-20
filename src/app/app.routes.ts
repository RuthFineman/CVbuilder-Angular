import { Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TemplatesManagementComponent } from './components/templates-management/templates-management.component';
import { ResumeChartComponent } from './components/resume-chart/resume-chart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: AdminLoginComponent },
    { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    { path: 'templates-management', component: TemplatesManagementComponent, canActivate: [AuthGuard]},
    { path: "dashboarddddddd", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "ResumeChartComponent", component: ResumeChartComponent, canActivate: [AuthGuard] },
    
];

