import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ProjectService } from '../project.service';

export enum ProjectType {
  JSON,
  Angular,
  DotNET,
  React,
}

export interface ProjectCreateData {
  name: string;
  type: number;
}

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
      type: this.projectForm.value.type
    };
    this.ref.close(data);
  }
}
