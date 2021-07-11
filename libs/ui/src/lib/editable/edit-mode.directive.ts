import { Directive, TemplateRef, ContentChild, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[editMode]'
})
export class EditModeDirective {
	@ContentChild('input') inputEl!: HTMLInputElement;

	constructor(public tpl: TemplateRef<any>, public vcRef: ViewContainerRef) { }
}
