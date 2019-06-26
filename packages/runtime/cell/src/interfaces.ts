/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedObject } from "@prague/shared-object-common";

/**
 * Shared cell interface
 */
export interface ISharedCell extends ISharedObject {
    /**
     * Retrieves the cell value.
     */
    get(): Promise<any>;

    /**
     * Sets the cell value.
     */
    set(value: any): Promise<void>;

    /**
     * Checks whether cell is empty or not.
     */
    empty(): Promise<boolean>;

    /**
     * Delete the value from the cell.
     */
    delete(): Promise<void>;
}
