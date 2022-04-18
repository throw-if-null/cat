export interface DataPoint {
	x: number;
	y: number;
}

export interface NodaNodeData {
	id: number;
	name: string;
	parent?: number;
}

export interface NodaConnection {
	nodeIds: number[];
}

export interface NodaConnectionChange {
	connections: NodaConnection[];
	nodes: NodaNode[];
}

export class NodaNode {
	id: number;
	x = 0;
	y = 0;
	hasConnectionIn = false;
	hasConnectionOut = false;

	height = 75;
	width = 200;

	constructor(id: number) {
		this.id = id;
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

export class NodaMouseConnection {
	path: any;
	startPoint: DataPoint;

	constructor(private parent: NodaNode) {
		this.startPoint = this.parent.getOutPoint();
	}

	getNodeId(): number {
		return this.parent.id;
	}

	getNode(): NodaNode {
		return this.parent;
	}

	setPath(endPoint: DataPoint): void {
		this.path = createPathString(this.startPoint, endPoint);
	}
}

export class NodaNodeConnection {

	path: any;
	nodeIds: number[] = [];

	constructor(private parent: NodaNode, private child: NodaNode) {
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
