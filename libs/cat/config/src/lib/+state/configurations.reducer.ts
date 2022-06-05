import { ConfigurationEntry } from "@cat/domain";
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ConfigurationsActions from "./configurations.actions";

export const CONFIGURATIONS_FEATURE_KEY = 'configurations';

export interface State extends EntityState<ConfigurationEntry> {
	selectedId?: number; // which Configurations entry record has been selected
	loaded: boolean;
	error?: string; // last known error (if any)
	projectId?: number;
	configurationId?: number;
	configurationName?: string;
	entryCreated: boolean;
}

export interface ConfigurationsPartialState {
	readonly [CONFIGURATIONS_FEATURE_KEY]: State;
}

export const configurationsAdapter: EntityAdapter<ConfigurationEntry> =
	createEntityAdapter<ConfigurationEntry>();

export const initialState: State = configurationsAdapter.getInitialState({
	// set initial required properties
	loaded: false,
	entryCreated: false
});

const configurationsReducer = createReducer(
	initialState,
	on(ConfigurationsActions.init, (state) => ({
		...state,
		loaded: false,
		error: undefined,
	})),
	on(ConfigurationsActions.loadConfigurationSuccess,
		(state, { configuration, projectId }) => configurationsAdapter.setAll(configuration.entries, {
			...state,
			configurationId: configuration.id,
			configurationName: configuration.name,
			loaded: true,
			projectId
		})
	),
	on(ConfigurationsActions.loadConfigurationFailure, (state, { error }) => ({
		...state,
		error,
	})),
	on(ConfigurationsActions.createConfigurationEntry, (state) => ({
		...state,
		entryCreated: false,
	})),
	on(ConfigurationsActions.createConfigurationEntrySuccess,
		(state, { entry }) => configurationsAdapter.addOne(entry, { ...state, entryCreated: true })
	),
	on(ConfigurationsActions.updateConfigurationEntrySuccess,
		(state, { entry }) => configurationsAdapter.updateOne({ id: entry.id, changes: entry }, state)
	),
	on(ConfigurationsActions.undoUpdateConfigurationEntry, (state, { data }) => ({
		...state,
		error: data,
	})),
	on(ConfigurationsActions.deleteConfigurationEntrySuccess,
		(state, { entryId }) => configurationsAdapter.removeOne(entryId, state)
	),
);

export function reducer(state: State | undefined, action: Action) {
	return configurationsReducer(state, action);
}
