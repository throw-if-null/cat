export enum ConfigurationType {
	JSON,
	Angular,
	DotNET,
	ENV,
}

interface ConfigurationBase {
	id: number;
	typeId: ConfigurationType;
	name: string;
}

export interface ConfigurationOverview extends ConfigurationBase {
	entriesCount: number;
}

export interface ConfigurationDetails extends ConfigurationBase {
	entries: ConfigurationEntry[];
}

export interface ConfigurationCreateData {
	name: string;
	typeId: number;
}

export interface ConfigurationCreateResponse {
	id: number;
	typeId: number;
	name: string;
}

export interface ConfigurationEntryData {
	key: string;
	value: any
}

export interface ConfigurationEntry extends ConfigurationEntryData {
	id: number;
	secondsToLive: number;
	disabled: boolean;
}

export type ConfigurationEntryCreateData = Omit<ConfigurationEntry, "id">;
