export interface Configuration {
	id: string;
	entries: ConfigurationEntry[];
}

interface ConfigurationEntry {
	key: string;
	value: any
}
