import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockProjectService, ProjectService, testProject1 } from '@cat/project';
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
				{ provide: MonitoringService, useValue: monitoringServiceSpy },
			],
		});

		effects = TestBed.inject(ProjectsEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ProjectsActions.init() });

			const expected = hot('-a-|', {
				a: ProjectsActions.loadProjectsSuccess({ projects: [ testProject1 ] }),
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
