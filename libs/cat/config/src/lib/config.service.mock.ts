import {
	ConfigurationCreateData,
	ConfigurationCreateResponse,
	ConfigurationDetails,
	ConfigurationEntry,
	ConfigurationEntryCreateData,
	ProjectDetails
} from '@cat/domain';
import { Observable, of } from 'rxjs';

const configResponse: ConfigurationCreateResponse = {
	id: 1,
	name: "Testus",
	typeId: 0,
};

const testEntry: ConfigurationEntry = {
	disabled: false,
	secondsToLive: 0,
	id: 1,
	key: "key",
	value: 0
}

const testConfig: ConfigurationDetails = {
	id: 1,
	name: "Testus",
	typeId: 0,
	entries: [ testEntry ]
};

export const testProject1: ProjectDetails = { id: 1, name: 'test project', typeId: 0, entries: 1, configurations: [] };


export class MockConfigurationDataService {

	createConfiguration(projectId: number, data: ConfigurationCreateData): Observable<ConfigurationCreateResponse> {
		return of(configResponse);
	}

	deleteConfiguration(projectId: number, configId: number): Observable<Object> {
		return of(testConfig);
	}

	getConfigurationById(configId: number): Observable<ConfigurationDetails> {
		return of(testConfig);
	}

	createConfigurationEntry(configId: number, entry: ConfigurationEntryCreateData): Observable<any> {
		return of(testEntry);
	}

	updateConfigurationEntry(configId: number, entry: ConfigurationEntry): Observable<any> {
		return of(testEntry);
	}

	deleteConfigurationEntry(entryId: number, configId: number): Observable<Object> {
		return of(testEntry);
	}

}
