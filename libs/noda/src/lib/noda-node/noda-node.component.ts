import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'noda-node',
	templateUrl: './noda-node.component.html',
	styleUrls: [ './noda-node.component.scss' ]
})
export class NodaNodeComponent implements OnInit {

	@Input() incoming: boolean = false;
	@Input() outgoing: boolean = false;

	@Output() detach: EventEmitter<boolean> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}


	connectInput() {
		console.log('in');
	}

	connectOutput() {
		console.log('out');
	}
}
