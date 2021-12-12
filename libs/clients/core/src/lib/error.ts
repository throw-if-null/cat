/** An error emitted by RAT SDKs and related utilities. */
export class RatError extends Error {
	public name: string;

	public constructor(public message: string) {
		super(message);

		this.name = new.target.prototype.constructor.name;
	}
}
