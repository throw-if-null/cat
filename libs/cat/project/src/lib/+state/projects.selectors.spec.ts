import { ProjectsEntity } from './projects.models';
import { initialState, projectsAdapter, ProjectsPartialState } from './projects.reducer';
import * as ProjectsSelectors from './projects.selectors';

describe('Projects Selectors', () => {
	const getProjectsId = (it: ProjectsEntity) => it.id;
	const createProjectsEntity = (id: number, name = ''): ProjectsEntity => ({
		id,
		name: name || `name-${ id }`,
		typeId: 0,
		totalEntryCount: 0,
		totalConfigurationCount: 0
	});

	let state: ProjectsPartialState;

	beforeEach(() => {
		state = {
			projects: projectsAdapter.setAll(
				[
					createProjectsEntity(1),
					createProjectsEntity(2),
					createProjectsEntity(3)
				],
				{
					...initialState,
					selectedId: 2,
					loaded: true
				}
			)
		};
	});

	it('getAllProjects() should return the list of Projects', () => {
		const results = ProjectsSelectors.getAllProjects(state);
		const selId = getProjectsId(results[1]);

		expect(results.length).toBe(3);
		expect(selId).toBe(2);
	});


	it('getProjectsLoaded() should return the current "loaded" status', () => {
		const result = ProjectsSelectors.getProjectsLoaded(state);

		expect(result).toBe(true);
	});

	it('getProjectsError() should return the current "error" state', () => {
		const result = ProjectsSelectors.getProjectsError(state);

		expect(result).toBe(undefined);
	});

	it('getProjectDetails() should return the details of a project', () => {
		const result = ProjectsSelectors.getProjectDetails(state);

		expect(result).toBe(undefined);
	});

});
