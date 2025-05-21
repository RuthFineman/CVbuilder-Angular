import { Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TemplatesManagementComponent } from './components/templates-management/templates-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    { path: '', component: AdminLoginComponent },
    { path: 'login', component: AdminLoginComponent },
    { path: 'UserManagement', component:UserManagementComponent , canActivate: [AuthGuard]},
    { path: 'templates-management', component: TemplatesManagementComponent, canActivate: [AuthGuard]},
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    
];

