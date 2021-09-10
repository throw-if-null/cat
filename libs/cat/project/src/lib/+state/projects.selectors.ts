import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROJECTS_FEATURE_KEY, State, projectsAdapter } from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
export const getProjectsState = createFeatureSelector<State>(PROJECTS_FEATURE_KEY);

const { selectAll } = projectsAdapter.getSelectors();

export const getProjectsLoaded = createSelector(
	getProjectsState,
	(state: State) => state.loaded
);

export const getProjectsError = createSelector(
	getProjectsState,
	(state: State) => state.error
);

export const getAllProjects = createSelector(getProjectsState, (state: State) =>
	selectAll(state)
);

export const getProjectDetails = createSelector(
	getProjectsState,
	(state: State) => state.projectDetails
);
