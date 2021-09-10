import { ConfigurationDetails, ConfigurationType } from '@cat/config-data';
import { Observable, of } from 'rxjs';
import { ProjectDetails, ProjectOverview } from './project.type';

export class MockProjectService {

  getProjects(): Observable<ProjectOverview[]> {
    return of([]);
  }

  getProjectById(projectId: number): Observable<ProjectDetails> {
    return of({ id: projectId, name: 'test project', typeId: 0, entries: 1, configurations: [] });
  }

  getConfigurationById(projectId: number, configId: number): Observable<ConfigurationDetails> {
    return of({ id: configId, name: 'test project', type: ConfigurationType.Angular, entries: [] });
  }
}
