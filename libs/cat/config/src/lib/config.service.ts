import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ConfigurationDetails, ConfigurationEntry } from "@cat/domain";
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ConfigurationDataService {

	constructor(private http: HttpClient, @Inject('RAT_API_URL') private apiURL: string) {
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
