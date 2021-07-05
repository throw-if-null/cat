import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@rat/ui';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ConfigCreateComponent } from './config-create/config-create.component';

@NgModule({
	declarations: [ProjectsComponent, ProjectCreateComponent, ProjectDetailsComponent, ConfigCreateComponent],
	imports: [CommonModule, ProjectsRoutingModule, ReactiveFormsModule, UiModule],
	providers: []
})
export class ProjectsModule {}
