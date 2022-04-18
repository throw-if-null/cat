import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodaNodeComponent } from '../noda-node/noda-node.component';
import { NodaNodeData } from "../node";

import { NodaEditorComponent } from './noda-editor.component';

const testNodes: NodaNodeData[] = [
	{
		id: 1,
		name: 'Sandbox',
		parent: 2,
	},
	{
		id: 2,
		name: 'Production',
	},
	{
		id: 3,
		parent: 2,
		name: 'Default',
	}
];

describe('NodaEditorComponent', () => {
	let component: NodaEditorComponent;
	let fixture: ComponentFixture<NodaEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ NodaEditorComponent, NodaNodeComponent ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NodaEditorComponent);
		component = fixture.componentInstance;
		component.source = testNodes;
		fixture.detectChanges();
	});

	describe('init', () => {

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should init nodes from source data', () => {
			expect(component.nodes.length).toBe(3);
		});

		it('should sort nodes during initialization', () => {
			expect(component.nodes[0].id).toBe(2); // first node should be the root node. Done by parent sorting
		});

		it('should sort create connections parent<->child', () => {
			expect(component.connections.length).toBe(2);
			expect(component.connections[0].nodeIds).toEqual([ 2, 1 ]);
		});

	});
});
