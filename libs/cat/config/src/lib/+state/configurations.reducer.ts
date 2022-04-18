import { ConfigurationEntry } from "@cat/domain";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConfigurationsActions from './configurations.actions';

export const CONFIGURATIONS_FEATURE_KEY = 'configurations';

export interface State extends EntityState<ConfigurationEntry> {
	selectedId?: number; // which Configurations record has been selected
	loaded: boolean; // has the Configurations list been loaded
	error?: string; // last known error (if any)
	projectId?: number; // which project this config belongs to
	configurationId?: number; // which configuration this entry belongs to
}

export interface ConfigurationsPartialState {
	readonly [CONFIGURATIONS_FEATURE_KEY]: State;
}

export const configurationsAdapter: EntityAdapter<ConfigurationEntry> =
	createEntityAdapter<ConfigurationEntry>();

export const initialState: State = configurationsAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const configurationsReducer = createReducer(
	initialState,
	on(ConfigurationsActions.init, (state) => ({
		...state,
		loaded: false,
		error: undefined,
	})),
	on(ConfigurationsActions.loadConfigurationEntriesSuccess,
		(state, { entries }) => configurationsAdapter.setAll(entries, { ...state, loaded: true })
	),
	on(ConfigurationsActions.loadConfigurationEntriesFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(ConfigurationsActions.updateConfigurationEntrySuccess,
		(state, { entry }) => configurationsAdapter.updateOne({ id: entry.id, changes: entry }, state)
	),
	on(ConfigurationsActions.undoUpdateConfigurationEntry, (state, { data }) => ({
		...state,
		error: data,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return configurationsReducer(state, action);
}
