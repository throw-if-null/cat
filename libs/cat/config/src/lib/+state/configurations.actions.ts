import { ConfigurationCreateData, ConfigurationCreateResponse, ConfigurationEntry } from "@cat/domain";
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Configuration Details Page] Init');


export const createConfiguration = createAction('[Configurations/API] Create Configuration', props<{ projectId: number, data: ConfigurationCreateData }>());

export const createConfigurationSuccess = createAction(
	'[Configurations/API] Create Configuration Success',
	props<ConfigurationCreateResponse>()
);

export const createConfigurationFailure = createAction(
	'[Configurations/API] Create Configuration Failure',
	props<{ error: any }>()
);

export const loadConfigurationEntriesSuccess = createAction(
	'[Configurations/API] Load Configuration Entries Success',
	props<{ entries: ConfigurationEntry[] }>()
);

export const loadConfigurationEntriesFailure = createAction(
	'[Configurations/API] Load Configuration Entries Failure',
	props<{ error: any }>()
);


export const updateConfigurationEntry = createAction('[Configuration Details Page] Update Configuration Entry',
	props<{ entry: ConfigurationEntry, projectId: number, configurationId: number }>()
);

export const updateConfigurationEntrySuccess = createAction(
	'[Configurations/API] Update Configuration Entry Success',
	props<{ entry: ConfigurationEntry }>()
);

export const undoUpdateConfigurationEntry = createAction(
	'[Configurations/API] Undo Configuration Entry Update',
	props<{ data: any }>()
);


export const updateConfigurationEntryFailure = createAction(
	'[Configurations/API] Update Configuration Entry Failure',
	props<{ error: any }>()
);
