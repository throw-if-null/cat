import { ConfigurationEntry } from "@cat/domain";

export function createEnvFile(entries: ConfigurationEntry[]): string {
	const lines = [];

	for (let entry of entries) {
		lines.push(getEnvFileEntry(entry));
	}

	return lines.join('\r\n')
}

function getEnvFileEntry(entry: ConfigurationEntry): string {
	return entry.key + '=' + entry.value;
}
