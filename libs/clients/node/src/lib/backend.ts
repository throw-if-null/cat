import { Transport, TransportOptions } from "@cat/domain/client";
import { BaseBackend, CSN } from "@ratcat/core";
import { HTTPTransport } from "./transports/http";
import { NodeOptions } from "./types";

/**
 * The Sentry Node SDK Backend.
 * @hidden
 */
export class NodeBackend extends BaseBackend<NodeOptions> {

	/**
	 * @inheritDoc
	 */
	protected _setupTransport(): Transport {
		if (!this.options.csn) {
			// We return the noop transport here in case there is no CSN.
			return super._setupTransport();
		}

		const csn = new CSN(this.options.csn);

		const transportOptions: TransportOptions = {
			...this.options.transportOptions,
			...(this.options.httpProxy && { httpProxy: this.options.httpProxy }),
			...(this.options.httpsProxy && { httpsProxy: this.options.httpsProxy }),
			...(this.options.caCerts && { caCerts: this.options.caCerts }),
			csn,
			metadata: this.options.metadata,
		};

		if (this.options.transport) {
			return new this.options.transport(transportOptions);
		}

		return new HTTPTransport(transportOptions);
	}
}
