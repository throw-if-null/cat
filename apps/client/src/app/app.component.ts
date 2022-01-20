import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ColorThemeService, THEME_ATTRIBUTE } from '@cat/ui';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { UserFacade } from "@cat/user";

@Component({
	selector: 'cat-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
	title = '';
	user$;

	private unsubscribe$ = new Subject();

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private renderer: Renderer2,
		private userFacade: UserFacade,
		private themeService: ColorThemeService
	) {

		this.user$ = this.userFacade.user$;

		this.themeService.theme$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(theme => {
				console.log('theme changed to: ' + theme);
				this.renderer.setAttribute(document.body, THEME_ATTRIBUTE, theme);
			});
	}

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
		this.userFacade.logout();
	}
}
