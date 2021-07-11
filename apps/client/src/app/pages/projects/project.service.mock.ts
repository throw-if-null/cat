import { Observable, of } from 'rxjs';
import { ProjectOverview, ProjectDetails, ConfigurationDetails } from './project.service';

export class MockProjectService {

	constructor() {}


	getProjects(): Observable<ProjectOverview[]> {
		return of();
	}

	getProjectById(projectId: number): Observable<ProjectDetails> {
		return of();
	}

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		return of();
	}
}
