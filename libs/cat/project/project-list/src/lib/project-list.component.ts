import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProjectCreateComponent } from '@cat/project-create';
import { ProjectService, ProjectCreateData, ProjectOverview } from '@cat/project-data';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
	selector: 'cat-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

	projects$: Observable<ProjectOverview[]>;

	constructor(private projectService: ProjectService, private toast: HotToastService, private dialog: DialogService) {
		this.projects$ = this.projectService.getProjects();
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });

		dialogRef.afterClosed$
				 .pipe(take(1))
				 .subscribe((data?: ProjectCreateData) => {
					 if (data) {
						 this.projectService.createProject(data)
							 .then(res => {
								 this.toast.success(`Yeah! Project - ${ res.name } - created successfully.`);
							 });
					 }
				 });
	}

}
