import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'rat-project-create',
	templateUrl: './project-create.component.html',
	styleUrls: ['./project-create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent implements OnInit {

	platforms: any = ['Angular', 'React', 'JSON']

	projectForm = new FormGroup({
		name: new FormControl('', Validators.required),
		platform: new FormControl(0, Validators.required)
	});

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit() {
		console.warn(this.projectForm.value);

	}
}
