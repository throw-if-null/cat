import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { of, Observable } from 'rxjs';
import { ProjectCreateComponent } from './project-create/project-create.component';

interface Project {
	id: number;
	name: string;
	type: string;
}

@Component({
	selector: 'rat-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {


	projects$: Observable<Project[]>;

	constructor(private dialog: DialogService) {
		this.projects$ = of([
			{
				id: 1,
				name: 'Rat App',
				type: 'angular'
			},
			{
				id: 2,
				name: 'Rat API',
				type: 'dotnet'
			},
			{
				id: 3,
				name: 'Discord Bot',
				type: 'json'
			},
			{
				id: 4,
				name: 'React App',
				type: 'react'
			}
		]);
	}

	openCreateDialog() {
		this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });
	}

}
