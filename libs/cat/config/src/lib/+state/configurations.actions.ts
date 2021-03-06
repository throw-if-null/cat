import {
	ConfigurationCreateData,
	ConfigurationCreateResponse,
	ConfigurationDetails,
	ConfigurationEntry,
	ConfigurationEntryCreateData,
	ConfigurationUpdateResponse
} from "@cat/domain";
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Configuration Details Page] Init');


export const createConfiguration = createAction('[Configurations/API] Create Configuration', props<{ projectId: number, data: ConfigurationCreateData }>());

export const createConfigurationSuccess = createAction(
	'[Configurations/API] Create Configuration Success',
	props<{ response: ConfigurationCreateResponse }>()
);

export const createConfigurationFailure = createAction(
	'[Configurations/API] Create Configuration Failure',
	props<{ error: any }>()
);

export const loadConfigurationSuccess = createAction(
	'[Configurations/API] Load Configuration Success',
	props<{ configuration: ConfigurationDetails, projectId: number }>()
);

export const loadConfigurationFailure = createAction(
	'[Configurations/API] Load Configuration Failure',
	props<{ error: any }>()
);

export const updateConfiguration = createAction('[Configurations/API] Update Configuration', props<{ projectId: number, data: ConfigurationCreateData }>());

export const updateConfigurationSuccess = createAction(
	'[Configurations/API] Update Configuration Success',
	props<{ response: ConfigurationUpdateResponse }>()
);

export const updateConfigurationFailure = createAction(
	'[Configurations/API] Update Configuration Failure',
	props<{ error: any }>()
);

export const deleteConfiguration = createAction('[Configurations/API] Delete Configuration', props<{ projectId: number, configurationId: number }>());

export const deleteConfigurationSuccess = createAction(
	'[Configurations/API] Delete Configuration Success',
	props<{ configurationId: number }>()
);

export const deleteConfigurationFailure = createAction(
	'[Configurations/API] Delete Configuration Failure',
	props<{ error: any }>()
);


export const createConfigurationEntry = createAction('[Configuration Details Page] Create Configuration Entry',
	props<{ entry: ConfigurationEntryCreateData, configurationId: number }>()
);

export const createConfigurationEntries = createAction('[Configuration Details Page] Create Configuration Entries',
	props<{ entries: ConfigurationEntryCreateData[], configurationId: number }>()
);

export const createConfigurationEntrySuccess = createAction(
	'[Configurations/API] Create Configuration Entry Success',
	props<{ entry: ConfigurationEntry }>()
);

export const createConfigurationEntriesSuccess = createAction(
	'[Configurations/API] Create Configuration Entries Success',
	props<{ entries: ConfigurationEntry[] }>()
);

export const createConfigurationEntryFailure = createAction(
	'[Configurations/API] Create Configuration Entry Failure',
	props<{ error: any }>()
);

export const updateConfigurationEntry = createAction('[Configuration Details Page] Update Configuration Entry',
	props<{ entry: ConfigurationEntry, configurationId: number }>()
);

export const updateConfigurationEntrySuccess = createAction(
	'[Configurations/API] Update Configuration Entry Success',
	props<{ entry: ConfigurationEntry }>()
);

export const updateConfigurationEntryFailure = createAction(
	'[Configurations/API] Update Configuration Entry Failure',
	props<{ error: any }>()
);

export const undoUpdateConfigurationEntry = createAction(
	'[Configurations/API] Undo Configuration Entry Update',
	props<{ data: any }>()
);


export const deleteConfigurationEntry = createAction('[Configuration Details Page] Delete Configuration Entry',
	props<{ entryId: number, configurationId: number }>()
);

export const deleteConfigurationEntrySuccess = createAction(
	'[Configurations/API] Delete Configuration Entry Success',
	props<{ entryId: number }>()
);

export const deleteConfigurationEntryFailure = createAction(
	'[Configurations/API] Delete Configuration Entry Failure',
	props<{ error: any }>()
);
