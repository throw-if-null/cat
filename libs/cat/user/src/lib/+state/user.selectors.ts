import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, USER_FEATURE_KEY } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const getUserState = createFeatureSelector<State>(USER_FEATURE_KEY);

export const getUser = createSelector(
	getUserState,
	(state: State) => state.user
);

export const getUserError = createSelector(
	getUserState,
	(state: State) => state.error
);
