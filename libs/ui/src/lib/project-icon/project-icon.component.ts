import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	selector: 'cat-project-icon',
	templateUrl: './project-icon.component.html',
	styleUrls: ['./project-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectIconComponent implements OnInit {
	@Input() type: string = '';

	constructor() {}

	ngOnInit(): void {}
}
