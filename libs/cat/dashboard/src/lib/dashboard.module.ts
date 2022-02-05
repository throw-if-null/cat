import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NodaModule } from "@ratcat/noda";

@NgModule({
	declarations: [ DashboardComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: DashboardComponent
			}
		]),
		NodaModule
	]
})
export class DashboardModule {}
