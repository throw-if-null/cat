import { ConfigurationEntryData } from "@cat/domain";


export function parseConfigEntries(configuration: ConfigurationEntryData[]): object {
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

export function flattenConfigEntries(obj = {}, res = [], extraKey = ''): ConfigurationEntryData[] {
	for (let key in obj) {
		// @ts-ignore
		const val = obj[key] as any;
		if (typeof val !== 'object') {
			// @ts-ignore
			res.push({ key: extraKey + key, value: val });
		} else {
			flattenConfigEntries(val, res, `${ extraKey }${ key }.`);
		}
	}

	return res;
}
