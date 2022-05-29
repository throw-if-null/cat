import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
	ConfigurationCreateData,
	ConfigurationCreateResponse,
	ConfigurationDetails,
	ConfigurationEntry,
	ConfigurationEntryCreateData
} from "@cat/domain";
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ConfigurationDataService {

	constructor(private http: HttpClient, @Inject('RAT_API_URL') private apiURL: string) {
	}

	createConfiguration(projectId: number, data: ConfigurationCreateData): Observable<ConfigurationCreateResponse> {
		console.log('createConfiguration', data.name);

		return this.http.post<ConfigurationCreateResponse>(`${ this.apiURL }/projects/${ projectId }/configurations`, data);
	}

	deleteConfiguration(projectId: number, configId: number): Observable<Object> {
		console.log('Deleting configuration: ', configId);

		return this.http.delete(`${ this.apiURL }/projects/${ projectId }`);
	}

	getConfigurationById(configId: number): Observable<ConfigurationDetails> {
		console.log('getConfigurationById');
		return this.http.get<ConfigurationDetails>(`${ this.apiURL }/configuration/${ configId }`);
	}

	createConfigurationEntry(configId: number, entry: ConfigurationEntryCreateData): Observable<any> {
		console.log('createConfigurationEntry ', entry.key);

		return this.http.post<any>(`${ this.apiURL }/configurations/${ configId }/entries`, entry);
	}

	updateConfigurationEntry(configId: number, entry: ConfigurationEntry): Observable<any> {
		console.log('updateConfigurationEntry ', entry.id);

		return this.http.patch<any>(`${ this.apiURL }/configurations/${ configId }/entries/${ entry.id }`, entry);
	}

	deleteConfigurationEntry(entryId: number, configId: number): Observable<Object> {
		console.log('Deleting configuration entry: ', entryId);

		return this.http.delete(`${ this.apiURL }/configurations/${ configId }/entries/${ entryId }`);
	}
}
