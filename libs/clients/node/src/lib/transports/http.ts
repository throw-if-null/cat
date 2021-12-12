// https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/transports/http.ts

/** Node http module transport */
import { TransportOptions } from "@ratcat/core";
import * as http from 'http';
import * as https from 'https';
import { Configuration } from "../../../../core/src/lib/types/configuration";

export class HTTPTransport {

	HttpOptions = {
		hostname: 'jsonplaceholder.typicode.com',
		port: 80,
		path: '/todos/1',
		method: 'GET'
	}


	/** The Agent used for corresponding transport */
	public client?: any;

	public constructor(public options: TransportOptions) {
		// const http = options.csn.protocol === 'http'
		this.client = options.csn.protocol === 'http' ? http : https;
	}

	/**
	 * @inheritDoc
	 */
	public getConfiguration(configurationId: string): Promise<Configuration> {
		return httpRequest(this.client, this.HttpOptions);
	}

	/**
	 * @inheritDoc
	 */
	public updateConfiguration(configurationId: string, data: any): Promise<void> {
		return httpRequest(this.client, this.HttpOptions, data);
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
