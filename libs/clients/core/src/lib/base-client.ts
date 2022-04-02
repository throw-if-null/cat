/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding backend constructor and options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}. Also, the Backend instance is available via
 * {@link Client.getBackend}.

 * @example
 * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(NodeBackend, options);
 *   }
 *
 *   // ...
 * }
 */
import { Client, Options, Transport } from "@cat/domain/client";
import { Backend, BackendClass } from "./base-backend";
import { CSN } from "./csn";


export abstract class BaseClient<B extends Backend, O extends Options> implements Client<O> {
	/**
	 * The backend used to physically interact in the environment. Usually, this
	 * will correspond to the client. When composing SDKs, however, the Backend
	 * from the root SDK will be used.
	 */
	protected readonly backend: B;

	/** Options passed to the SDK. */
	protected readonly options: O;

	/** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
	protected readonly csn?: CSN;

	/**
	 * Initializes this client instance.
	 *
	 * @param backendClass A constructor function to create the backend.
	 * @param options Options for the client.
	 */
	protected constructor(backendClass: BackendClass<B, O>, options: O) {
		this.backend = new backendClass(options);
		this.options = options;
		this.csn = new CSN(options.csn);
	}

	/**
	 * @inheritDoc
	 */
	public getCsn(): CSN | undefined {
		return this.csn;
	}

	/**
	 * @inheritDoc
	 */
	public getOptions(): O {
		return this.options;
	}

	/**
	 * @inheritDoc
	 */
	public getTransport(): Transport {
		return this.getBackend().getTransport();
	}

	public getConfiguration(id: string): Promise<object> {
		return this.backend.getConfiguration(id);
	}

	public updateConfiguration(id: string, data: any): Promise<void> {
		return this.backend.updateConfiguration(id, data);
	}

	/** Returns the current backend. */
	protected getBackend(): B {
		return this.backend;
	}
}
