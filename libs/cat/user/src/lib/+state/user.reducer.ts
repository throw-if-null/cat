import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';
import { UserEntity } from './user.models';

export const USER_FEATURE_KEY = 'user';

export interface State {
	error?: string | null; // last known error (if any)
	user?: UserEntity;
}

export interface UserPartialState {
	readonly [USER_FEATURE_KEY]: State;
}

export const initialState: State = {};

const userReducer = createReducer(
	initialState,
	on(UserActions.user, (state, { user }) => ({ ...state, user })),
	on(UserActions.loginFailure, (state, { error }) => ({ ...state, error })),
	on(UserActions.logoutFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
	return userReducer(state, action);
}
