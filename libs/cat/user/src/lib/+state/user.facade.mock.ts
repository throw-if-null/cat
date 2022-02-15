import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable()
export class UserFacadeMock {

	user$ = of({});

	constructor() {

	}

	login() {

	}

	logout() {

	}
}
