import { ConfigurationEntry } from "@cat/domain";
import { Action } from '@ngrx/store';

import * as ConfigurationsActions from './configurations.actions';
import { State, initialState, reducer } from './configurations.reducer';

describe('Configurations Reducer', () => {
	const createConfigurationEntriesEntity = (id: number, key) =>
		({
			id,
			key,
			value: 2,
		} as ConfigurationEntry);

	describe('valid Configurations actions', () => {
		it('loadConfigurationsSuccess should return the list of known Configurations', () => {
			const entries = [
				createConfigurationEntriesEntity(1, 'KEY-AAA'),
				createConfigurationEntriesEntity(2, 'KEY-zzz'),
			];
			const action = ConfigurationsActions.loadConfigurationEntriesSuccess({
				entries,
			});

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
