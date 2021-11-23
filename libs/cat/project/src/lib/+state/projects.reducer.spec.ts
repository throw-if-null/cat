import { Action } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';
import { initialState, reducer, State } from './projects.reducer';

describe('Projects Reducer', () => {
	const createProjectsEntity = (id: number, name = ''): ProjectsEntity => ({
		id,
		name: name || `name-${ id }`,
		typeId: 0,
		totalEntryCount: 0,
		totalConfigurationCount: 0
	});

	describe('valid Projects actions', () => {
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
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
