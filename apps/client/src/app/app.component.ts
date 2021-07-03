import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'rat-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

	title = '';

	private unsubscribe$ = new Subject();

	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => {
					const child = this.route.firstChild;
					console.log(this.route);
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
}
