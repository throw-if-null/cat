import { flattenConfigEntries, parseConfigEntries } from "./parser";


describe('Parser', () => {

	const configuration1 = [
		{
			key: 'level1.test',
			value: 1
		},
		{
			key: 'level1.sick',
			value: 'hallo'
		},
		{
			key: 'my_bool',
			value: true
		}
	];

	const flatConfiguration = [
		{
			key: 'level1',
			value: 1
		},
		{
			key: 'level2',
			value: 'hallo'
		},
		{
			key: 'level3',
			value: true
		}
	];

	const deepConfiguration = [
		{
			key: 'level1.test',
			value: 1
		},
		{
			key: 'level1.level2.nope',
			value: 'level2'
		},
		{
			key: 'level1.level2.yes.asd',
			value: 'deep'
		},
		{
			key: 'level1.level2.yes.asdf',
			value: 'deep'
		}
	];

	const weirdConfiguration = [
		{
			key: '123',
			value: 'level2'
		},
		{
			key: '!@#$',
			value: 1
		}
	];

	const overwriteConfiguration = [
		{
			key: 'level1.test',
			value: 1
		},
		{
			key: 'level1.test',
			value: 'level2'
		}
	];

	describe('parseConfigEntries', () => {


		it('should produce an object', () => {

			const parsedConfig = parseConfigEntries(configuration1);

			expect(parsedConfig).toEqual({
				level1: {
					test: 1,
					sick: 'hallo'
				},
				my_bool: true
			});
		});

		it('should produce a flat object', () => {
			const parsedConfig = parseConfigEntries(flatConfiguration);

			expect(parsedConfig).toEqual({
				level1: 1,
				level2: 'hallo',
				level3: true,
			});
		});

		it('should produce an complex object', () => {

			const parsedConfig = parseConfigEntries(deepConfiguration);

			expect(parsedConfig).toEqual({
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

		it('should create an object with weird keys', () => {
			expect(parseConfigEntries(weirdConfiguration)).toEqual(
				{
					"123": "level2",
					"!@#$": 1
				});
		});

		it.skip('should throw when overwriting existing value', () => {
			expect(() => parseConfigEntries(overwriteConfiguration)).toThrow();
		});

		describe('types', () => {
			it('should produce a value of type {number}', () => {
				const parsedConfig: any = parseConfigEntries(configuration1);

				expect(typeof parsedConfig.level1.test).toEqual('number');
			});

			it('should produce a value of type {string}', () => {
				const parsedConfig: any = parseConfigEntries(configuration1);

				expect(typeof parsedConfig.level1.sick).toEqual('string');
			});

			it('should produce a value of type {boolean}', () => {
				const parsedConfig: any = parseConfigEntries(configuration1);

				expect(typeof parsedConfig.my_bool).toEqual('boolean');
			});
		});
	});


	describe('flattenConfigEntries', () => {


		it('should produce an array', () => {

			const flattend = flattenConfigEntries({
				level1: 1,
				level2: 'hallo',
				level3: true
			});

			expect(flattend).toEqual(flatConfiguration);
		});

		it('should flatten an complex object', () => {

			const flattend = flattenConfigEntries({
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

			expect(flattend).toEqual(deepConfiguration);
		});

	});
});
