import { ConfigurationOverview } from '@cat/domain';

export enum ProjectType {
	JSON,
	Angular,
	DotNET,
	React,
}

export interface ProjectOverview {
	id: number;
	name: string;
	typeId: number;
	totalConfigurationCount: number;
	totalEntryCount: number;
}

export interface ProjectDetails {
	id: number;
	name: string;
	typeId: number;
	entries: number;
	configurations: ConfigurationOverview[];
}

export interface ProjectCreateData {
	name: string;
	typeId: number;
}

export interface ProjectCreateResponse {
	id: number;
	name: string;
	typeId: number;
}

export interface ProjectDeleteResponse {
	id: number;
	name: string;
	typeId: number;
}
