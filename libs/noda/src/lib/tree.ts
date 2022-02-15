function createTree(array: any[], rootNodes: any, customID: string, childrenProperty: string) {
	var tree = [];

	for (var rootNode in rootNodes) {
		var node = rootNodes[rootNode];
		var childNode = array[node[customID]];

		if (!node && !rootNodes.hasOwnProperty(rootNode)) {
			continue;
		}

		if (childNode) {
			node[childrenProperty] = createTree(
				array,
				childNode,
				customID,
				childrenProperty
			);
		}

		tree.push(node);
	}

	return tree;
}

function groupByParents(array: any[], options: TreeOptions) {
	// var arrayByID = keyBy(array, options.customID);

	return array.reduce(function (prev, item) {
		let parentID = item[options.parentProperty];
		if (!parentID) {
			parentID = options.rootID;
		}

		if (parentID && prev.hasOwnProperty(parentID)) {
			prev[parentID].push(item);
			return prev;
		}

		prev[parentID] = [ item ];
		return prev;
	}, {});
}

function isObject(o: any): o is Object {
	return Object.prototype.toString.call(o) === '[object Object]';
}

function deepClone(data: any): any {
	if (Array.isArray(data)) {
		return data.map(deepClone);
	} else if (isObject(data)) {
		return Object.keys(data).reduce(function (o: any, k: string) {
			o[k] = deepClone(data[k]);
			return o;
		}, {});
	} else {
		return data;
	}
}

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 * a parent node could be found. Default: 'parent_id'
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *  - `childrenProperty` (String): A name of a property where children nodes
 * are going to be stored. Default: 'children'.
 *
 * @return {Array} Result of transformation
 */

interface TreeOptions {
	parentProperty: string;
	childrenProperty: string;
	customID: string;
	rootID: string;
}

/**
 * @deprecated tree should not be needed
 */
export function arrayToTree(data: any[], options?: Partial<TreeOptions>) {
	const treeOptions: TreeOptions = {
		...{
			parentProperty: 'parent_id',
			childrenProperty: 'children',
			customID: 'id',
			rootID: '0'
		},
		...options
	};

	if (!Array.isArray(data)) {
		throw new TypeError('Expected an array but got an invalid argument');
	}

	let grouped = groupByParents(deepClone(data), treeOptions);
	return createTree(
		grouped,
		grouped[treeOptions.rootID],
		treeOptions.customID,
		treeOptions.childrenProperty
	);
}
