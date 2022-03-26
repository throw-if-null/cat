/** An error emitted by RATCAT SDKs and related utilities. */
export class RatCatError extends Error {
	public name: string;

	public constructor(public message: string) {
		super(message);

		this.name = new.target.prototype.constructor.name;
	}
}
