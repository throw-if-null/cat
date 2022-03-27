import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BaseClient, SDK_VERSION } from "@ratcat/core";
import { AngularBackend } from "./angular-backend";
import { AngularOptions } from "./types";


@Injectable()
export class RatCatService extends BaseClient<AngularBackend, AngularOptions> {


	constructor(private http: HttpClient) {
		super(AngularBackend, {
			csn: "https://examplePublicKey@o0.ingest.sentry.io/0",
			metadata: {
				name: 'ratcat.javascript.node',
				version: SDK_VERSION,
			}
		});

		this.backend.setClient(this.http)
	}

}
