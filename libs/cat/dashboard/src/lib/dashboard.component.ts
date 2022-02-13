import { Component } from '@angular/core';
import { NodaConnectionChange, NodaNodeData } from "@ratcat/noda";

@Component({
	selector: 'cat-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent {
	nodes: NodaNodeData[] = [
		{
			id: 1,
			name: 'Sandbox',
		},
		{
			id: 2,
			name: 'Production',
		},
		{
			id: 3,
			name: 'Default',
		}
	];

	configConnectionChanged($event: NodaConnectionChange) {
		console.log($event);
	}
}
