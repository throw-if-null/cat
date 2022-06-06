import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationType } from '@cat/domain';

@Pipe({
	name: 'configurationTypeToName'
})
export class ConfigurationTypeNamePipe implements PipeTransform {

	transform(type: ConfigurationType): string {
		return this.getProjectTypeName(type);
	}

	getProjectTypeName(type: ConfigurationType): string {
		switch (type) {
			case ConfigurationType.JSON:
				return 'JSON';
			case ConfigurationType.Angular:
				return 'Angular';
			case ConfigurationType.DotNET:
				return 'DotNET';
			case ConfigurationType.ENV:
				return 'Env';
			default:
				return 'Unknown configuration type';
		}
	}
}
