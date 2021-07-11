import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { ProjectIconComponent } from './project-icon/project-icon.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		ProjectIconComponent,
		EditableComponent,
		EditModeDirective,
		ViewModeDirective
	],
	exports: [
		ProjectIconComponent,
		EditableComponent,
		EditModeDirective,
		ViewModeDirective
	]
})
export class UiModule {}
