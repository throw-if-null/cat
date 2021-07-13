import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { ProjectIconComponent } from './project-icon/project-icon.component';
import { FilterPipe } from './filter.pipe';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectIconComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    FilterPipe,
    HighlightDirective
  ],
  exports: [
    ProjectIconComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    FilterPipe,
    HighlightDirective
  ]
})
export class UiModule {}
