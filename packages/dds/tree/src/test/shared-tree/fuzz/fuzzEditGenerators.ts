/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { strict as assert } from "assert";
import {
	AsyncGenerator,
	AsyncWeights,
	BaseFuzzTestState,
	createWeightedAsyncGenerator,
	done,
	IRandom,
} from "@fluid-internal/stochastic-test-utils";
import { ISharedTree } from "../../../shared-tree";
import { brand, fail } from "../../../util";
import { ITestTreeProvider } from "../../utils";
import {
	CursorLocationType,
	FieldKey,
	FieldUpPath,
	moveToDetachedField,
	UpPath,
} from "../../../core";

export type Operation = TreeOperation | Synchronize;

export type TreeOperation = TreeEdit | TransactionBoundary;

export interface TreeEdit {
	type: "edit";
	contents: FieldEdit | NodeEdit;
}

export interface Synchronize {
	type: "synchronize";
}

export interface TransactionBoundary {
	type: "transaction";
	contents: FuzzTransactionEdit;
	treeIndex: number;
}

export type FuzzFieldChange = FuzzInsert | FuzzDelete;

export interface FieldEdit {
	editType: "fieldEdit";
	change: SequenceFieldEdit; // in the future, add `| OptionalFieldEdit | ValueFieldEdit`
}

export interface FuzzInsert {
	type: "insert";
	parent: UpPath | undefined;
	field: FieldKey;
	index: number;
	value: number;
	treeIndex: number;
}

export interface SequenceFieldEdit {
	type: "sequence";
	edit: FuzzInsert | FuzzDelete;
}

export interface FuzzDelete extends NodeRangePath {
	type: "delete";
	treeIndex: number;
}

export type FuzzNodeEditChange = FuzzSetPayload;

export interface NodeEdit {
	editType: "nodeEdit";
	edit: FuzzNodeEditChange;
}

export interface FuzzSetPayload {
	nodeEditType: "setPayload";
	path: UpPath;
	value: number;
	treeIndex: number;
}

export type FuzzTransactionEdit = TransactionStartOp | TransactionAbortOp | TransactionCommitOp;

export interface TransactionStartOp {
	fuzzType: "transactionStart";
}

export interface TransactionCommitOp {
	fuzzType: "transactionCommit";
}

export interface TransactionAbortOp {
	fuzzType: "transactionAbort";
}

export interface FuzzTestState extends BaseFuzzTestState {
	testTreeProvider: ITestTreeProvider;
	numberOfEdits: number;
}

export interface TreeContext {
	treeIndex: number;
}

export interface NodeRangePath {
	firstNode: UpPath;
	count: number;
}

export interface EditGeneratorOpWeights {
	insert?: number;
	delete?: number;
	setPayload?: number;
	start?: number;
	commit?: number;
	abort?: number;
	synchronize?: number;
}
const defaultEditGeneratorOpWeights = {
	insert: 5,
	delete: 1,
	setPayload: 1,
	start: 3,
	commit: 1,
	abort: 1,
	synchronize: 1,
};

export const makeNodeEditGenerator = (
	opWeights: EditGeneratorOpWeights = defaultEditGeneratorOpWeights,
): AsyncGenerator<NodeEdit, FuzzTestState> => {
	type EditState = FuzzTestState & TreeContext;

	async function setPayloadGenerator(state: EditState): Promise<FuzzSetPayload> {
		const trees = state.testTreeProvider.trees;
		const tree = trees[state.treeIndex];
		// generate edit for that specific tree
		const path = getExistingRandomNodePosition(tree, state.random);
		return {
			nodeEditType: "setPayload",
			path,
			value: state.random.integer(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
			treeIndex: state.treeIndex,
		};
	}

	const baseNodeEditGenerator = createWeightedAsyncGenerator<FuzzNodeEditChange, EditState>([
		[
			setPayloadGenerator,
			opWeights.setPayload ?? 0,
			({ testTreeProvider, treeIndex }) =>
				containsAtLeastOneNode(testTreeProvider.trees[treeIndex]),
		],
	]);

	const buildOperation = (contents: FuzzNodeEditChange) => {
		const operation: NodeEdit = {
			editType: "nodeEdit",
			edit: contents,
		};
		return operation;
	};

	return createAsyncGenerator<FuzzNodeEditChange, NodeEdit>(
		baseNodeEditGenerator,
		buildOperation,
	);
};

export const makeFieldEditGenerator = (
	opWeights: EditGeneratorOpWeights = defaultEditGeneratorOpWeights,
): AsyncGenerator<FieldEdit, FuzzTestState> => {
	type EditState = FuzzTestState & TreeContext;
	async function fieldEditGenerator(state: EditState): Promise<SequenceFieldEdit> {
		const trees = state.testTreeProvider.trees;
		const tree = trees[state.treeIndex];
		// generate edit for that specific tree
		const { fieldPath, fieldKey, count } = getExistingFieldPath(tree, state.random);
		assert(fieldPath.parent !== undefined);
		const fieldEditType = Array(opWeights.insert ?? 0)
			.fill("insert")
			.concat(Array(opWeights.delete ?? 0).fill("delete"));

		switch (fieldKey) {
			case sequenceFieldKey: {
				const opType = count === 0 ? "insert" : state.random.pick(fieldEditType);
				switch (opType) {
					case "insert":
						return generateSequenceFieldInsertOp(
							fieldPath,
							fieldKey,
							state.random.integer(0, count),
							state.random,
							state.treeIndex,
						);
					case "delete":
						return generateSequenceFieldDeleteOp(
							fieldPath,
							state.random,
							count,
							state.treeIndex,
						);
					default:
						break;
				}
			}
			default:
				// default case returns a sequence field edit for now.
				return generateSequenceFieldInsertOp(
					fieldPath,
					fieldKey,
					state.random.integer(0, count),
					state.random,
					state.treeIndex,
				);
		}
	}

	function generateSequenceFieldDeleteOp(
		fieldPath: FieldUpPath,
		random: IRandom,
		count: number,
		treeIndex: number,
	): SequenceFieldEdit {
		const nodeIndex = random.integer(0, count - 1);
		const rangeSize = random.integer(1, count - nodeIndex);
		const firstNode: UpPath = {
			parent: fieldPath.parent,
			parentField: fieldPath.field,
			parentIndex: nodeIndex,
		};
		const contents: FuzzDelete = {
			type: "delete",
			firstNode,
			count: rangeSize,
			treeIndex,
		};
		return { type: "sequence", edit: contents };
	}

	function generateSequenceFieldInsertOp(
		fieldPath: FieldUpPath,
		fieldKey: FieldKey,
		fieldIndex: number,
		random: IRandom,
		treeIndex: number,
	): SequenceFieldEdit {
		const contents: FuzzInsert = {
			type: "insert",
			parent: fieldPath.parent,
			field: fieldKey,
			index: fieldIndex,
			value: random.integer(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
			treeIndex,
		};
		return {
			type: "sequence",
			edit: contents,
		};
	}

	const baseFieldEditGenerator = createWeightedAsyncGenerator<SequenceFieldEdit, EditState>([
		[
			fieldEditGenerator,
			sumWeights([opWeights.insert, opWeights.delete]),
			({ testTreeProvider, treeIndex }) =>
				containsAtLeastOneNode(testTreeProvider.trees[treeIndex]),
		],
	]);

	const buildOperation = (contents: SequenceFieldEdit) => {
		const operation: FieldEdit = {
			editType: "fieldEdit",
			change: contents,
		};
		return operation;
	};

	return createAsyncGenerator<SequenceFieldEdit, FieldEdit>(
		baseFieldEditGenerator,
		buildOperation,
	);
};

export const makeEditGenerator = (
	opWeights: EditGeneratorOpWeights = defaultEditGeneratorOpWeights,
): AsyncGenerator<TreeEdit, FuzzTestState> => {
	type EditState = FuzzTestState & TreeContext;
	const baseEditGenerator = createWeightedAsyncGenerator<FieldEdit | NodeEdit, EditState>([
		[
			makeFieldEditGenerator(),
			sumWeights([opWeights.delete, opWeights.insert]),
			({ testTreeProvider, treeIndex }) =>
				containsAtLeastOneNode(testTreeProvider.trees[treeIndex]),
		],
		[makeNodeEditGenerator(), opWeights.setPayload ?? 0],
	]);

	const buildOperation = (contents: FieldEdit | NodeEdit) => {
		const operation: TreeEdit = {
			type: "edit",
			contents,
		};
		return operation;
	};

	return createAsyncGenerator<FieldEdit | NodeEdit, TreeEdit>(baseEditGenerator, buildOperation);
};

export const makeTransactionEditGenerator = (
	opWeights: EditGeneratorOpWeights = defaultEditGeneratorOpWeights,
): AsyncGenerator<TransactionBoundary, FuzzTestState> => {
	type EditState = FuzzTestState & TreeContext;

	async function transactionStartGenerator(state: EditState): Promise<TransactionStartOp> {
		return {
			fuzzType: "transactionStart",
		};
	}

	async function transactionCommitGenerator(state: EditState): Promise<TransactionCommitOp> {
		return {
			fuzzType: "transactionCommit",
		};
	}

	async function transactionAbortGenerator(state: EditState): Promise<TransactionAbortOp> {
		return {
			fuzzType: "transactionAbort",
		};
	}

	const baseTransactionEditGenerator = createWeightedAsyncGenerator<
		FuzzTransactionEdit,
		EditState
	>([
		[transactionStartGenerator, opWeights.start ?? 0],
		[
			transactionCommitGenerator,
			opWeights.commit ?? 0,
			({ testTreeProvider, treeIndex }) =>
				transactionsInProgress(testTreeProvider.trees[treeIndex]),
		],
		[
			transactionAbortGenerator,
			opWeights.abort ?? 0,
			({ testTreeProvider, treeIndex }) =>
				transactionsInProgress(testTreeProvider.trees[treeIndex]),
		],
	]);

	const buildOperation = (contents: FuzzTransactionEdit, treeIndex: number) => {
		const operation: TransactionBoundary = {
			type: "transaction",
			contents,
			treeIndex,
		};
		return operation;
	};

	return createAsyncGenerator<FuzzTransactionEdit, TransactionBoundary>(
		baseTransactionEditGenerator,
		buildOperation,
	);
};

function createAsyncGenerator<Op, OpOut>(
	baseGenerator: (state: FuzzTestState & TreeContext) => Promise<Op | typeof done>,
	buildOperation: (contents: Op, treeIndex: number) => OpOut,
): AsyncGenerator<OpOut, FuzzTestState> {
	return async (state: FuzzTestState): Promise<OpOut | typeof done> => {
		const trees = state.testTreeProvider.trees;
		// does not include last tree, as we want a passive client
		const treeIndex = trees.length === 1 ? 0 : state.random.integer(0, trees.length - 2);

		const contents = await baseGenerator({
			...state,
			treeIndex,
		});
		state.numberOfEdits += 1;
		if (contents === done) {
			return done;
		}
		return buildOperation(contents, treeIndex);
	};
}

export function makeOpGenerator(
	opWeights: EditGeneratorOpWeights = defaultEditGeneratorOpWeights,
): AsyncGenerator<Operation, FuzzTestState> {
	const generatorWeights: AsyncWeights<Operation, FuzzTestState> = [
		[
			makeEditGenerator(opWeights),
			sumWeights([opWeights.delete, opWeights.insert, opWeights.setPayload]),
		],
		[{ type: "synchronize" }, opWeights.synchronize ?? 0],
		[
			makeTransactionEditGenerator(opWeights),
			sumWeights([opWeights.abort, opWeights.commit, opWeights.start]),
		],
	];
	return createWeightedAsyncGenerator(generatorWeights);
}

function sumWeights(values: (number | undefined)[]): number {
	let sum = 0;
	for (const value of values) {
		if (value !== undefined) {
			sum += value;
		}
	}
	return sum;
}

const moves = {
	field: ["enterNode", "nextField"],
	nodes: ["stop", "firstField"],
};

const sequenceFieldKey: FieldKey = brand("sequenceField");

export interface FieldPathWithCount {
	fieldPath: FieldUpPath;
	fieldKey: FieldKey;
	count: number;
}

function getExistingFieldPath(tree: ISharedTree, random: IRandom): FieldPathWithCount {
	const cursor = tree.forest.allocateCursor();
	moveToDetachedField(tree.forest, cursor);
	const firstNode = cursor.firstNode();
	assert(firstNode, "tree must contain at least one node");
	const firstPath = cursor.getPath();
	assert(firstPath !== undefined, "firstPath must be defined");
	let path: UpPath = firstPath;
	const firstField = cursor.firstField();
	let currentField = cursor.getFieldKey();
	let currentFieldPath = cursor.getFieldPath();
	let fieldNodes: number = cursor.getFieldLength();
	if (!firstField) {
		// no fields, return the rootnode
		cursor.free();
		return {
			fieldPath: currentFieldPath,
			fieldKey: currentField,
			count: fieldNodes,
		};
	}
	currentField = cursor.getFieldKey();
	currentFieldPath = cursor.getFieldPath();
	fieldNodes = cursor.getFieldLength();
	let nodeIndex: number = 0;

	let currentMove = random.pick(moves.field);
	assert(cursor.mode === CursorLocationType.Fields);

	while (currentMove !== "stop") {
		switch (currentMove) {
			case "enterNode":
				if (fieldNodes > 0) {
					nodeIndex = random.integer(0, fieldNodes - 1);
					cursor.enterNode(nodeIndex);
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					path = cursor.getPath()!;
					currentMove = random.pick(moves.nodes);
				} else {
					// if the node does not exist, return the most recently entered node
					cursor.free();
					return {
						fieldPath: currentFieldPath,
						fieldKey: currentField,
						count: fieldNodes,
					};
				}
				break;
			case "firstField":
				if (cursor.firstField()) {
					currentMove = random.pick(moves.field);
					fieldNodes = cursor.getFieldLength();
					currentField = cursor.getFieldKey();
					currentFieldPath = cursor.getFieldPath();
				} else {
					currentMove = "stop";
				}
				break;
			case "nextField":
				if (cursor.nextField()) {
					currentMove = random.pick(moves.field);
					fieldNodes = cursor.getFieldLength();
					currentField = cursor.getFieldKey();
					currentFieldPath = cursor.getFieldPath();
				} else {
					currentMove = "stop";
				}
				break;
			default:
				fail(`Unexpected move ${currentMove}`);
		}
	}
	cursor.free();
	return {
		fieldPath: currentFieldPath,
		fieldKey: currentField,
		count: fieldNodes,
	};
}

function getExistingRandomNodePosition(tree: ISharedTree, random: IRandom): UpPath {
	const { firstNode: firstNodePath } = getExistingRandomNodeRangePath(tree, random);
	return firstNodePath;
}

function getExistingRandomNodeRangePath(tree: ISharedTree, random: IRandom): NodeRangePath {
	const cursor = tree.forest.allocateCursor();
	moveToDetachedField(tree.forest, cursor);
	const firstNode = cursor.firstNode();
	assert(firstNode, "tree must contain at least one node");
	const firstPath = cursor.getPath();
	assert(firstPath !== undefined, "firstPath must be defined");
	let path: UpPath = firstPath;
	const firstField = cursor.firstField();
	if (!firstField) {
		// no fields, return the rootnode
		cursor.free();
		return { firstNode: path, count: 1 };
	}
	let fieldNodes: number = cursor.getFieldLength();
	let nodeIndex: number = 0;
	let rangeSize: number = 1;

	let currentMove = random.pick(moves.field);
	assert(cursor.mode === CursorLocationType.Fields);

	while (currentMove !== "stop") {
		switch (currentMove) {
			case "enterNode":
				if (fieldNodes > 0) {
					nodeIndex = random.integer(0, fieldNodes - 1);
					rangeSize = random.integer(1, fieldNodes - nodeIndex);
					cursor.enterNode(nodeIndex);
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					path = cursor.getPath()!;
					currentMove = random.pick(moves.nodes);
				} else {
					// if the node does not exist, return the most recently entered node
					cursor.free();
					return { firstNode: path, count: rangeSize };
				}
				break;
			case "firstField":
				if (cursor.firstField()) {
					currentMove = random.pick(moves.field);
					fieldNodes = cursor.getFieldLength();
				} else {
					currentMove = "stop";
				}
				break;
			case "nextField":
				if (cursor.nextField()) {
					currentMove = random.pick(moves.field);
					fieldNodes = cursor.getFieldLength();
				} else {
					currentMove = "stop";
				}
				break;
			default:
				fail(`Unexpected move ${currentMove}`);
		}
	}
	cursor.free();
	return { firstNode: path, count: rangeSize };
}

function containsAtLeastOneNode(tree: ISharedTree): boolean {
	const cursor = tree.forest.allocateCursor();
	moveToDetachedField(tree.forest, cursor);
	const firstNode = cursor.firstNode();
	cursor.free();
	return firstNode;
}

function transactionsInProgress(tree: ISharedTree) {
	return tree.transaction.inProgress();
}
