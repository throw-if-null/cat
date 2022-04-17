import { ProjectDetails } from "@cat/domain";
import { Action } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';
import { initialState, projectsAdapter, reducer, State } from './projects.reducer';

describe('Projects Reducer', () => {
	const createProjectsEntity = (id: number, name = ''): ProjectsEntity => ({
		id,
		name: name || `name-${ id }`,
		typeId: 0,
		totalEntryCount: 0,
		totalConfigurationCount: 0
	});

	const createProjectDetails = (id: number, name = ''): ProjectDetails => ({
		id,
		name: name || `name-${ id }`,
		typeId: 0,
		entries: 0,
		configurations: []
	});

	describe('valid Projects actions', () => {

		it('init should reset flags', () => {
			const action = ProjectsActions.init();

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(false);
			expect(result.error).toBeUndefined();
		});

		it('loadProjectsSuccess should return the list of known Projects', () => {
			const projects = [
				createProjectsEntity(1),
				createProjectsEntity(2)
			];
			const action = ProjectsActions.loadProjectsSuccess({ projects });

			const result: State = reducer(initialState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});

		it('loadProjectSuccess should return the details of one project', () => {
			const testProject = createProjectDetails(2);
			const action = ProjectsActions.loadProjectSuccess({ project: testProject });

			const result: State = reducer(initialState, action);

			expect(result.projectDetails).toBe(testProject);
		});

		it('createProjectSuccess should add one project to the list', () => {
			const projects = [
				createProjectsEntity(1),
				createProjectsEntity(2)
			];

			let state = projectsAdapter.setAll(projects, initialState);

			const action = ProjectsActions.createProjectSuccess({ project: { id: 3, name: 'name-1', typeId: 0 } });

			const result: State = reducer(state, action);

			expect(result.ids.length).toBe(3);
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
