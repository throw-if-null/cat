import { Component, OnInit, ContentChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, switchMapTo, filter, takeUntil } from 'rxjs/operators';
import { EditModeDirective } from './edit-mode.directive';
import { ViewModeDirective } from './view-mode.directive';

@Component({
	selector: 'cat-editable',
	templateUrl: './editable.component.html',
	styleUrls: ['./editable.component.scss'],
	host: { '[class.editing]': 'this.mode === "edit"' }
})
export class EditableComponent implements OnInit {

	@Output() edit = new EventEmitter<any>();
	@ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
	@ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;
	@ContentChild('editInput') editInput: ElementRef | undefined;

	private editMode = new Subject();
	editMode$ = this.editMode.asObservable();

	mode: 'view' | 'edit' = 'view';


	private unsubscribe$ = new Subject();

	constructor(private host: ElementRef) {
	}

	ngOnInit() {
		this.viewModeHandler();
		this.editModeHandler();
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	private get element() {
		return this.host.nativeElement;
	}

	get currentView() {
		return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
	}

	private viewModeHandler() {
		fromEvent(this.element, 'dblclick')
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe(() => {
				this.mode = 'edit';
				this.editMode.next(true);
			});
	}

	private editModeHandler() {
		const clickOutside$ = fromEvent(document, 'mousedown').pipe(
			filter(({ target }) => this.element.contains(target) === false),
			take(1)
		);

		this.editMode$
			.pipe(
				switchMapTo(clickOutside$),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(event => {
				if (!this.editInput) {
					throw new Error('Tried to edit but no input was found!');
				}
				this.edit.next(this.editInput.nativeElement.value);
				this.mode = 'view';
			});
	}

}


