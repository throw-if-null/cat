import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ProjectsActions from './projects.actions';
import { ProjectsEffects } from './projects.effects';

describe('ProjectsEffects', () => {
	let actions: Observable<Action>;
	let effects: ProjectsEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NxModule.forRoot()],
			providers: [
				ProjectsEffects,
				provideMockActions(() => actions),
				provideMockStore()
			]
		});

		effects = TestBed.inject(ProjectsEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ProjectsActions.init() });

			const expected = hot('-a-|', {
				a: ProjectsActions.loadProjectsSuccess({ projects: [] })
			});

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
