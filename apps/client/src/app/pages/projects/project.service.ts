import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationDetails, ConfigurationEntry } from './config/config.type';
import { ProjectDetails, ProjectOverview, ProjectCreateResponse, ProjectCreateData, ProjectDeleteResponse } from './project.type';

// const API_URL = environment.rat.apiUri;
const API_URL = 'https://d6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io';

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

	createProject(data: ProjectCreateData): Promise<ProjectCreateResponse> {
		console.log('createProject ', data.name);

		return this.http.post<ProjectCreateResponse>(`${ API_URL }/projects/`, data).toPromise();
	}

	deleteProject(projectId: number): Promise<ProjectDeleteResponse> {
		console.log('Deleting project: ', projectId);

		return this.http.delete<ProjectDeleteResponse>(`${ API_URL }/projects/${ projectId }`).toPromise();
	}

	/**
	 *
	 * CONFIGURATIONS
	 */

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		console.log('getConfigurationById');
		return this.http.get<ConfigurationDetails>(`${ API_URL }/projects/${ projectId }/configuration/${ configId }`);
	}

	updateConfigurationEntry(projectId: number, configId: number, entry: ConfigurationEntry): Promise<any> {
		console.log('updateConfigurationEntry ', entry.id);
		return this.http.patch<any>(`${ API_URL }/projects/${ projectId }/configurations/${ configId }/entry/${ entry.id }`, entry)
				   .toPromise();
	}


}
