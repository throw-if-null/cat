import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProjectCreateData, ProjectOverview, ProjectsFacade } from '@cat/project';
import { ProjectCreateComponent } from '@cat/project-create';
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
	loaded$: Observable<boolean>;

	constructor(private projectFacade: ProjectsFacade, private toast: HotToastService, private dialog: DialogService) {
		this.projectFacade.init();
		this.projects$ = this.projectFacade.allProjects$;
		this.loaded$ = this.projectFacade.loaded$;
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });

		dialogRef.afterClosed$
				 .pipe(take(1))
				 .subscribe((data?: ProjectCreateData) => {
					 if (data) {
						 this.projectFacade.createProject(data);
					 }
				 });
	}

}
