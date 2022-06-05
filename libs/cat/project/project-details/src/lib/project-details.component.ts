import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigurationFacade } from "@cat/config";
import { ConfigCreateComponent } from '@cat/config-create';
import { ConfigurationCreateData, ProjectDetails, ProjectOverview } from "@cat/domain";
import { ProjectService, ProjectsFacade } from '@cat/project';
import { DialogService } from '@ngneat/dialog';
import { Logger } from "@ratcat/logger";
import { Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
	selector: 'cat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: [ './project-details.component.scss' ]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

	project$: Observable<ProjectDetails | undefined>;

	private unsubscribe$ = new Subject();
	private logger = new Logger('ProjectDetailsComponent');

	constructor(private route: ActivatedRoute, private dialog: DialogService, private projectFacade: ProjectsFacade, private projectService: ProjectService, private configurationFacade: ConfigurationFacade) {
		this.project$ = this.projectFacade.projectDetails$;
	}

	ngOnInit() {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => {
					const projectId = params.get('projectId');
					if (!projectId) {
						throw new Error('Missing project id parameter!');
					}
					return of(+projectId);
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(projectId => {
				this.projectFacade.loadProject(projectId);
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
}
