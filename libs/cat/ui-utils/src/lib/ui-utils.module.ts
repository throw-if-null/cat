import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectNamePipe } from './project-name.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [
		ProjectNamePipe
	],
	exports: [
		ProjectNamePipe
	]
})
export class UiUtilsModule {}
