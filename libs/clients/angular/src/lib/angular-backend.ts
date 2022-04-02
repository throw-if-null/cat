import { HttpClient } from "@angular/common/http";
import { Transport, TransportOptions } from "@cat/domain/client";
import { BaseBackend, CSN } from "@ratcat/core";
import { AngularTransport } from "./transports/http";
import { AngularOptions } from "./types";

/**
 * The Sentry Node SDK Backend.
 * @hidden
 */
export class AngularBackend extends BaseBackend<AngularOptions> {


	setClient(httpClient: HttpClient) {
		(this.transport as AngularTransport).http = httpClient;
	}

	/**
	 * @inheritDoc
	 */
	protected override _setupTransport(): Transport {
		if (!this.options.csn) {
			// We return the noop transport here in case there is no CSN.
			return super._setupTransport();
		}

		const csn = new CSN(this.options.csn);

		const transportOptions: TransportOptions = {
			...this.options.transportOptions,
			csn,
			metadata: this.options.metadata,
		};

		if (this.options.transport) {
			return new this.options.transport(transportOptions);
		}

		return new AngularTransport(transportOptions);
	}
}
