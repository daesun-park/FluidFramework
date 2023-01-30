/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import { strict as assert } from "assert";
import {
    AsyncGenerator,
    makeRandom,
    describeFuzz,
    performFuzzActionsAsync as performFuzzActionsBase,
    takeAsync as take,
    IRandom,
} from "@fluid-internal/stochastic-test-utils";
import { FieldKinds, singleTextCursor, namedTreeSchema } from "../../feature-libraries";
import { brand, fail } from "../../util";
import { initializeTestTree, SummarizeType, TestTreeProvider, validateTree } from "../utils";
import { ISharedTree } from "../../shared-tree";
import {
    JsonableTree,
    rootFieldKey,
    rootFieldKeySymbol,
    moveToDetachedField,
    TransactionResult,
    fieldSchema,
    SchemaData,
    UpPath,
    compareUpPaths,
} from "../../core";
import { FuzzChange, FuzzTestState, makeOpGenerator, Operation } from "./fuzzEditGenerator";

const initialTreeState: JsonableTree = {
    type: brand("Node"),
    fields: {
        foo: [
            { type: brand("Number"), value: 0 },
            { type: brand("Number"), value: 1 },
            { type: brand("Number"), value: 2 },
        ],
        foo2: [
            { type: brand("Number"), value: 0 },
            { type: brand("Number"), value: 1 },
            { type: brand("Number"), value: 2 },
        ],
    },
};

const rootFieldSchema = fieldSchema(FieldKinds.value);
const rootNodeSchema = namedTreeSchema({
    name: brand("TestValue"),
    extraLocalFields: fieldSchema(FieldKinds.sequence),
});
const testSchema: SchemaData = {
    treeSchema: new Map([[rootNodeSchema.name, rootNodeSchema]]),
    globalFieldSchema: new Map([[rootFieldKey, rootFieldSchema]]),
};

export async function performFuzzActions(
    generator: AsyncGenerator<Operation, FuzzTestState>,
    seed: number,
    saveInfo?: { saveAt?: number; saveOnFailure: boolean; filepath: string },
): Promise<FuzzTestState> {
    const random = makeRandom(seed);
    const provider = await TestTreeProvider.create(4, SummarizeType.onDemand);
    initializeTestTree(provider.trees[0], initialTreeState, testSchema);
    await provider.ensureSynchronized();

    const initialState: FuzzTestState = {
        random,
        testTreeProvider: provider,
        numberOfEdits: 0,
    };
    await initialState.testTreeProvider.ensureSynchronized();

    const finalState = await performFuzzActionsBase(
        generator,
        {
            edit: async (state, operation) => {
                const { index, contents } = operation;
                const tree = state.testTreeProvider.trees[index];
                applyFuzzChange(tree, contents, TransactionResult.Apply);
                return state;
            },
            synchronize: async (state) => {
                const { testTreeProvider } = state;
                await testTreeProvider.ensureSynchronized();
                return state;
            },
        },
        initialState,
        saveInfo,
    );
    await finalState.testTreeProvider.ensureSynchronized();
    return finalState;
}

export async function performFuzzActionsAbort(
    generator: AsyncGenerator<Operation, FuzzTestState>,
    seed: number,
    saveInfo?: { saveAt?: number; saveOnFailure: boolean; filepath: string },
): Promise<FuzzTestState> {
    const random = makeRandom(seed);
    const provider = await TestTreeProvider.create(4, SummarizeType.onDemand);
    const tree = provider.trees[0];

    initializeTestTree(provider.trees[0], initialTreeState, testSchema);
    validateTree(provider.trees[0], [initialTreeState]);

    // building the anchor for anchor stability test
    const cursor = tree.forest.allocateCursor();
    moveToDetachedField(tree.forest, cursor);
    cursor.enterNode(0);
    cursor.getPath();
    cursor.firstField();
    cursor.getFieldKey();
    cursor.enterNode(1);
    const firstAnchor = cursor.buildAnchor();
    cursor.free();

    const initialState: FuzzTestState = {
        random,
        testTreeProvider: provider,
        numberOfEdits: 0,
    };
    const finalState = await performFuzzActionsBase(
        generator,
        {
            edit: async (state, operation) => {
                const { index, contents } = operation;
                applyFuzzChange(tree, contents, TransactionResult.Abort);
                return state;
            },
            synchronize: async (state) => {
                const { testTreeProvider } = state;
                if (testTreeProvider === undefined) {
                    fail("Attempted to synchronize with undefined testObjectProvider");
                }
                await testTreeProvider.ensureSynchronized();
                return state;
            },
        },
        initialState,
        saveInfo,
    );

    await finalState.testTreeProvider.ensureSynchronized();
    validateTree(provider.trees[0], [initialTreeState]);

    // validate anchor
    const expectedPath: UpPath = {
        parent: {
            parent: undefined,
            parentIndex: 0,
            parentField: rootFieldKeySymbol,
        },
        parentField: brand("foo"),
        parentIndex: 1,
    };
    const anchorPath = tree.locate(firstAnchor);
    assert(compareUpPaths(expectedPath, anchorPath));
    return finalState;
}

function applyFuzzChange(
    tree: ISharedTree,
    contents: FuzzChange,
    transactionResult: TransactionResult,
): void {
    switch (contents.fuzzType) {
        case "insert":
            tree.runTransaction((forest, editor) => {
                const field = editor.sequenceField(contents.parent, contents.field);
                field.insert(
                    contents.index,
                    singleTextCursor({ type: brand("Test"), value: contents.value }),
                );
                return transactionResult;
            });
            break;
        case "delete":
            // generated edit returns path as undefined if no node exists
            if (contents.path !== undefined) {
                const parent = contents.path?.parent;
                const delField = contents.path?.parentField;
                const parentIndex = contents.path?.parentIndex;
                tree.runTransaction((forest, editor) => {
                    const field = editor.sequenceField(parent, delField);
                    field.delete(parentIndex, 1);
                    return transactionResult;
                });
            }
            break;
        case "setPayload":
            // generated edit returns path as undefined if no node exists
            if (contents.path !== undefined) {
                const path = contents.path;
                tree.runTransaction((forest, editor) => {
                    editor.setValue(path, contents.value);
                    return transactionResult;
                });
            }
            break;
        default:
            fail("Invalid edit.");
    }
}

function runBatch(
    opGenerator: () => AsyncGenerator<Operation, FuzzTestState>,
    fuzzActions: (
        generatorFactory: AsyncGenerator<Operation, FuzzTestState>,
        seed: number,
    ) => Promise<FuzzTestState>,
    opsPerRun: number,
    batchSize: number,
    random: IRandom,
    skipTests?: boolean,
): void {
    const seed = random.integer(1, 1000000);
    for (let i = 0; i < batchSize; i++) {
        const runSeed = seed + i;
        const generatorFactory = () => take(opsPerRun, opGenerator());
        if (skipTests) {
            it.skip(`with seed ${runSeed}`, async () => {
                await fuzzActions(generatorFactory(), runSeed);
            }).timeout(20000);
        } else {
            it(`with seed ${runSeed}`, async () => {
                await fuzzActions(generatorFactory(), runSeed);
            }).timeout(20000);
        }
    }
}

export function runSharedTreeFuzzTests(title: string): void {
    const random = makeRandom(0);
    const testBatchSize = 20;
    describeFuzz(title, () => {
        const testOpsPerRun = 20;
        describe("basic convergence", () => {
            describe("using TestTreeProvider", () => {
                describe(`with stepSize ${testOpsPerRun}`, () => {
                    runBatch(
                        makeOpGenerator,
                        performFuzzActions,
                        testOpsPerRun,
                        testBatchSize,
                        random,
                    );
                });
            });
        });
        describe("abort all edits", () => {
            describe("using TestTreeProvider", () => {
                describe(`with stepSize ${testOpsPerRun}`, () => {
                    runBatch(
                        makeOpGenerator,
                        performFuzzActionsAbort,
                        testOpsPerRun,
                        testBatchSize,
                        random,
                        true,
                    );
                });
            });
        });
    });
}

describe("SharedTreeFuzz", () => {
    runSharedTreeFuzzTests("test shared tree fuzz");
});
