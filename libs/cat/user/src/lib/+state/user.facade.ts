import { Injectable } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { Store } from '@ngrx/store';
import { Logger } from "@ratcat/logger";

import * as UserActions from './user.actions';

@Injectable()
export class UserFacade {

	user$ = this.auth.user$;

	private logger = new Logger('UserFacade');

	constructor(private readonly store: Store, private auth: AuthService) {
		this.logger.debug('UserFacade constructor');

		this.auth.user$.subscribe(user => {
			this.store.dispatch(UserActions.user({ user }));
		});
	}

	login() {
		this.store.dispatch(UserActions.login());
	}

	logout() {
		this.store.dispatch(UserActions.logout());
	}
}
