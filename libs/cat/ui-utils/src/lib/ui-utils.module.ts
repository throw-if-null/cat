import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { ProjectNamePipe } from './project-name.pipe';
import { ProjectTypeNamePipe } from './project-type-name.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		FilterPipe
	],
	exports: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		FilterPipe
	]
})
export class UiUtilsModule {}
