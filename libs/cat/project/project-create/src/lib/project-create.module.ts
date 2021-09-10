import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiUtilsModule } from '@cat/ui-utils';
import { ProjectCreateComponent } from './project-create.component';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, UiUtilsModule],
	declarations: [ProjectCreateComponent],
	exports: [ProjectCreateComponent]
})
export class ProjectCreateModule {}
