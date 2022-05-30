/* eslint-disable */
export default {
	displayName: 'cat-project-details',
	preset: '../../../../jest.preset.js',
	setupFilesAfterEnv: [ '<rootDir>/src/test-setup.ts' ],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.(html|svg)$',
		},
	},
	coverageDirectory: '../../../../coverage/libs/cat/project/project-details',
	transform: {
		'^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
	},
	transformIgnorePatterns: [ 'node_modules/(?!.*.mjs$)' ],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
};
