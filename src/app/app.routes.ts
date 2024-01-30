import { Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';
import { DashboardPageComponent } from '@components/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' }, 
	{ path: 'login', component: LoginPageComponent },
	{ path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
	
];
