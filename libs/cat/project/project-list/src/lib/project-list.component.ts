import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCreateData, ProjectOverview } from "@cat/domain";
import { ProjectsFacade } from '@cat/project';
import { ProjectCreateComponent } from '@cat/project-create';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
	selector: 'cat-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: [ './project-list.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent {

	projects$: Observable<ProjectOverview[]>;
	loaded$: Observable<boolean>;

	constructor(private projectFacade: ProjectsFacade, private dialog: DialogService) {
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
