import { ProjectCreateResponse, ProjectDetails, ProjectOverview } from '@cat/domain';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectsActions from './projects.actions';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface State extends EntityState<ProjectOverview> {
	selectedId?: number; // which Projects record has been selected
	loaded: boolean; // has the Projects list been loaded
	error?: string; // last known error (if any)
	projectDetails?: ProjectDetails;
}

export interface ProjectsPartialState {
	readonly [PROJECTS_FEATURE_KEY]: State;
}

export const projectsAdapter: EntityAdapter<ProjectOverview> =
	createEntityAdapter<ProjectOverview>();

export const initialState: State = projectsAdapter.getInitialState({
	// set initial required properties
	loaded: false
});

const projectsReducer = createReducer(
	initialState,
	on(ProjectsActions.init, state => ({ ...state, loaded: false, error: undefined })),
	on(ProjectsActions.loadProjectsSuccess, (state, { projects }) =>
		projectsAdapter.setAll(projects, { ...state, loaded: true })
	),
	on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ProjectsActions.loadProjectSuccess, (state, { project }) => ({
		...state,
		projectDetails: project,
	})),
	on(ProjectsActions.loadProjectFailure, (state, { error }) => ({
		...state,
		error
	})),
	on(ProjectsActions.createProjectSuccess, (state, { project }) =>
		projectsAdapter.addOne(createProjectFromResponse(project), state)
	),
	on(ProjectsActions.createProjectFailure, (state, { error }) => ({
		...state,
		error
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return projectsReducer(state, action);
}


function createProjectFromResponse(project: ProjectCreateResponse): ProjectOverview {
	return { ...project, totalConfigurationCount: 0, totalEntryCount: 0 };
}
