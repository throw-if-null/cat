import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ProjectType } from './project-create/project-create.component';


const API_URL = environment.rat.apiUri;

export interface ProjectOverview {
  id: number;
  name: string;
  typeId: number;
  entries: number;
  configs: number;
}

interface ProjectCreationDetails {
  name: string;
  typeId: number;
}

export interface ProjectDetails {
  id: number;
  name: string;
  typeId: number;
  entries: number;
  configurations: ConfigurationOverview[];
}

export enum ConfigurationType {
  JSON = 'json',
  Angular = 'angular',
  DotNET = 'dotnet',
  ENV = 'env',
}


export interface ConfigurationOverview {
  id: number;
  name: string;
  type: ConfigurationType;
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

interface ProjectCreateResponse {
  id: 2;
  name: string;
  typeId: number;
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

  createProject(projectName: string, type: ProjectType): Promise<ProjectCreateResponse> {
    console.log('createProject ', projectName);

    const projectdata: ProjectCreationDetails = {
      name: projectName,
      typeId: type
    };
    return this.http.post<ProjectCreateResponse>(`${ API_URL }/projects/`, projectdata).toPromise();
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
    return this.http.patch<any>(`${ API_URL }/projects/${ projectId }/configurations/${ configId }/entry/${ entry.id }`, entry).toPromise();
  }


}
