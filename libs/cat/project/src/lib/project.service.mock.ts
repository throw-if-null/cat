import {
	ConfigurationDetails,
	ConfigurationEntry,
	ConfigurationType,
	ProjectCreateData,
	ProjectCreateResponse,
	ProjectDeleteResponse,
	ProjectDetails,
	ProjectOverview
} from '@cat/domain';
import { Observable, of } from 'rxjs';
import { ProjectsResponse } from "./project.service";

export const testProjectOverview1: ProjectOverview = {
	id: 1,
	name: "Testus",
	typeId: 0,
	totalConfigurationCount: 0,
	totalEntryCount: 0
};
export const testProject1: ProjectDetails = { id: 1, name: 'test project', typeId: 0, entries: 1, configurations: [] };

const projectsResponse: ProjectsResponse = {
	projectStats: [ testProjectOverview1 ],
	userId: 1
}

export class MockProjectService {

	getProjects(): Observable<ProjectsResponse> {
		return of(projectsResponse);
	}

	getProjectById(projectId: number): Observable<ProjectDetails> {
		return of(testProject1);
	}

	createProject(data: ProjectCreateData): Observable<ProjectCreateResponse> {
		return of({ id: testProject1.id, name: data.name, typeId: data.typeId });
	}

	deleteProject(projectId: number): Observable<ProjectDeleteResponse> {
		return of({ id: projectId, name: testProject1.name, typeId: testProject1.typeId });
	}

	getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
		return of({ id: configId, name: 'test project', type: ConfigurationType.Angular, entries: [] });
	}

	updateConfigurationEntry(projectId: number, configId: number, entry: ConfigurationEntry): Promise<any> {
		return of({}).toPromise();
	}
}
