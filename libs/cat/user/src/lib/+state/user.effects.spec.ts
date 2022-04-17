import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from "@auth0/auth0-angular";
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UserActions from './user.actions';
import { UserEffects } from './user.effects';

describe('ProjectsEffects', () => {
	let actions: Observable<Action>;
	let effects: UserEffects;

	const authServiceSpy = {
		loginWithRedirect: jest.fn(),
		logout: jest.fn(),
	};

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, NxModule.forRoot() ],
			providers: [
				UserEffects,
				provideMockActions(() => actions),
				provideMockStore(),
				{ provide: AuthService, useValue: authServiceSpy }
			]
		});

		effects = TestBed.inject(UserEffects);
	});

	describe('login$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: UserActions.login() });

			const expected = hot('-a-|', {
				a: UserActions.loginSuccess(),
			});

			expect(effects.login$).toBeObservable(expected);
		});
	});

	describe('logout$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: UserActions.logout() });

			const expected = hot('-a-|', {
				a: UserActions.logoutSuccess(),
			});

			expect(effects.logout$).toBeObservable(expected);
		});
	});
});
