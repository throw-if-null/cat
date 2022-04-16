import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cat-error',
	templateUrl: './error.component.html',
	styleUrls: [ './error.component.scss' ]
})
export class ErrorComponent implements OnInit, OnDestroy {
	public authError$: Observable<Error>;

	private unsubscribe$ = new Subject();

	constructor(private auth: AuthService) {
		this.authError$ = this.auth.error$;
	}

	ngOnInit() {
		this.authError$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(e => {
				console.error(e);
			});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
