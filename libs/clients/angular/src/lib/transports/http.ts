import { HttpClient } from "@angular/common/http";
import { Configuration, TransportOptions } from "@cat/domain";


export class AngularTransport {

	public http!: HttpClient;
	// https://jsonplaceholder.typicode.com/todos/1'
	private httpOptions = {
		host: 'd6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io',
		// port: 80,
		path: '/configuration/',
		method: 'GET'
	}
	private uri: string;

	public constructor(public options: TransportOptions) {
		const protocol = options.csn.protocol === 'http' ? "http" : 'https';
		this.uri = protocol + '://' + this.httpOptions.host + this.httpOptions.path;
	}

	/**
	 * @inheritDoc
	 */
	public getConfiguration(configurationId: string): Promise<Configuration> {
		return this.http.get<Configuration>(this.uri + configurationId).toPromise();
	}

	/**
	 * @inheritDoc
	 */
	public updateConfiguration(configurationId: string, data: any): Promise<any> {
		return this.http.put(this.uri + configurationId, data).toPromise();
	}
}
