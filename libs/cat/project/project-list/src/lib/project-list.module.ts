import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '@cat/ui';
import { SubscribeModule } from '@ngneat/subscribe';
import { ProjectListComponent } from './project-list.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', pathMatch: 'full', component: ProjectListComponent }
		]),
		RouterModule,
		UiModule,
		SubscribeModule
	],
	declarations: [ProjectListComponent],
	exports: [ProjectListComponent]
})
export class ProjectListModule {}
