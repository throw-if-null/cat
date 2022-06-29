import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogRef } from "@ngneat/dialog";

@Component({
	selector: 'load-config-import',
	templateUrl: './config-import.component.html',
	styleUrls: [ './config-import.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigImportComponent implements OnInit {

	configuration: string = '';


	constructor(public ref: DialogRef<any>) {
	}

	ngOnInit(): void {
	}

	importConfig() {
		const data = this.configuration;
		let parsedConfig;
		try {
			parsedConfig = JSON.parse(data);
			this.ref.close(parsedConfig);

		} catch (e) {
			console.error('Error while parsing provided configuration', e);
		}

	}
}
