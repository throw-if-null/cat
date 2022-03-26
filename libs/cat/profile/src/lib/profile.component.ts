import { Component, OnInit } from '@angular/core';
import { ColorTheme, ColorThemeService } from '@cat/ui';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserFacade } from "@cat/user";

@Component({
	selector: 'cat-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.scss' ]
})
export class ProfileComponent implements OnInit {

	ColorThemes = Object.values(ColorTheme);
	themeControl = new FormControl<ColorTheme>(ColorTheme.DARK);

	user$;

	private unsubscribe$ = new Subject();

	constructor(private userFacade: UserFacade, private themeService: ColorThemeService) {

		this.user$ = this.userFacade.user$;

		this.themeControl.valueChanges
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(theme => {
				this.themeService.setTheme(theme);
			});
	}

	ngOnInit() {
		this.themeControl.patchValue(this.themeService.theme$);
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
