import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

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

	@ViewChild('svg') containerSVG!: SVGHTMLElement;
	nodes: Node[] = [];
	connections: NodaNodeConnection[] = [];
	mouseConnection: NodaMouseConnection | undefined;

	private selectedNode: Node | undefined;
	private shiftX: number = 0;
	private shiftY: number = 0;

	constructor(private elRef: ElementRef) {
		const node1 = new Node();
		node1.setPosition(30, 30);
		const node2 = new Node();
		node2.setPosition(450, 150);

		this.nodes.push(node1);
		this.nodes.push(node2);

		this.connections.push(new NodaNodeConnection(node1, node2));
	}

	@HostListener('mousemove', [ '$event' ])
	onMouseMove($event: MouseEvent) {
		const mousePoint = { x: $event.pageX - this.shiftX, y: $event.pageY - this.shiftY };
		if (this.selectedNode) {
			const selectedId = this.selectedNode.id;
			this.selectedNode.setPosition(mousePoint.x, mousePoint.y);
			// re-create all connections touching this node
			const touchingConnections = this.connections.filter(connection => connection.nodeIds.some(id => id === selectedId));
			touchingConnections.forEach(connection => connection.setPath());
		} else if (this.mouseConnection) {
			// re-create mouse connection
			this.mouseConnection.setPath(mousePoint);
		}
	}

	@HostListener('document:mouseup')
	onMouseUp() {
		this.selectedNode = undefined;
		this.mouseConnection = undefined;
		this.shiftX = 0;
		this.shiftY = 0;
	}

	ngOnInit(): void {

	}

	ngAfterViewInit(): void {

	}

	nodeMouseDown($event: MouseEvent, nodeId: number) {
		const target = $event.target as HTMLElement;
		const { left, top } = this.elRef.nativeElement.getBoundingClientRect();
		this.shiftX = $event.clientX + left - target.getBoundingClientRect().left;
		this.shiftY = $event.clientY + top - target.getBoundingClientRect().top;

		// move node or mouse connection
		if (target.classList.contains('node')) {
			console.log('selected node');
			this.selectedNode = this.nodes.find(node => node.id === nodeId)!;
		} else if (target.classList.contains('node__connector') && target.classList.contains('out')) {
			console.log('selected connector');
			const selectedNode = this.nodes.find(node => node.id === nodeId)!;
			this.mouseConnection = new NodaMouseConnection(selectedNode);
		}
	}

	nodeMouseUp($event: MouseEvent, nodeId: number) {
		if (this.mouseConnection && this.mouseConnection.getNodeId() !== nodeId) {
			console.log('Create new connection');
		}
	}
}

let globalNodeId = 1;

class Node {
	id: number;
	x: number = 0;
	y: number = 0;
	hasConnectionIn: boolean = false;
	hasConnectionOut: boolean = false;

	height = 75;
	width = 200;

	constructor() {
		this.id = globalNodeId++;
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	getInPoint() {
		return { x: this.x, y: this.y + this.height / 2 };
	}

	getOutPoint() {
		return { x: this.x + this.width, y: this.y + this.height / 2 };
	}
}

class NodaMouseConnection {
	path: any;
	startPoint: DataPoint;

	constructor(private parent: Node) {
		this.startPoint = this.parent.getOutPoint();
	}

	getNodeId(): number {
		return this.parent.id;
	}

	setPath(endPoint: DataPoint): void {
		this.path = createPathString(this.startPoint, endPoint);
	}
}

class NodaNodeConnection {

	path: any;
	nodeIds: number[] = [];

	constructor(private parent: Node, private child: Node) {
		this.nodeIds = [ parent.id, child.id ];
		parent.hasConnectionOut = true;
		child.hasConnectionIn = true;
		this.setPath();
	}

	setPath() {
		const startPoint = this.parent.getOutPoint();
		const endPoint = this.child.getInPoint();
		this.path = createPathString(startPoint, endPoint);
	}
}

function createPathString(a: DataPoint, b: DataPoint): string {
	const diff = {
		x: b.x - a.x,
		y: b.y - a.y
	};

	return `M ${ a.x } ${ a.y } C ${ a.x + diff.x / 3 * 2 } ${ a.y } ${ a.x + diff.x / 3 } ${ b.y } ${ b.x } ${ b.y }`;
}

interface DataPoint {
	x: number;
	y: number;
}
