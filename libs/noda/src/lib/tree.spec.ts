import { arrayToTree } from "./tree";

describe('Tree', () => {

	const nodes = [
		{
			id: 1,
			name: 'Sandbox',
			parent: 3
		},
		{
			id: 2,
			name: 'Production',
			parent: 3
		},
		{
			id: 3,
			name: 'Default',
		}
	];

	it('should create a tree from array', () => {
		const tree = arrayToTree(nodes, { parentProperty: 'parent' });

		expect(tree).toEqual([
			{
				"children": [
					{ "id": 1, "name": "Sandbox", "parent": 3 },
					{ "id": 2, "name": "Production", "parent": 3 } ],
				"id": 3,
				"name": "Default"
			}
		]);
	});

	it('should create flat array without children', () => {
		const parentless = [
			{
				id: 1,
				name: 'Sandbox',
			},
			{
				id: 2,
				name: 'Production',
			},
			{
				id: 3,
				name: 'Default',
			}
		];
		const tree = arrayToTree(parentless, { parentProperty: 'parent' });

		expect(tree).toEqual([
			{
				"id": 1,
				"name": "Sandbox"
			},
			{
				"id": 2,
				"name": "Production"
			},
			{
				"id": 3,
				"name": "Default"
			}
		]);
	});
});
