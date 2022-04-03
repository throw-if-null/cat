import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigCreateComponent } from '@cat/config-create';
import { ProjectDetails } from "@cat/domain";
import { ProjectService, ProjectsFacade } from '@cat/project';
import { DialogService } from '@ngneat/dialog';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: [ './project-details.component.scss' ]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

	project$: Observable<ProjectDetails | undefined>;

	private unsubscribe$ = new Subject();

	constructor(private route: ActivatedRoute, private projectFacade: ProjectsFacade, private projectService: ProjectService, private dialog: DialogService) {
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
		this.dialog.open(ConfigCreateComponent, { closeButton: false, size: 'lg' });
	}
}
