import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';

// https://www.npmjs.com/package/leader-line
// https://rete.js.org/#/
// https://codepen.io/xgundam05/pen/dyyyVY

type SVGHTMLElement = HTMLElement & SVGElement;

@Component({
	selector: 'noda-editor',
	templateUrl: './noda-editor.component.html',
	styleUrls: [ './noda-editor.component.scss' ]
})
export class NodaEditorComponent implements OnInit, AfterViewInit {

	// @ViewChild('svg') containerSVG!: SVGHTMLElement;
	nodes: Node[] = [];
	private selectedNode: Node | undefined;
	private shiftX: number = 0;
	private shiftY: number = 0;

	constructor(private elRef: ElementRef) {
		const node1 = new Node();
		node1.setPosition(30, 150);
		const node2 = new Node();
		node2.setPosition(150, 30);

		this.nodes.push(node1);
		this.nodes.push(node2);
	}

	@HostListener('mousemove', [ '$event' ])
	onMouseMove($event: MouseEvent) {
		if (this.selectedNode) {
			this.selectedNode.setPosition($event.pageX - this.shiftX, $event.pageY - this.shiftY);
		}
	}

	@HostListener('document:mouseup')
	onMouseUp() {
		this.selectedNode = undefined;
		this.shiftX = 0;
		this.shiftY = 0;
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {

	}

	nodeMouseDown($event: MouseEvent, nodeId: number) {
		const target = $event.target as HTMLElement;
		const { left, top } = this.elRef.nativeElement.getBoundingClientRect();
		this.shiftX = $event.clientX + left - target.getBoundingClientRect().left;
		this.shiftY = $event.clientY + top - target.getBoundingClientRect().top;
		this.selectedNode = this.nodes.find(node => node.id === nodeId)!;
	}
}

let globalNodeId = 1;

class Node {
	id: number;
	x: number = 0;
	y: number = 0;
	connections: number[] = [];
	hasConnectionIn: boolean = true;

	constructor() {
		this.id = globalNodeId++;
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
