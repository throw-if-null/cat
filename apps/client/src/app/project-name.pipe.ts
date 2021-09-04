import { Pipe, PipeTransform } from '@angular/core';
import { ProjectType } from './pages/projects/project.type';

@Pipe({
	name: 'projectTypeToName'
})
export class ProjectTypeNamePipe implements PipeTransform {

	transform(type: ProjectType): string {
		return this.getProjectTypeName(type);
	}

	getProjectTypeName(type: ProjectType): string {
		switch (type) {
			case ProjectType.JSON:
				return 'JSON';
			case ProjectType.Angular:
				return 'Angular';

			case ProjectType.DotNET:
				return 'DotNET';
			case ProjectType.React:
				return 'React';
			default:
				return 'Unknown project type';
		}
	}

}
