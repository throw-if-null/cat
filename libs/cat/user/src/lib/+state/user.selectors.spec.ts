import { UserEntity } from "./user.models";
import { initialState, UserPartialState } from "./user.reducer";
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {

	let state: UserPartialState;

	beforeEach(() => {
		state = {
			user: {
				...initialState
			}
		};
	});

	it('getUser() should return no user', () => {
		const result = UserSelectors.getUser(state);

		expect(result).toBeUndefined();
	});


	it('getUser() should return no user', () => {

		const testUser: UserEntity = {
			email: "",
			email_verified: false,
			name: "",
			nickname: "",
			picture: "",
			sub: "",
			updated_at: ""
		};

		state.user.user = testUser;
		const result = UserSelectors.getUser(state);

		expect(result).toBe(testUser);
	});

})
