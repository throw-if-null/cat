import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
	ConfigurationCreateData,
	ConfigurationCreateResponse,
	ConfigurationDetails,
	ConfigurationEntry
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

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		console.log('getConfigurationById');
		return this.http.get<ConfigurationDetails>(`${ this.apiURL }/projects/${ projectId }/configuration/${ configId }`);
	}

	updateConfigurationEntry(projectId: number, configId: number, entry: ConfigurationEntry): Observable<any> {
		console.log('updateConfigurationEntry ', entry.id);

		return this.http.patch<any>(`${ this.apiURL }/projects/${ projectId }/configurations/${ configId }/entry/${ entry.id }`, entry);
	}

}
