import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NodaModule } from '@ratcat/noda';
import { DashboardComponent } from './dashboard.component';

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
