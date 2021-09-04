import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigCreateComponent } from '../config/config-create/config-create.component';
import { ProjectService } from '../project.service';
import { ProjectDetails } from '../project.type';

@Component({
	selector: 'cat-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

	project$: Observable<ProjectDetails> | undefined;

	constructor(private route: ActivatedRoute, private projectService: ProjectService, private dialog: DialogService) {

	}

	ngOnInit() {
		this.project$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const projectId = params.get('projectId');
				if (!projectId) {
					throw new Error('Missing project id parameter!');
				}

				return this.projectService.getProjectById(+projectId);
			})
		);
	}

	openCreateConfigDialog() {
		this.dialog.open(ConfigCreateComponent, { closeButton: false, size: 'lg' });
	}
}
