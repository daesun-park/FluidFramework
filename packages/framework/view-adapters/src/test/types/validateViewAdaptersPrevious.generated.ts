/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-test-generator in @fluidframework/build-tools.
 */
import * as old from "@fluidframework/view-adapters-previous";
import * as current from "../../index";

type TypeOnly<T> = {
    [P in keyof T]: TypeOnly<T[P]>;
};

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_MountableView": {"forwardCompat": false}
*/
declare function get_old_ClassDeclaration_MountableView():
    TypeOnly<old.MountableView>;
declare function use_current_ClassDeclaration_MountableView(
    use: TypeOnly<current.MountableView>);
use_current_ClassDeclaration_MountableView(
    get_old_ClassDeclaration_MountableView());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "ClassDeclaration_MountableView": {"backCompat": false}
*/
declare function get_current_ClassDeclaration_MountableView():
    TypeOnly<current.MountableView>;
declare function use_old_ClassDeclaration_MountableView(
    use: TypeOnly<old.MountableView>);
use_old_ClassDeclaration_MountableView(
    get_current_ClassDeclaration_MountableView());
