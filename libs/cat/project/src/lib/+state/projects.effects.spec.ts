import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationDataService, MockConfigurationDataService } from "@cat/config";
import { ProjectCreateData } from "@cat/domain";
import { MockProjectService, ProjectService, testProject1, testProjectOverview1 } from '@cat/project';
import { MonitoringService } from "@cat/utils";
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProjectsActions from './projects.actions';
import { ProjectsEffects } from './projects.effects';

describe('ProjectsEffects', () => {
	let actions: Observable<Action>;
	let effects: ProjectsEffects;

	beforeEach(() => {

		const monitoringServiceSpy = {
			trackEvent: jest.fn(),
			startTrack: jest.fn(),
			endTrack: jest.fn(),
			trackMetric: jest.fn(),
			logException: jest.fn()
		};

		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, NxModule.forRoot() ],
			providers: [
				ProjectsEffects,
				provideMockActions(() => actions),
				provideMockStore(),
				{ provide: ProjectService, useClass: MockProjectService },
				{ provide: ConfigurationDataService, useClass: MockConfigurationDataService },
				{ provide: MonitoringService, useValue: monitoringServiceSpy },
			],
		});

		effects = TestBed.inject(ProjectsEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ProjectsActions.init() });

			const expected = hot('-a-|', {
				a: ProjectsActions.loadProjectsSuccess({ projects: [ testProjectOverview1 ] }),
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});

	describe('loadProject$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ProjectsActions.loadProject({ projectId: 1 }) });

			const expected = hot('-a-|', {
				a: ProjectsActions.loadProjectSuccess({ project: testProject1 }),
			});

			expect(effects.loadProject$).toBeObservable(expected);
		});
	});

	describe('createProject$', () => {
		it('should work', () => {
			const project: ProjectCreateData = { name: testProject1.name, typeId: testProject1.typeId };
			actions = hot('-a-|', { a: ProjectsActions.createProject({ project }) });

			const expected = hot('-a-|', {
				a: ProjectsActions.createProjectSuccess({ project: { ...project, id: testProject1.id } }),
			});

			expect(effects.createProject$).toBeObservable(expected);
		});
	});
});
