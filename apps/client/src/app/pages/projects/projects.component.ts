import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { of, Observable } from 'rxjs';
import { ProjectCreateComponent } from './project-create/project-create.component';


interface ProjectOverview {
	id: number;
	name: string;
	type: string;
	entries: number;
	configs: number;
}

@Component({
	selector: 'cat-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {


	projects$: Observable<ProjectOverview[]>;

	constructor(private dialog: DialogService) {
		this.projects$ = of<ProjectOverview[]>([
			{
				id: 1,
				name: 'Rat App',
				type: 'angular',
				"entries": 35,
				"configs": 3
			},
			{
				id: 2,
				name: 'Rat API',
				type: 'dotnet',
				"entries": 35,
				"configs": 3
			},
			{
				id: 3,
				name: 'Discord Bot',
				type: 'json',
				"entries": 35,
				"configs": 3
			},
			{
				id: 4,
				name: 'React App',
				type: 'react',
				"entries": 35,
				"configs": 3
			}
		]);
	}

	openCreateDialog() {
		this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });
	}

}
