import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationFacade } from "@cat/config";
import { ConfigCreateComponent } from '@cat/config-create';
import { ConfigurationCreateData, ConfigurationOverview, ProjectDetails, ProjectOverview } from "@cat/domain";
import { ProjectService, ProjectsFacade } from '@cat/project';
import { DialogService } from '@ngneat/dialog';
import { Logger } from "@ratcat/logger";
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ConfigRelationsComponent } from "../../../../config/config-relations/src/lib/config-relations.component";

@Component({
	selector: 'cat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: [ './project-details.component.scss' ]
})
export class ProjectDetailsComponent implements OnDestroy {

	project$: Observable<ProjectDetails | undefined>;

	private _openRelations = new Subject<void>();

	private unsubscribe$ = new Subject<void>();
	private logger = new Logger('ProjectDetailsComponent');

	constructor(
		private route: ActivatedRoute,
		private dialog: DialogService,
		private projectFacade: ProjectsFacade,
		private projectService: ProjectService,
		private configurationFacade: ConfigurationFacade) {
		this.project$ = this.projectFacade.projectDetails$;

		this._openRelations.pipe(
			withLatestFrom(this.project$),
			takeUntil(this.unsubscribe$)
		).subscribe(([ _, project ]) => {
			if (project) {
				this.openConfigRelationsDialog(project.configurations)
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	openCreateConfigDialog() {
		const dialogRef = this.dialog.open<any, ConfigurationCreateData>(ConfigCreateComponent, {
			closeButton: false,
			size: 'lg'
		});

		dialogRef.afterClosed$
			.pipe(
				take(1),
				withLatestFrom(this.projectFacade.projectDetails$)
			)
			.subscribe(([ data, projectDetails ]) => {

				// if aborts the dialog, we have no data
				if (!data) {
					return;
				}
				if (!projectDetails) {
					this.logger.warn('User trying to create a configuration without a project loaded');
					return;
				}
				this.configurationFacade.createConfiguration(projectDetails.id, data)
			});

	}

	deleteProject(project: ProjectOverview) {
		this.projectFacade.deleteProject(project.id)
	}

	removeConfiguration(projectId: number, configId: number) {
		this.configurationFacade.deleteConfiguration(projectId, configId);
	}

	triggerOpenRelations(): void {
		this._openRelations.next();
	}

	private openConfigRelationsDialog(configurations: ConfigurationOverview[]) {
		const dialogRef = this.dialog.open<any, any>(ConfigRelationsComponent, {
			closeButton: false,
			size: 'lg',
			data: {
				configurations
			}
		});

		dialogRef.afterClosed$
			.pipe(
				take(1),
				withLatestFrom(this.projectFacade.projectDetails$)
			)
			.subscribe(([ data, projectDetails ]) => {

				// if aborts the dialog, we have no data
				if (!data) {
					return;
				}
				if (!projectDetails) {
					this.logger.warn('User trying to create a relationship without a project loaded');
					return;
				}

				console.log(data);
			});

	}
}
