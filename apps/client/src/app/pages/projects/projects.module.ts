import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@cat/ui';
import { SubscribeModule } from '@ngneat/subscribe';
import { ProjectTypeNamePipe } from '../../project-name.pipe';
import { ConfigCreateComponent } from './config/config-create/config-create.component';
import { ConfigDetailsComponent } from './config/config-details/config-details.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectCreateComponent, ProjectDetailsComponent, ConfigCreateComponent, ConfigDetailsComponent, ProjectTypeNamePipe],
  imports: [CommonModule, ProjectsRoutingModule, ReactiveFormsModule, UiModule, SubscribeModule],
  providers: []
})
export class ProjectsModule {}
