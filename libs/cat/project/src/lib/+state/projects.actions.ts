import { ProjectCreateData, ProjectCreateResponse, ProjectDetails, ProjectOverview } from '@cat/domain';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Projects Page] Init');

// maybe rename to project list

export const loadProjectsSuccess = createAction(
	'[Projects/API] Load Projects Success',
	props<{ projects: ProjectOverview[] }>()
);

export const loadProjectsFailure = createAction(
	'[Projects/API] Load Projects Failure',
	props<{ error: any }>()
);

export const createProject = createAction('[Projects/API] Create Project', props<{ project: ProjectCreateData }>());

export const createProjectSuccess = createAction(
	'[Projects/API] Create Project Success',
	props<{ project: ProjectCreateResponse }>()
);

export const createProjectFailure = createAction(
	'[Projects/API] Create Project Failure',
	props<{ error: any }>()
);

export const loadProject = createAction('[Projects/API] Load Project', props<{ projectId: number }>());

export const loadProjectSuccess = createAction(
	'[Projects/API] Load Project Success',
	props<{ project: ProjectDetails }>()
);

export const loadProjectFailure = createAction(
	'[Projects/API] Load Project Failure',
	props<{ error: any }>()
);
