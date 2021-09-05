import { Component } from '@angular/core';
import { ColorThemeService } from './theme.service';

@Component({
	selector: 'cat-theme-switch',
	templateUrl: './theme-switch.component.html',
	styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {

	constructor(public themeService: ColorThemeService) { }

	toggleTheme() {
		this.themeService.toggleTheme();
	}

}
