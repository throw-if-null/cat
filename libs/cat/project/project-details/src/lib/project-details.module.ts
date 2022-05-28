import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigCreateModule } from '@cat/config-create';
import { UiModule } from '@cat/ui';
import { UiUtilsModule } from '@cat/ui-utils';
import { SubscribeModule } from '@ngneat/subscribe';
import { ProjectDetailsComponent } from './project-details.component';

@NgModule({
	declarations: [ProjectDetailsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: ProjectDetailsComponent }
		]),
		SubscribeModule,
		ConfigCreateModule,
		UiModule,
		UiUtilsModule
	],
	exports: [ ProjectDetailsComponent ],
})
export class ProjectDetailsModule {}
