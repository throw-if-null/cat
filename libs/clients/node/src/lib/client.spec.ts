import { NodeClient } from './client';

const client = new NodeClient({
	csn: "https://examplePublicKey@o0.ingest.sentry.io/0",
});

describe('NodeClient()', () => {
	it('should have options', () => {
		expect(client.getOptions()).toEqual({
			"csn": "https://examplePublicKey@o0.ingest.sentry.io/0",
			"metadata": { "name": "ratcat.javascript.node", "version": "0.0.1" }
		});
	});

	it('should fetch configuration', async () => {
		const res = await client.getConfiguration('1337');
		expect(res).toEqual({
			level1: {
				test: 1,
				level2: {
					nope: 'level2',
					yes: {
						asd: 'deep',
						asdf: 'deep'
					}
				}
			},
		});
	});
});
