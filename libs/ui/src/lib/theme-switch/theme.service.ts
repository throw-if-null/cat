import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ColorTheme {
	LIGHT = 'light',
	DARK = 'dark',
	EYES = 'my-eyes'
}

export const THEME_STORAGE_ID = 'ratcat-theme';
export const THEME_ATTRIBUTE = 'data-theme';

@Injectable({ providedIn: 'root' })
export class ColorThemeService {

	private _theme$ = new BehaviorSubject(ColorTheme.DARK);
	theme$ = this._theme$.asObservable();

	constructor() {
		this.setDefaultTheme();
	}

	private get theme() {
		return this._theme$.getValue();
	}

	toggleTheme() {
		const newTheme = this.theme === ColorTheme.DARK ? ColorTheme.LIGHT : ColorTheme.DARK;
		this.setTheme(newTheme);
	}

	setTheme(theme: ColorTheme) {
		if (theme !== this.theme) {
			this._theme$.next(theme);
			localStorage.setItem(THEME_STORAGE_ID, theme);
		}
	}

	private setDefaultTheme() {
		if (localStorage.getItem(THEME_STORAGE_ID)) {
			this.setTheme(localStorage.getItem(THEME_STORAGE_ID)! as ColorTheme);
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
			this.setTheme(ColorTheme.LIGHT);
		}
	}
}
