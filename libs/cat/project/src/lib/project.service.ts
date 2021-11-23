import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ConfigurationDetails, ConfigurationEntry } from '@cat/config-data';
import { Observable } from 'rxjs';
import {
	ProjectCreateData,
	ProjectCreateResponse,
	ProjectDeleteResponse,
	ProjectDetails,
	ProjectOverview
} from './project.type';

export interface ProjectsResponse {
	userId: number;
	projectStats: ProjectOverview[];
}

@Injectable({ providedIn: 'root' })
export class ProjectService {

	constructor(private http: HttpClient, @Inject('RAT_API_URL') private apiURL: string) {
	}

	getProjects(): Observable<ProjectsResponse> {
		console.log('getProjects');
		return this.http.get<ProjectsResponse>(`${ this.apiURL }/projects`);
	}

	getProjectById(projectId: number): Observable<ProjectDetails> {
		console.log('getProjectById');
		return this.http.get<ProjectDetails>(`${ this.apiURL }/projects/${ projectId }`);
	}

	createProject(data: ProjectCreateData): Observable<ProjectCreateResponse> {
		console.log('createProject ', data.name);

		return this.http.post<ProjectCreateResponse>(`${ this.apiURL }/projects/`, data);
	}

	deleteProject(projectId: number): Promise<ProjectDeleteResponse> {
		console.log('Deleting project: ', projectId);

		return this.http.delete<ProjectDeleteResponse>(`${ this.apiURL }/projects/${ projectId }`).toPromise();
	}

	/**
	 *
	 * CONFIGURATIONS
	 */

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		console.log('getConfigurationById');
		return this.http.get<ConfigurationDetails>(`${ this.apiURL }/projects/${ projectId }/configuration/${ configId }`);
	}

	updateConfigurationEntry(projectId: number, configId: number, entry: ConfigurationEntry): Promise<any> {
		console.log('updateConfigurationEntry ', entry.id);
		return this.http.patch<any>(`${ this.apiURL }/projects/${ projectId }/configurations/${ configId }/entry/${ entry.id }`, entry)
			.toPromise();
	}


}
