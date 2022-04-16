const { getJestProjects } = require('@nrwl/jest');

module.exports = {
	projects: [
		...getJestProjects(),
		'<rootDir>/apps/client',
		'<rootDir>/libs/ui',
	]
};
