/**
 * The Sentry Node SDK Client.
 *
 * @see NodeOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
import { BaseClient, SDK_VERSION } from "@ratcat/core";
import { NodeBackend } from "./backend";
import { NodeOptions } from "./types";

export class NodeClient extends BaseClient<NodeBackend, NodeOptions> {

	/**
	 * Creates a new Node SDK instance.
	 * @param options Configuration options for this SDK.
	 */
	public constructor(options: NodeOptions) {
		options.metadata = options.metadata || {
			name: 'ratcat.javascript.node',
			version: SDK_VERSION,
		};

		super(NodeBackend, options);
	}

	/**
	 * @inheritDoc
	 */
	public getConfiguration(configurationId: string): Promise<object> {
		return super.getConfiguration(configurationId);
	}

	/**
	 * @inheritDoc
	 */
	public updateConfiguration(configurationId: string, data: any): Promise<void> {
		return super.updateConfiguration(configurationId, data);
	}

}
