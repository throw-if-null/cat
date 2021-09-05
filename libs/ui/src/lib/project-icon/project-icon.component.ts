import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export enum ProjectIcon {
	Unknown = 'unknown',
	Angular = 'angular',
	React = 'react',
	Json = 'json',
	DotNET = 'dotnet',
}

@Component({
	selector: 'cat-project-icon',
	templateUrl: './project-icon.component.html',
	styleUrls: ['./project-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectIconComponent {
	@Input() type: ProjectIcon = ProjectIcon.Unknown;
}
