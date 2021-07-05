import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

enum ProjectType {
	Angular = 'angular',
	React = 'react',
	DotNET = 'dotnet',
	JSON = 'json',
}

@Component({
	selector: 'rat-project-create',
	templateUrl: './project-create.component.html',
	styleUrls: ['./project-create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent {

	platforms: ProjectType[] = [ProjectType.Angular, ProjectType.React, ProjectType.JSON];

	projectForm = new FormGroup({
		name: new FormControl('', Validators.required),
		platform: new FormControl(0, Validators.required)
	});

	onSubmit() {
		console.warn(this.projectForm.value);
	}
}
