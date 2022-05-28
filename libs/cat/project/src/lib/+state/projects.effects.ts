import { Injectable } from '@angular/core';
import { ProjectService } from '@cat/project';
import { MonitoringService } from "@cat/utils";
import { HotToastService } from "@ngneat/hot-toast";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as ConfigurationsActions from "../../../../config/src/lib/+state/configurations.actions";
import { ConfigurationDataService } from "@cat/config";

import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProjectsActions.init),
			fetch({
				run: () => {
					this.monitoringService.startTrack('LoadProjects');
					return this.projectService.getProjects()
						.pipe(
							tap(() => this.monitoringService.endTrack('LoadProjects')),
							map((projectsRes) => (ProjectsActions.loadProjectsSuccess({ projects: projectsRes.projectStats })))
						);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ProjectsActions.loadProjectsFailure({ error });
				}
			})
		)
	);

	loadProject$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProjectsActions.loadProject),
			fetch({
				run: action => {
					return this.projectService.getProjectById(action.projectId)
						.pipe(
							map((project) => {
								project.entries = project.configurations.reduce((sum, proj) => sum + proj.entriesCount, 0);
								return project;
							}),
							map((project) => (ProjectsActions.loadProjectSuccess({ project })))
						);
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ProjectsActions.loadProjectFailure({ error });
				}
			})
		)
	);

	createProject$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProjectsActions.createProject),
			fetch({
				run: action => {
					return this.projectService.createProject(action.project)
						.pipe(map((project) => (ProjectsActions.createProjectSuccess({ project }))));
				},
				onError: (action, error) => {
					console.error('Error', error);
					this.toast.error('Could not create the project');
					return ProjectsActions.createProjectFailure({ error });
				}
			})
		)
	);

	createProjectSuccess$ = createEffect(
		() => this.actions$.pipe(
			ofType(ProjectsActions.createProjectSuccess),
			tap(({ project }) => this.toast.success(`Yeah! Project - ${ project.name } - created`))
		),
		{ dispatch: false }
	);

	createConfiguration$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ConfigurationsActions.createConfiguration),
			fetch({
				run: ({ projectId, data }) => {
					return this.configService.createConfiguration(projectId, data)
						.pipe(map((response) => (ConfigurationsActions.createConfigurationSuccess({ response }))));
				},
				onError: (action, error) => {
					console.error('Error', error);
					return ConfigurationsActions.createConfigurationFailure({ error });
				}
			})
		)
	);

	createConfigurationSuccess$ = createEffect(
		() => this.actions$.pipe(
			ofType(ConfigurationsActions.createConfigurationSuccess),
			tap(({ response }) => this.toast.success(`Yeah! Configuration - ${ response.name } - created`))
		),
		{ dispatch: false }
	);

	createConfigurationFailure$ = createEffect(
		() => this.actions$.pipe(
			ofType(ConfigurationsActions.createConfigurationFailure),
			tap(() => this.toast.error('Could not create the configuration'))
		),
		{ dispatch: false }
	);

	constructor(
		private readonly actions$: Actions,
		private readonly toast: HotToastService,
		private readonly projectService: ProjectService,
		private readonly configService: ConfigurationDataService,
		private readonly monitoringService: MonitoringService) {
	}
}
