import { Action } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';
import { State, initialState, reducer } from './projects.reducer';

describe('Projects Reducer', () => {
	const createProjectsEntity = (id: string, name = ''): ProjectsEntity => ({
		id,
		name: name || `name-${ id }`
	});

	describe('valid Projects actions', () => {
		it('loadProjectsSuccess should return the list of known Projects', () => {
			const projects = [
				createProjectsEntity('PRODUCT-AAA'),
				createProjectsEntity('PRODUCT-zzz')
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
