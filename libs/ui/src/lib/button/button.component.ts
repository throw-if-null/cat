import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'cat-button',
	templateUrl: './button.component.html',
	styleUrls: [ './button.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

	@Input() multi = false;
	@Input() add = false;
	@Input() type = 'button';
	@Input() borderless = false;
	@Input() color = false;
}
