/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { makeRandom } from "@fluid-internal/stochastic-test-utils";
import { ChangeRebaser } from "../../rebase";
import { AnchorSet, generateFuzzyCombinedChange } from "../../tree";

const testSeed = 432167897;

const counterRebaser: ChangeRebaser<number> = {
    compose: (changes: number[]) => changes.reduce((a, b) => a + b, 0),
    invert: (change: number) => -change,
    rebase: (change: number, over: number) => change,
    rebaseAnchors: (anchor: AnchorSet, over: number) => {},
};

function generateRandomCounterChange(seed: number) {
    return makeRandom(seed).integer(-1000, 1000);
}

describe("Test generateFuzzyCombinedChange function", () => {
    it("consistency of the generateFuzzyCombinedChange using counter field kind.", () => {
        const change1 = generateFuzzyCombinedChange(
            counterRebaser,
            generateRandomCounterChange,
            testSeed,
            10,
        );
        const change2 = generateFuzzyCombinedChange(
            counterRebaser,
            generateRandomCounterChange,
            testSeed,
            10,
        );
        assert.deepStrictEqual(change1, change2);
    });
});
