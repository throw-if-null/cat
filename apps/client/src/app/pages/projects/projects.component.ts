import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProjectCreateComponent, ProjectCreateData } from './project-create/project-create.component';
import { ProjectService, ProjectOverview } from './project.service';


@Component({
  selector: 'cat-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {


  projects$: Observable<ProjectOverview[]>;

  constructor(private projectService: ProjectService, private toast: HotToastService, private dialog: DialogService) {
    this.projects$ = this.projectService.getProjects();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProjectCreateComponent, { closeButton: false, size: 'lg' });

    dialogRef.afterClosed$
             .pipe(take(1))
             .subscribe((data?: ProjectCreateData) => {
               if (data) {
                 this.projectService.createProject(data.name, data.type)
                     .then(res => {
                       this.toast.success(`Yeah! Project - ${ res.name } - created successfully.`);
                     });
               }
             });
  }

}
