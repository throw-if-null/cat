import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'https://d6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io';


export interface ProjectOverview {
	id: number;
	name: string;
	type: string;
	entries: number;
	configs: number;
}


export interface ProjectDetails {
	id: number;
	name: string;
	type: string;
	entries: number;
	configurations: ConfigurationOverview[]
}

export interface ConfigurationOverview {
	id: number;
	name: string;
	type: string;
	entries: number;
}

export interface ConfigurationEntry {
	id: number;
	key: string;
	value: string;
	expire: number;
	disabled: boolean;
}

export interface ConfigurationDetails {
	id: number;
	name: string;
	type: string;
	entries: ConfigurationEntry[];
}


@Injectable({ providedIn: 'root' })
export class ProjectService {


	constructor(private http: HttpClient) {}


	getProjects(): Observable<ProjectOverview[]> {
		console.log('getProjects');
		return this.http.get<ProjectOverview[]>(`${ API_URL }/projects`);
	}

	getProjectById(projectId: number): Observable<ProjectDetails> {
		console.log('getProjectById');
		return this.http.get<ProjectDetails>(`${ API_URL }/projects/${ projectId }`);
	}

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		console.log('getConfigurationById');
		return this.http.get<ConfigurationDetails>(`${ API_URL }/projects/${ projectId }/configuration/${ configId }`);
	}

	updateConfigurationEntry(projectId: number, configId: number, entry: ConfigurationEntry): Promise<any> {
		console.log('updateConfigurationEntry ', entry.id);
		return this.http.patch<any>(`${ API_URL }/projects/${ projectId }/configurations/${ configId }/entry/${ entry.id }`, entry).toPromise();
	}
}
