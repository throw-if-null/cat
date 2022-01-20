/**
 * Interface for the 'User' data
 */
export interface UserEntity {
	name: string;
	picture: string;
	nickname: string;
	sub: string;
	email: string;
	email_verified: boolean;
	updated_at: string;
}
