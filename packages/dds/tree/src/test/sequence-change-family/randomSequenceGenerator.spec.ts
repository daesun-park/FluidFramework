/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";
import { FieldKey } from "../../tree";
import { brand } from "../../util";
import { generateRandomUpPaths, generateRandomChange } from "./randomSequenceGenerator";

const testSeed = 432167897;

describe("Test randomSequenceBuilder", () => {
    it("consistency of generateRandomUpPaths with same seed.", () => {
        const fooKey = brand<FieldKey>("foo");
        const upPaths1 = generateRandomUpPaths(new Set([fooKey]), testSeed, 10);
        const upPaths2 = generateRandomUpPaths(new Set([fooKey]), testSeed, 10);
        assert.deepStrictEqual(upPaths1, upPaths2);
    });
    it("consistency of the generateRandomChange with the same seed.", () => {
        const fooKey = brand<FieldKey>("foo");
        const upPaths = generateRandomUpPaths(new Set([fooKey]), testSeed, 10);

        const change1 = generateRandomChange(upPaths, testSeed);
        const change2 = generateRandomChange(upPaths, testSeed);
        assert.deepStrictEqual(change1, change2);
    });
});
