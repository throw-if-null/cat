import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	CONFIGURATIONS_FEATURE_KEY,
	State,
	configurationsAdapter,
} from './configurations.reducer';

// Lookup the 'Configurations' feature state managed by NgRx
export const getConfigurationsState = createFeatureSelector<State>(
	CONFIGURATIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = configurationsAdapter.getSelectors();

export const getConfigurationsLoaded = createSelector(
	getConfigurationsState,
	(state: State) => state.loaded
);

export const getConfigurationsError = createSelector(
	getConfigurationsState,
	(state: State) => state.error
);

export const getAllConfigurationEntries = createSelector(
	getConfigurationsState,
	(state: State) => selectAll(state)
);

export const getConfigurationEntities = createSelector(
	getConfigurationsState,
	(state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
	getConfigurationsState,
	(state: State) => state.selectedId
);

export const getSelected = createSelector(
	getConfigurationEntities,
	getSelectedId,
	(entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
