import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'dashboard', data: {title: 'Dashboard'},
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
	},
	{
		path: 'profile', data: {title: 'Profile'},
		loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
	},
	{
		path: 'projects', data: {title: 'Projects'},
		loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule)
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: '**',
		loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
