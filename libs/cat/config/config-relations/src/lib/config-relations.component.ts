import { Component, OnInit } from '@angular/core';
import { ConfigurationOverview } from "@cat/domain";
import { DialogRef } from "@ngneat/dialog";
import { NodaConnectionChange, NodaNodeData } from "@ratcat/noda";

@Component({
	selector: 'cat-config-relations',
	templateUrl: './config-relations.component.html',
	styleUrls: [ './config-relations.component.scss' ]
})
export class ConfigRelationsComponent implements OnInit {

	nodes: NodaNodeData[] = [
		// {
		// 	id: 1,
		// 	name: 'Sandbox',
		// 	parent: 2,
		//
		// },
		// {
		// 	id: 2,
		// 	name: 'Production',
		// },
		// {
		// 	id: 3,
		// 	parent: 2,
		// 	name: 'Default',
		// }
	];

	private nodeCount = 1;

	constructor(public ref: DialogRef<{ configurations: ConfigurationOverview[] }>) {
	}

	ngOnInit(): void {
		this.parseConfigurationToNodes(this.ref.data.configurations);
	}

	configConnectionChanged($event: NodaConnectionChange) {
		console.log($event);
	}

	private parseConfigurationToNodes(configurations: ConfigurationOverview[]) {
		for (let config of configurations) {
			this.nodes.push({ id: this.nodeCount++, name: config.name });
		}
	}
}
