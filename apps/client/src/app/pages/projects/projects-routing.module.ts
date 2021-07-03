import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
	{
		path: ':projectId',
		component: ProjectDetailsComponent
	},
	{
		path: '',
		component: ProjectsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule {}
