import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Project {
	id: string;
	name: string;
	type: string;
}

@Component({
	selector: 'rat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

	project$: Observable<Project> | undefined;

	constructor(private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.project$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const projectId = params.get('projectId') || '';
				return of({ id: projectId, name: 'Rate APP', type: 'angular' });
			})
		);
	}
}
