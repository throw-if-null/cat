interface ConfigurationEntry {
	key: string;
	value: any
}

export function parseConfigEntries(configuration: ConfigurationEntry[]): object {
	return configuration.reduce((parsedObject, entry) => addToObj(parsedObject, entry.key.split('.'), entry.value), {});
}

function addToObj(parsedObject: any, path: string[], newData: any): any {
	const obj = typeof parsedObject === 'string' ? {} : parsedObject; // Special logic to cause a value at 1.2.3. to override a value at 1.2.
	if (path.length === 0) return newData;
	const [ head, ...tail ] = path;

	return {
		...obj,
		[head]: addToObj(obj[head] || {}, tail, newData)
	}
}

