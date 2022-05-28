import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationType, ProjectCreateData } from '@cat/domain';
import { DialogRef } from "@ngneat/dialog";


@Component({
	selector: 'cat-config-create',
	templateUrl: './config-create.component.html',
	styleUrls: [ './config-create.component.scss' ]
})
export class ConfigCreateComponent {
	configTypes: ConfigurationType[] = [ ConfigurationType.Angular, ConfigurationType.DotNET, ConfigurationType.JSON ];

	configurationForm = new FormGroup({
		name: new FormControl('', Validators.required),
		type: new FormControl(0, Validators.required)
	});

	constructor(public ref: DialogRef<ProjectCreateData>) {
	}

	onSubmit() {
		const data = {
			name: this.configurationForm.value.name,
			typeId: this.configurationForm.value.type
		};
		this.ref.close(data);
	}
}
