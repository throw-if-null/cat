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

export interface ConfigurationEntryData {
	key: string;
	value: any
}

export interface ConfigurationEntry extends ConfigurationEntryData {
	id: number;
	expire: number;
	disabled: boolean;
}

export interface ConfigurationDetails {
	id: number;
	name: string;
	type: string;
	entries: ConfigurationEntry[];
}
