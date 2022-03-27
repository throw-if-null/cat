/** An error emitted by RATCAT SDKs and related utilities. */
export class RatCatError extends Error {
	public constructor(message: string) {
		super(message);

		this.name = new.target.prototype.constructor.name;
	}
}
