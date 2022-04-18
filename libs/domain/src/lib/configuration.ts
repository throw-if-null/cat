export enum ConfigurationType {
	JSON = 'json',
	Angular = 'angular',
	DotNET = 'dotnet',
	ENV = 'env',
}

interface ConfigurationBase {
	id: number;
	typeId: ConfigurationType;
	name: string;
}

export interface ConfigurationOverview extends ConfigurationBase {
	entries: number;
}

export interface ConfigurationDetails extends ConfigurationBase {
	entries: ConfigurationEntry[];
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
