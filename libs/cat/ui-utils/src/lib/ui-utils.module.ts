import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { ProjectNamePipe } from './project-name.pipe';
import { ProjectTypeNamePipe } from './project-type-name.pipe';
import { ValueTypeDirective } from './value-type.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		FilterPipe,
		ValueTypeDirective
	],
	exports: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		FilterPipe,
		ValueTypeDirective
	]
})
export class UiUtilsModule {}
