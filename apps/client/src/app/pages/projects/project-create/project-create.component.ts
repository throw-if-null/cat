import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ProjectCreateData, ProjectType } from '../project.type';

@Component({
	selector: 'cat-project-create',
	templateUrl: './project-create.component.html',
	styleUrls: ['./project-create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent {

	types: ProjectType[] = [ProjectType.Angular, ProjectType.React, ProjectType.DotNET, ProjectType.JSON];

	projectForm = new FormGroup({
		name: new FormControl('', Validators.required),
		type: new FormControl(0, Validators.required)
	});

	constructor(public ref: DialogRef<ProjectCreateData>) {}

	onSubmit() {
		const data = {
			name: this.projectForm.value.name,
			typeId: this.projectForm.value.type
		};
		this.ref.close(data);
	}
}
