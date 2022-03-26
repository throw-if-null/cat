import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserActions from './user.actions';
import { map } from "rxjs/operators";
import { AuthService } from "@auth0/auth0-angular";

@Injectable()
export class UserEffects {

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.login),
			map(() => {
				this.authService.loginWithRedirect();
				return UserActions.loginSuccess();
			})
		)
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.logout),
			map(() => {
				this.authService.logout();
				return UserActions.logoutSuccess();
			})
		)
	);

	constructor(private readonly actions$: Actions, private authService: AuthService) {

	}


}
