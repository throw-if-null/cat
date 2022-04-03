import { ConfigurationDetails, ConfigurationType, ProjectDetails } from '@cat/domain';
import { Observable, of } from 'rxjs';
import { ProjectsResponse } from "./project.service";

export const testProject1 = { id: 1, name: "Testus", typeId: 0, totalConfigurationCount: 0, totalEntryCount: 0 };

const projectsResponse: ProjectsResponse = {
	projectStats: [ testProject1 ],
	userId: 1
}

export class MockProjectService {

	getProjects(): Observable<ProjectsResponse> {
		return of(projectsResponse);
	}

	getProjectById(projectId: number): Observable<ProjectDetails> {
		return of({ id: projectId, name: 'test project', typeId: 0, entries: 1, configurations: [] });
	}

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		return of({ id: configId, name: 'test project', type: ConfigurationType.Angular, entries: [] });
	}
}
