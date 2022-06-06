import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationTypeNamePipe } from "./configuration-type-name.pipe";
import { FilterPipe } from './filter.pipe';
import { PermissionDirective } from './permission.directive';
import { ProjectNamePipe } from './project-name.pipe';
import { ProjectTypeNamePipe } from './project-type-name.pipe';
import { ValueTypeDirective } from './value-type.directive';


@NgModule({
	imports: [CommonModule],
	declarations: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		ConfigurationTypeNamePipe,
		FilterPipe,
		ValueTypeDirective,
		PermissionDirective
	],
	exports: [
		ProjectNamePipe,
		ProjectTypeNamePipe,
		ConfigurationTypeNamePipe,
		FilterPipe,
		ValueTypeDirective,
		PermissionDirective
	]
})
export class UiUtilsModule {}
