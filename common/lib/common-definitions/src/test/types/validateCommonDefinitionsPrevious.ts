/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */
/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by fluid-type-validator in @fluidframework/build-tools.
 */
import * as old from "@fluidframework/common-definitions-previous";
import * as current from "../../index";

type TypeOnly<T> = {
    [P in keyof T]: TypeOnly<T[P]>;
};

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_ExtendEventProvider": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_ExtendEventProvider():
    TypeOnly<old.ExtendEventProvider<any,any,any>>;
declare function use_current_TypeAliasDeclaration_ExtendEventProvider(
    use: TypeOnly<current.ExtendEventProvider<any,any,any>>);
use_current_TypeAliasDeclaration_ExtendEventProvider(
    get_old_TypeAliasDeclaration_ExtendEventProvider());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_ExtendEventProvider": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_ExtendEventProvider():
    TypeOnly<current.ExtendEventProvider<any,any,any>>;
declare function use_old_TypeAliasDeclaration_ExtendEventProvider(
    use: TypeOnly<old.ExtendEventProvider<any,any,any>>);
use_old_TypeAliasDeclaration_ExtendEventProvider(
    get_current_TypeAliasDeclaration_ExtendEventProvider());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IDisposable": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IDisposable():
    TypeOnly<old.IDisposable>;
declare function use_current_InterfaceDeclaration_IDisposable(
    use: TypeOnly<current.IDisposable>);
use_current_InterfaceDeclaration_IDisposable(
    get_old_InterfaceDeclaration_IDisposable());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IDisposable": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IDisposable():
    TypeOnly<current.IDisposable>;
declare function use_old_InterfaceDeclaration_IDisposable(
    use: TypeOnly<old.IDisposable>);
use_old_InterfaceDeclaration_IDisposable(
    get_current_InterfaceDeclaration_IDisposable());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IErrorEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IErrorEvent():
    TypeOnly<old.IErrorEvent>;
declare function use_current_InterfaceDeclaration_IErrorEvent(
    use: TypeOnly<current.IErrorEvent>);
use_current_InterfaceDeclaration_IErrorEvent(
    get_old_InterfaceDeclaration_IErrorEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IErrorEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IErrorEvent():
    TypeOnly<current.IErrorEvent>;
declare function use_old_InterfaceDeclaration_IErrorEvent(
    use: TypeOnly<old.IErrorEvent>);
use_old_InterfaceDeclaration_IErrorEvent(
    get_current_InterfaceDeclaration_IErrorEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IEvent():
    TypeOnly<old.IEvent>;
declare function use_current_InterfaceDeclaration_IEvent(
    use: TypeOnly<current.IEvent>);
use_current_InterfaceDeclaration_IEvent(
    get_old_InterfaceDeclaration_IEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IEvent():
    TypeOnly<current.IEvent>;
declare function use_old_InterfaceDeclaration_IEvent(
    use: TypeOnly<old.IEvent>);
use_old_InterfaceDeclaration_IEvent(
    get_current_InterfaceDeclaration_IEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IEventProvider": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_IEventProvider():
    TypeOnly<old.IEventProvider<any>>;
declare function use_current_InterfaceDeclaration_IEventProvider(
    use: TypeOnly<current.IEventProvider<any>>);
use_current_InterfaceDeclaration_IEventProvider(
    get_old_InterfaceDeclaration_IEventProvider());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_IEventProvider": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_IEventProvider():
    TypeOnly<current.IEventProvider<any>>;
declare function use_old_InterfaceDeclaration_IEventProvider(
    use: TypeOnly<old.IEventProvider<any>>);
use_old_InterfaceDeclaration_IEventProvider(
    get_current_InterfaceDeclaration_IEventProvider());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IEventThisPlaceHolder": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_IEventThisPlaceHolder():
    TypeOnly<old.IEventThisPlaceHolder>;
declare function use_current_TypeAliasDeclaration_IEventThisPlaceHolder(
    use: TypeOnly<current.IEventThisPlaceHolder>);
use_current_TypeAliasDeclaration_IEventThisPlaceHolder(
    get_old_TypeAliasDeclaration_IEventThisPlaceHolder());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IEventThisPlaceHolder": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_IEventThisPlaceHolder():
    TypeOnly<current.IEventThisPlaceHolder>;
declare function use_old_TypeAliasDeclaration_IEventThisPlaceHolder(
    use: TypeOnly<old.IEventThisPlaceHolder>);
use_old_TypeAliasDeclaration_IEventThisPlaceHolder(
    get_current_TypeAliasDeclaration_IEventThisPlaceHolder());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IEventTransformer": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_IEventTransformer():
    TypeOnly<old.IEventTransformer<any,any>>;
declare function use_current_TypeAliasDeclaration_IEventTransformer(
    use: TypeOnly<current.IEventTransformer<any,any>>);
use_current_TypeAliasDeclaration_IEventTransformer(
    get_old_TypeAliasDeclaration_IEventTransformer());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_IEventTransformer": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_IEventTransformer():
    TypeOnly<current.IEventTransformer<any,any>>;
declare function use_old_TypeAliasDeclaration_IEventTransformer(
    use: TypeOnly<old.IEventTransformer<any,any>>);
use_old_TypeAliasDeclaration_IEventTransformer(
    get_current_TypeAliasDeclaration_IEventTransformer());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILoggingError": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ILoggingError():
    TypeOnly<old.ILoggingError>;
declare function use_current_InterfaceDeclaration_ILoggingError(
    use: TypeOnly<current.ILoggingError>);
use_current_InterfaceDeclaration_ILoggingError(
    get_old_InterfaceDeclaration_ILoggingError());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ILoggingError": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ILoggingError():
    TypeOnly<current.ILoggingError>;
declare function use_old_InterfaceDeclaration_ILoggingError(
    use: TypeOnly<old.ILoggingError>);
use_old_InterfaceDeclaration_ILoggingError(
    get_current_InterfaceDeclaration_ILoggingError());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITaggedTelemetryPropertyType": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITaggedTelemetryPropertyType():
    TypeOnly<old.ITaggedTelemetryPropertyType>;
declare function use_current_InterfaceDeclaration_ITaggedTelemetryPropertyType(
    use: TypeOnly<current.ITaggedTelemetryPropertyType<any>>);
use_current_InterfaceDeclaration_ITaggedTelemetryPropertyType(
    get_old_InterfaceDeclaration_ITaggedTelemetryPropertyType());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITaggedTelemetryPropertyType": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITaggedTelemetryPropertyType():
    TypeOnly<current.ITaggedTelemetryPropertyType<any>>;
declare function use_old_InterfaceDeclaration_ITaggedTelemetryPropertyType(
    use: TypeOnly<old.ITaggedTelemetryPropertyType>);
use_old_InterfaceDeclaration_ITaggedTelemetryPropertyType(
    get_current_InterfaceDeclaration_ITaggedTelemetryPropertyType());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryBaseEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryBaseEvent():
    TypeOnly<old.ITelemetryBaseEvent>;
declare function use_current_InterfaceDeclaration_ITelemetryBaseEvent(
    use: TypeOnly<current.ITelemetryBaseEvent>);
use_current_InterfaceDeclaration_ITelemetryBaseEvent(
    get_old_InterfaceDeclaration_ITelemetryBaseEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryBaseEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryBaseEvent():
    TypeOnly<current.ITelemetryBaseEvent>;
declare function use_old_InterfaceDeclaration_ITelemetryBaseEvent(
    use: TypeOnly<old.ITelemetryBaseEvent>);
use_old_InterfaceDeclaration_ITelemetryBaseEvent(
    get_current_InterfaceDeclaration_ITelemetryBaseEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryBaseLogger": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryBaseLogger():
    TypeOnly<old.ITelemetryBaseLogger>;
declare function use_current_InterfaceDeclaration_ITelemetryBaseLogger(
    use: TypeOnly<current.ITelemetryBaseLogger>);
use_current_InterfaceDeclaration_ITelemetryBaseLogger(
    get_old_InterfaceDeclaration_ITelemetryBaseLogger());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryBaseLogger": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryBaseLogger():
    TypeOnly<current.ITelemetryBaseLogger>;
declare function use_old_InterfaceDeclaration_ITelemetryBaseLogger(
    use: TypeOnly<old.ITelemetryBaseLogger>);
use_old_InterfaceDeclaration_ITelemetryBaseLogger(
    get_current_InterfaceDeclaration_ITelemetryBaseLogger());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryErrorEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryErrorEvent():
    TypeOnly<old.ITelemetryErrorEvent>;
declare function use_current_InterfaceDeclaration_ITelemetryErrorEvent(
    use: TypeOnly<current.ITelemetryErrorEvent>);
use_current_InterfaceDeclaration_ITelemetryErrorEvent(
    get_old_InterfaceDeclaration_ITelemetryErrorEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryErrorEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryErrorEvent():
    TypeOnly<current.ITelemetryErrorEvent>;
declare function use_old_InterfaceDeclaration_ITelemetryErrorEvent(
    use: TypeOnly<old.ITelemetryErrorEvent>);
use_old_InterfaceDeclaration_ITelemetryErrorEvent(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_ITelemetryErrorEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryGenericEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryGenericEvent():
    TypeOnly<old.ITelemetryGenericEvent>;
declare function use_current_InterfaceDeclaration_ITelemetryGenericEvent(
    use: TypeOnly<current.ITelemetryGenericEvent>);
use_current_InterfaceDeclaration_ITelemetryGenericEvent(
    get_old_InterfaceDeclaration_ITelemetryGenericEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryGenericEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryGenericEvent():
    TypeOnly<current.ITelemetryGenericEvent>;
declare function use_old_InterfaceDeclaration_ITelemetryGenericEvent(
    use: TypeOnly<old.ITelemetryGenericEvent>);
use_old_InterfaceDeclaration_ITelemetryGenericEvent(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_ITelemetryGenericEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryLogger": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryLogger():
    TypeOnly<old.ITelemetryLogger>;
declare function use_current_InterfaceDeclaration_ITelemetryLogger(
    use: TypeOnly<current.ITelemetryLogger>);
use_current_InterfaceDeclaration_ITelemetryLogger(
    get_old_InterfaceDeclaration_ITelemetryLogger());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryLogger": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryLogger():
    TypeOnly<current.ITelemetryLogger>;
declare function use_old_InterfaceDeclaration_ITelemetryLogger(
    use: TypeOnly<old.ITelemetryLogger>);
use_old_InterfaceDeclaration_ITelemetryLogger(
    get_current_InterfaceDeclaration_ITelemetryLogger());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryPerformanceEvent": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryPerformanceEvent():
    TypeOnly<old.ITelemetryPerformanceEvent>;
declare function use_current_InterfaceDeclaration_ITelemetryPerformanceEvent(
    use: TypeOnly<current.ITelemetryPerformanceEvent>);
use_current_InterfaceDeclaration_ITelemetryPerformanceEvent(
    get_old_InterfaceDeclaration_ITelemetryPerformanceEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryPerformanceEvent": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryPerformanceEvent():
    TypeOnly<current.ITelemetryPerformanceEvent>;
declare function use_old_InterfaceDeclaration_ITelemetryPerformanceEvent(
    use: TypeOnly<old.ITelemetryPerformanceEvent>);
use_old_InterfaceDeclaration_ITelemetryPerformanceEvent(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_ITelemetryPerformanceEvent());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryProperties": {"forwardCompat": false}
*/
declare function get_old_InterfaceDeclaration_ITelemetryProperties():
    TypeOnly<old.ITelemetryProperties>;
declare function use_current_InterfaceDeclaration_ITelemetryProperties(
    use: TypeOnly<current.ITelemetryProperties>);
use_current_InterfaceDeclaration_ITelemetryProperties(
    get_old_InterfaceDeclaration_ITelemetryProperties());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "InterfaceDeclaration_ITelemetryProperties": {"backCompat": false}
*/
declare function get_current_InterfaceDeclaration_ITelemetryProperties():
    TypeOnly<current.ITelemetryProperties>;
declare function use_old_InterfaceDeclaration_ITelemetryProperties(
    use: TypeOnly<old.ITelemetryProperties>);
use_old_InterfaceDeclaration_ITelemetryProperties(
    // @ts-expect-error compatibility expected to be broken
    get_current_InterfaceDeclaration_ITelemetryProperties());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_ReplaceIEventThisPlaceHolder": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder():
    TypeOnly<old.ReplaceIEventThisPlaceHolder<any,any>>;
declare function use_current_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder(
    use: TypeOnly<current.ReplaceIEventThisPlaceHolder<any,any>>);
use_current_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder(
    get_old_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_ReplaceIEventThisPlaceHolder": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder():
    TypeOnly<current.ReplaceIEventThisPlaceHolder<any,any>>;
declare function use_old_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder(
    use: TypeOnly<old.ReplaceIEventThisPlaceHolder<any,any>>);
use_old_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder(
    get_current_TypeAliasDeclaration_ReplaceIEventThisPlaceHolder());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TelemetryEventCategory": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_TelemetryEventCategory():
    TypeOnly<old.TelemetryEventCategory>;
declare function use_current_TypeAliasDeclaration_TelemetryEventCategory(
    use: TypeOnly<current.TelemetryEventCategory>);
use_current_TypeAliasDeclaration_TelemetryEventCategory(
    get_old_TypeAliasDeclaration_TelemetryEventCategory());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TelemetryEventCategory": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_TelemetryEventCategory():
    TypeOnly<current.TelemetryEventCategory>;
declare function use_old_TypeAliasDeclaration_TelemetryEventCategory(
    use: TypeOnly<old.TelemetryEventCategory>);
use_old_TypeAliasDeclaration_TelemetryEventCategory(
    get_current_TypeAliasDeclaration_TelemetryEventCategory());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TelemetryEventPropertyType": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_TelemetryEventPropertyType():
    TypeOnly<old.TelemetryEventPropertyType>;
declare function use_current_TypeAliasDeclaration_TelemetryEventPropertyType(
    use: TypeOnly<current.TelemetryEventPropertyType>);
use_current_TypeAliasDeclaration_TelemetryEventPropertyType(
    get_old_TypeAliasDeclaration_TelemetryEventPropertyType());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TelemetryEventPropertyType": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_TelemetryEventPropertyType():
    TypeOnly<current.TelemetryEventPropertyType>;
declare function use_old_TypeAliasDeclaration_TelemetryEventPropertyType(
    use: TypeOnly<old.TelemetryEventPropertyType>);
use_old_TypeAliasDeclaration_TelemetryEventPropertyType(
    // @ts-expect-error compatibility expected to be broken
    get_current_TypeAliasDeclaration_TelemetryEventPropertyType());

/*
* Validate forward compat by using old type in place of current type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TransformedEvent": {"forwardCompat": false}
*/
declare function get_old_TypeAliasDeclaration_TransformedEvent():
    TypeOnly<old.TransformedEvent<any,any,any>>;
declare function use_current_TypeAliasDeclaration_TransformedEvent(
    use: TypeOnly<current.TransformedEvent<any,any,any>>);
use_current_TypeAliasDeclaration_TransformedEvent(
    get_old_TypeAliasDeclaration_TransformedEvent());

/*
* Validate back compat by using current type in place of old type
* If breaking change required, add in package.json under typeValidation.broken:
* "TypeAliasDeclaration_TransformedEvent": {"backCompat": false}
*/
declare function get_current_TypeAliasDeclaration_TransformedEvent():
    TypeOnly<current.TransformedEvent<any,any,any>>;
declare function use_old_TypeAliasDeclaration_TransformedEvent(
    use: TypeOnly<old.TransformedEvent<any,any,any>>);
use_old_TypeAliasDeclaration_TransformedEvent(
    get_current_TypeAliasDeclaration_TransformedEvent());
