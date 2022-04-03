import { Injectable } from '@angular/core';
import { ProjectCreateData } from '@cat/domain';
import { select, Store } from '@ngrx/store';
import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';

@Injectable()
export class ProjectsFacade {
	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
	allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
	projectDetails$ = this.store.pipe(select(ProjectsSelectors.getProjectDetails));

	constructor(private readonly store: Store) {}


	init() {
		this.store.dispatch(ProjectsActions.init());
	}

	loadProject(projectId: number) {
		this.store.dispatch(ProjectsActions.loadProject({ projectId }));
	}

	createProject(data: ProjectCreateData) {
		this.store.dispatch(ProjectsActions.createProject({ project: data }));
	}

}
