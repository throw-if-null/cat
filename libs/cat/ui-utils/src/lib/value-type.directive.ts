import { OnChanges, Directive, ElementRef, Renderer2, SimpleChanges, Input } from '@angular/core';
import { getValueType } from '@cat/utils';

@Directive({
	selector: '[valueType]'
})
export class ValueTypeDirective implements OnChanges {

	@Input() valueType: string | undefined;

	constructor(private el: ElementRef, private renderer: Renderer2) { }


	ngOnChanges(changes: SimpleChanges): void {
		if (this.valueType == null) {
			return;
		}


		this.renderer.addClass(this.el.nativeElement, getValueType(this.valueType));
	}

}
