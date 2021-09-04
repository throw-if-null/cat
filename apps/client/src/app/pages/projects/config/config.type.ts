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
