import { Injectable } from '@angular/core';
import { ConfigurationEntry } from "@cat/domain";
import { select, Store } from '@ngrx/store';

import * as ConfigurationsActions from './configurations.actions';
import * as ConfigurationsSelectors from "./configurations.selectors";

@Injectable()
export class ConfigurationFacade {

	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(
		select(ConfigurationsSelectors.getConfigurationsLoaded)
	);
	configurationOverview$ = this.store.pipe(
		select(ConfigurationsSelectors.getConfigurationsState)
	);
	allConfigurationEntries$ = this.store.pipe(
		select(ConfigurationsSelectors.getAllConfigurationEntries)
	);
	selectedConfigurationEntry$ = this.store.pipe(
		select(ConfigurationsSelectors.getSelected)
	);

	constructor(private readonly store: Store) {
	}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(ConfigurationsActions.init());
	}

	updateConfigurationEntry(entry: ConfigurationEntry, projectId: number, configurationId: number) {
		this.store.dispatch(ConfigurationsActions.updateConfigurationEntry({ entry, projectId, configurationId }));
	}
}
