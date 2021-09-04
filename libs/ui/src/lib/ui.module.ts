import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { FilterPipe } from './filter.pipe';
import { HighlightDirective } from './highlight.directive';
import { LoaderComponent } from './loader/loader.component';
import { ProjectIconComponent } from './project-icon/project-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectIconComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    FilterPipe,
    HighlightDirective,
    LoaderComponent,
    CardComponent
  ],
  exports: [
    ProjectIconComponent,
    EditableComponent,
    EditModeDirective,
    ViewModeDirective,
    FilterPipe,
    HighlightDirective,
    LoaderComponent,
    CardComponent
  ]
})
export class UiModule {}
