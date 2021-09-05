import { Pipe, PipeTransform } from '@angular/core';
import { ProjectIcon } from './project-icon.component';

@Pipe({
	name: 'projectTypeToIcon'
})
export class ProjectTypeIconPipe implements PipeTransform {

	transform(type: number): ProjectIcon {
		return this.getProjectTypeName(type);
	}

	getProjectTypeName(type: number): ProjectIcon {
		switch (type) {
			case 0:
				return ProjectIcon.Json;
			case 1:
				return ProjectIcon.Angular;
			case 2:
				return ProjectIcon.DotNET;
			case 3:
				return ProjectIcon.React;
			default:
				return ProjectIcon.Unknown;
		}
	}

}
