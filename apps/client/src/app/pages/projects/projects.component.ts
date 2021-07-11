import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectService, ProjectOverview } from './project.service';


@Component({
	selector: 'cat-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {


	projects$: Observable<ProjectOverview[]>;

	constructor(private projectService: ProjectService, private dialog: DialogService) {
		this.projects$ = this.projectService.getProjects();
	}

	openCreateDialog() {
		this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });
	}

}
