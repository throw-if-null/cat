import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@cat/ui';
import { UiUtilsModule } from '@cat/ui-utils';
import { SubscribeModule } from '@ngneat/subscribe';
import { ConfigDetailsComponent } from './config-details.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: ConfigDetailsComponent }
		]),
		ReactiveFormsModule,
		UiModule,
		UiUtilsModule,
		SubscribeModule],
	declarations: [ConfigDetailsComponent],
	exports: [ConfigDetailsComponent]
})
export class ConfigDetailsModule {}
