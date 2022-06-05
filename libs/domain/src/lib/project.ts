import { ConfigurationOverview } from '@cat/domain';

export enum ProjectType {
	JSON = 1,
	Angular,
	DotNET,
	React,
}

interface ProjectBase {
	id: number;
	typeId: ProjectType;
	name: string;
}

export interface ProjectOverview extends ProjectBase {
	totalConfigurationCount: number;
	totalEntryCount: number;
}

export interface ProjectDetails extends ProjectBase {
	entries: number;
	configurations: ConfigurationOverview[];
}

export interface ProjectCreateData {
	name: string;
	typeId: number;
}

export interface ProjectCreateResponse {
	id: number;
	typeId: number;
	name: string;
}

export interface ProjectDeleteResponse {
	id: number;
	typeId: number;
	name: string;
}
