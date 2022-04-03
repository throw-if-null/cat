import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationType } from '@cat/domain';


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

	onSubmit() {
		console.warn(this.configurationForm.value);
	}
}
