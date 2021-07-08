import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cat-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = '';

	private unsubscribe$ = new Subject();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public auth: AuthService
	) {}

	ngOnInit() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => {
					const child = this.route.firstChild;
					if (child?.snapshot.data['title']) {
						return child.snapshot.data['title'];
					}
					return 'No Title Data';
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe((title: string) => {
				this.title = title;
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	logout() {
		this.auth.logout();
	}
}
