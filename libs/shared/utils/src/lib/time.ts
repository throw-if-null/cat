export function formatTime(timestamp: number, year = false): string {
	const dt = new Intl.DateTimeFormat('en-GB', {
		year: year ? 'numeric' : undefined, month: year ? 'numeric' : undefined, day: year ? 'numeric' : undefined,
		hour: 'numeric', minute: 'numeric', second: 'numeric',
		hour12: false,
	});

	return dt.format(new Date(timestamp));
}
