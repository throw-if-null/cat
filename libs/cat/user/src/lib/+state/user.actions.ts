import { createAction, props } from '@ngrx/store';

export const user = createAction('[User/Auth] User set',
	props<{ user: any }>()
);

export const login = createAction('[User/Auth] login');
export const loginSuccess = createAction('[User/Auth] Login User Success');
export const loginFailure = createAction(
	'[User/Auth] Login User Failure',
	props<{ error: any }>()
);
export const logout = createAction('[User/Auth] logout');
export const logoutSuccess = createAction('[User/Auth] Logout User Success');
export const logoutFailure = createAction(
	'[User/Auth] Logout User Failure',
	props<{ error: any }>()
);
