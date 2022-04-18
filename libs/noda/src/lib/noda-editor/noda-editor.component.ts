import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input, OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { NodaConnectionChange, NodaMouseConnection, NodaNode, NodaNodeConnection, NodaNodeData } from "../node";

// https://www.npmjs.com/package/leader-line
// https://rete.js.org/#/
// https://codepen.io/xgundam05/pen/dyyyVY

type SVGHTMLElement = HTMLElement & SVGElement;

@Component({
	selector: 'noda-editor',
	templateUrl: './noda-editor.component.html',
	styleUrls: [ './noda-editor.component.scss' ]
})
export class NodaEditorComponent implements OnInit, OnChanges {

	@Input() source: NodaNodeData[] = [];
	@Output() connectionChange = new EventEmitter<NodaConnectionChange>();

	@ViewChild('svg') containerSVG!: SVGHTMLElement;
	nodes: NodaNode[] = [];
	connections: NodaNodeConnection[] = [];
	mouseConnection: NodaMouseConnection | undefined;

	private selectedNode: NodaNode | undefined;
	private shiftX = 0;
	private shiftY = 0;

	constructor(private elRef: ElementRef) {

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
		this.initializeNodes();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.hasOwnProperty('source')) {
			this.initializeNodes();
		}
	}

	nodeMouseDown($event: MouseEvent, nodeId: number) {
		const target = $event.target as HTMLElement;
		const { left, top } = this.elRef.nativeElement.getBoundingClientRect();
		this.shiftX = $event.clientX + left - target.getBoundingClientRect().left;
		this.shiftY = $event.clientY + top - target.getBoundingClientRect().top;

		const selectedNode = this.getNodeById(nodeId);

		// move node or mouse connection
		if (target.classList.contains('node')) {
			console.log('selected node');
			this.selectedNode = selectedNode;
		} else if (target.classList.contains('node__connector') && target.classList.contains('out')) {
			console.log('selected connector');
			this.mouseConnection = new NodaMouseConnection(selectedNode);
		}
	}

	nodeMouseUp($event: MouseEvent, nodeId: number) {
		if (this.mouseConnection && this.mouseConnection.getNodeId() !== nodeId) {
			console.log('Create new connection to ', nodeId);
			// create new dropped connection
			const targetNode = this.getNodeById(nodeId);
			this.connections.push(new NodaNodeConnection(this.mouseConnection.getNode(), targetNode));
			this.connectionChange.emit({ connections: this.connections, nodes: this.nodes });
		}
	}

	private initializeNodes() {
		this.resetData();
		this.sortNodes();
		this.initNodes();
	}

	private resetData() {
		this.connections = [];
		this.nodes = [];
		this.selectedNode = undefined;
	}

	private sortNodes() {
		this.source.sort((a) => a.parent ? 1 : -1);
	}

	private initNodes() {
		let column = 0;
		let row = 0;
		const padding = 15;
		const nodeHeight = 75;
		const nodeWidth = 200;
		const editorWidth = 750;

		// init all nodes
		for (const node of this.source) {
			const tmpNode = new NodaNode(node.id);
			tmpNode.setPosition(padding + (padding + nodeWidth) * column++, padding + row * (padding + nodeHeight));

			if (nodeWidth * column > editorWidth) {
				row++;
				column = 0;
			}

			this.nodes.push(tmpNode);
		}

		this.initNodeConnections();
	}

	private initNodeConnections(): void {
		for (const node of this.source) {
			if (node.parent) {
				const parentNode = this.getNodeById(node.parent);
				const childNode = this.getNodeById(node.id);
				this.connections.push(new NodaNodeConnection(parentNode, childNode));
			}
		}
	}

	private getNodeById(nodeId: number): NodaNode {
		const node = this.nodes.find(node => node.id === nodeId);
		if (!node) {
			throw new Error('Could not find node ' + nodeId);
		}
		return node;
	}
}
