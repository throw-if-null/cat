import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ColorTheme, ColorThemeService } from '@cat/ui';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cat-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	ColorThemes = Object.values(ColorTheme);
	themeControl = new FormControl<ColorTheme>(ColorTheme.DARK);


	private unsubscribe$ = new Subject();

	constructor(public auth: AuthService, private themeService: ColorThemeService) {

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
