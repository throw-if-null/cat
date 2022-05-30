import { Injectable } from '@angular/core';
import { ConfigurationCreateData, ConfigurationEntry, ConfigurationEntryCreateData } from "@cat/domain";
import { select, Store } from '@ngrx/store';
import * as ConfigurationsActions from "./configurations.actions";
import * as ConfigurationsSelectors from "./configurations.selectors";

@Injectable()
export class ConfigurationFacade {

	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(ConfigurationsSelectors.getConfigurationsLoaded));
	configuration$ = this.store.pipe(select(ConfigurationsSelectors.getConfigurationsState));
	allConfigurationEntries$ = this.store.pipe(select(ConfigurationsSelectors.getAllConfigurationEntries));
	selectedConfigurationEntry$ = this.store.pipe(select(ConfigurationsSelectors.getSelected));

	constructor(private readonly store: Store) {
	}

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(ConfigurationsActions.init());
	}

	createConfiguration(projectId: number, data: ConfigurationCreateData) {
		this.store.dispatch(ConfigurationsActions.createConfiguration({ projectId, data }));
	}

	createConfigurationEntry(entry: ConfigurationEntryCreateData, configurationId: number) {
		this.store.dispatch(ConfigurationsActions.createConfigurationEntry({ entry, configurationId }));
	}

	updateConfigurationEntry(entry: ConfigurationEntry, configurationId: number) {
		this.store.dispatch(ConfigurationsActions.updateConfigurationEntry({ entry, configurationId }));
	}

	deleteConfigurationEntry(entryId: number, configurationId: number) {
		this.store.dispatch(ConfigurationsActions.deleteConfigurationEntry({ entryId, configurationId }));
	}
}
