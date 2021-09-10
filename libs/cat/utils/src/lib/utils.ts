export function parseStringValue(value: any): any {
	if (isBoolean(value)) {
		return getBoolean(value);
	}

	if (isNumeric(value)) {
		return +value;
	}

	return value;
}

export function getValueType(value: any): string {
	if (isBoolean(value)) {
		return 'boolean';
	} else if (isNumeric(value)) {
		return 'numeric';
	} else if (isValidUrl(value)) {
		return 'url';
	} else {
		return 'string';
	}
}

export function isValidUrl(value: string): boolean {
	let url;

	try {
		url = new URL(value);
	} catch (_) {
		return false;
	}

	return url.protocol === 'http:' || url.protocol === 'https:';
}

export function isNumeric(value: any): boolean {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isBoolean(value: any): boolean {
	if (typeof value === 'boolean') {
		return true;
	}

	return value === 'true' || value === 'false';
}

export function getBoolean(value: any) {
	switch (value) {
		case true:
		case 'true':
		case 1:
		case '1':
		case 'on':
		case 'yes':
			return true;
		default:
			return false;
	}
}
