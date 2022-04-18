import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':projectId',
		loadChildren: () => import('@cat/project-details').then(m => m.ProjectDetailsModule)
	},
	{
		path: ':projectId/config/:configId',
		loadChildren: () => import('@cat/config').then(m => m.ConfigModule)
	},
	{
		path: '',
		loadChildren: () => import('@cat/project-list').then(m => m.ProjectListModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule {}
