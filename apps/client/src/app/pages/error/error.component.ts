import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cat-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
	public authError$: Observable<any> = this.auth.error$;

	constructor(private router: Router, private auth: AuthService) {}

	ngOnInit() {
		timer(0)
			.pipe(takeUntil(this.authError$))
			.subscribe(e => {
				console.error(e);
			});
	}
}
