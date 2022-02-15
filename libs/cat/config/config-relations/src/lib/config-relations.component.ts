import { Component, OnInit } from '@angular/core';
import { NodaConnectionChange, NodaNodeData } from "@ratcat/noda";

@Component({
	selector: 'cat-config-relations',
	templateUrl: './config-relations.component.html',
	styleUrls: [ './config-relations.component.scss' ]
})
export class ConfigRelationsComponent implements OnInit {

	nodes: NodaNodeData[] = [
		{
			id: 1,
			name: 'Sandbox',
			parent: 2,

		},
		{
			id: 2,
			name: 'Production',
		},
		{
			id: 3,
			parent: 2,
			name: 'Default',
		}
	];

	constructor() {
	}

	ngOnInit(): void {
	}

	configConnectionChanged($event: NodaConnectionChange) {
		console.log($event);
	}
}
