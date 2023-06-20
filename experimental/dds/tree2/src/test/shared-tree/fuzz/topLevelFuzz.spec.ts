/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
import path from "path";
import { AsyncGenerator, SaveInfo, takeAsync } from "@fluid-internal/stochastic-test-utils";
import { DDSFuzzModel } from "@fluid-internal/test-dds-utils";
import {
	createDDSFuzzSuite,
	DDSFuzzHarnessEvents,
	DDSFuzzTestState,
	// eslint-disable-next-line import/no-internal-modules
} from "@fluid-internal/test-dds-utils/dist/ddsFuzzHarness";
import { TypedEventEmitter } from "@fluidframework/common-utils";
import { SharedTreeTestFactory, validateTreeConsistency } from "../../utils";
import {
	makeOpGenerator,
	makeOpGeneratorFromFilePath,
	EditGeneratorOpWeights,
} from "./fuzzEditGenerators";
import { fuzzReducer } from "./fuzzEditReducers";
import { onCreate } from "./fuzzUtils";
import { Operation } from "./operationTypes";

export function performFuzzActions(
	generator: AsyncGenerator<Operation, DDSFuzzTestState<SharedTreeTestFactory>>,
	testCount: number,
	saveInfo?: SaveInfo,
): void {
	const baseModel: DDSFuzzModel<
		SharedTreeTestFactory,
		Operation,
		DDSFuzzTestState<SharedTreeTestFactory>
	> = {
		workloadName: "SharedTree",
		factory: new SharedTreeTestFactory(onCreate),
		generatorFactory: () => generator,
		reducer: fuzzReducer,
		validateConsistency: validateTreeConsistency,
	};
	const emitter = new TypedEventEmitter<DDSFuzzHarnessEvents>();

	createDDSFuzzSuite(baseModel, {
		defaultTestCount: testCount,
		numberOfClients: 3,
		clientJoinOptions: {
			maxNumberOfClients: 6,
			clientAddProbability: 0.1,
		},
		reconnectProbability: 0.5,
		emitter,
		saveFailures: saveInfo ? { directory: saveInfo.filepath } : false,
	});
}

/**
 * Fuzz tests in this suite are meant to exercise as much of the SharedTree code as possible and do so in the most
 * production-like manner possible. For example, these fuzz tests should not utilize branching APIs to emulate
 * multiple clients working on the same document. Instead, they should use multiple SharedTree instances, tied together
 * by a sequencing service. The tests may still use branching APIs because that's part of the normal usage of
 * SharedTree, but not as way to avoid using multiple SharedTree instances.
 *
 * The fuzz tests should validate that the clients do not crash and that their document states do not diverge.
 * See the "Fuzz - Targeted" test suite for tests that validate more specific code paths or invariants.
 */
describe.only("Fuzz - Top-Level", () => {
	const runsPerBatch = 20;
	const opsPerRun = 20;
	const editGeneratorOpWeights: Partial<EditGeneratorOpWeights> = {
		setPayload: 1,
	};
	const generatorFactory = () => takeAsync(opsPerRun, makeOpGenerator(editGeneratorOpWeights));
	/**
	 * This test suite is meant exercise all public APIs of SharedTree together, as well as all service-oriented
	 * operations (such as summarization and stashed ops).
	 */
	describe("Everything", () => {
		performFuzzActions(generatorFactory(), runsPerBatch);
	});
});

describe.skip("Re-run form ops saved on file", () => {
	// For using saved operations set the value of the runSeed used to saved the ops in the file.
	const runSeed = 0;
	const filepath = path.join(__dirname, `fuzz-tests-saved-ops/ops_with_seed_${runSeed}`);
	it(`with seed ${runSeed}`, async () => {
		performFuzzActions(await makeOpGeneratorFromFilePath(filepath), runSeed);
	}).timeout(20000);
});
