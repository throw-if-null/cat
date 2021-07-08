import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigCreateComponent } from '../config-create/config-create.component';

interface Project {
	id: string;
	name: string;
	type: string;
	configurations: any[];
}

@Component({
	selector: 'cat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

	project$: Observable<Project> | undefined;

	constructor(private route: ActivatedRoute, private dialog: DialogService) {

	}

	ngOnInit() {
		this.project$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const projectId = params.get('projectId') || '';
				return of({ id: projectId, name: 'Rate APP', type: 'angular', configurations: [] });
			})
		);
	}

	openCreateConfigDialog() {
		this.dialog.open(ConfigCreateComponent, { closeButton: false, size: 'lg' });
	}
}
