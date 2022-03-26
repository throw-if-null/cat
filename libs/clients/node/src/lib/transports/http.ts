// https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/transports/http.ts

/** Node http module transport */
import { Configuration, TransportOptions } from "@ratcat/core";
import * as http from 'http';
import * as https from 'https';

export class HTTPTransport {

	// https://jsonplaceholder.typicode.com/todos/1'
	/** The Agent used for corresponding transport */
	public client?: any;
	private httpOptions = {
		host: 'd6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io',
		// port: 80,
		path: '/configuration/',
		method: 'GET'
	}

	public constructor(public options: TransportOptions) {
		this.client = options.csn.protocol === 'http' ? http : https;
	}

	/**
	 * @inheritDoc
	 */
	public getConfiguration(configurationId: string): Promise<Configuration> {
		return httpRequest(this.client, { ...this.httpOptions, path: this.httpOptions.path + configurationId });
	}

	/**
	 * @inheritDoc
	 */
	public updateConfiguration(configurationId: string, data: any): Promise<any> {
		return httpRequest(this.client, this.httpOptions, data);
	}
}

function httpRequest(client: any, options: any, postData?: any): Promise<any> {
	return new Promise(function (resolve, reject) {
		const req = client.request(options, function (res: any) {
			// reject on bad status
			if (res.statusCode < 200 || res.statusCode >= 300) {
				return reject(new Error('statusCode=' + res.statusCode));
			}
			// cumulate data
			let body: any[] = [];
			res.on('data', function (chunk: any) {
				body.push(chunk);
			});
			// resolve on end
			res.on('end', function () {
				try {
					// @ts-ignore
					body = JSON.parse(Buffer.concat(body).toString());
				} catch (e) {
					reject(e);
				}
				resolve(body);
			});
		});
		// reject on request error
		req.on('error', function (err: any) {
			// This is not a "Second reject", just a different sort of failure
			reject(err);
		});
		if (postData) {
			req.write(postData);
		}
		// IMPORTANT
		req.end();
	});
}
