import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectIconComponent } from './project-icon/project-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectIconComponent
  ],
  exports: [ProjectIconComponent]
})
export class UiModule {}
