import { Injectable } from '@angular/core';
import { ProjectService } from '@cat/project';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ProjectsActions.init),
			fetch({
				run: action => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return this.projectService.getProjects()
							   .pipe(map((projects) => (ProjectsActions.loadProjectsSuccess({ projects }))));
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
							   .pipe(map((project) => (ProjectsActions.loadProjectSuccess({ project }))));
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
					return ProjectsActions.createProjectFailure({ error });
				}
			})
		)
	);


// .then(res => {
// 	this.toast.success(`Yeah! Project - ${ res.name } - created successfully.`);
// });

	constructor(private readonly actions$: Actions, private projectService: ProjectService) {}
}
