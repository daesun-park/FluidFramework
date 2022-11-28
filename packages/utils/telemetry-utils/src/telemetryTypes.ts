/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { ITelemetryBaseLogger, TelemetryEventCategory } from "@fluidframework/common-definitions";

/**
 * Property types that can be logged.
 */
export type TelemetryEventPropertyTypeExt =
    | string
    | number
    | boolean
    | undefined
    | (string | number | boolean)[];

 /**
  * A property to be logged to telemetry containing both the value and a tag. Tags are generic strings that can be used
  * to mark pieces of information that should be organized or handled differently by loggers in various first or third
  * party scenarios. For example, tags are used to mark personal information that should not be stored in logs.
  */
export interface ITaggedTelemetryPropertyTypeExt {
    value: TelemetryEventPropertyTypeExt;
    tag: string;
}

/**
 * JSON-serializable properties, which will be logged with telemetry.
 */
export interface ITelemetryPropertiesExt {
    [index: string]: TelemetryEventPropertyTypeExt | ITaggedTelemetryPropertyTypeExt;
}

/**
 * Base interface for logging telemetry statements.
 * Can contain any number of properties that get serialized as json payload.
 * @param category - category of the event, like "error", "performance", "generic", etc.
 * @param eventName - name of the event.
 */
 export interface ITelemetryEvent extends ITelemetryPropertiesExt {
    category: string;
    eventName: string;
}

/**
 * Interface to output telemetry events.
 * Implemented by hosting app / loader
 */
 export interface ITelemetryBaseLoggerExt {
    /**
     * An optional boolean which indicates to the user of this interface that tags (i.e. `ITaggedTelemetryPropertyType`
     * objects) are in use. Eventually this will be a required property, but this is a stopgap that allows older hosts
     * to continue to pass through telemetry without trouble (this property will simply show up undefined), while our
     * current logger implementation in `telmetry-utils` handles tags in a separate manner.
     */
    supportsTags?: true;
    send(event: ITelemetryEvent): void;
}

/**
 * Informational (non-error) telemetry event
 * Maps to category = "generic"
 */
 export interface ITelemetryGenericEventExt extends ITelemetryPropertiesExt {
    eventName: string;
    category?: TelemetryEventCategory;
}

/**
 * Error telemetry event.
 * Maps to category = "error"
 */
export interface ITelemetryErrorEventExt extends ITelemetryPropertiesExt {
    eventName: string;
}

/**
 * Performance telemetry event.
 * Maps to category = "performance"
 */
export interface ITelemetryPerformanceEventExt extends ITelemetryGenericEventExt {
    duration?: number; // Duration of event (optional)
}

export interface ITelemetryLoggerExt extends ITelemetryBaseLogger {
    /**
     * Send information telemetry event
     * @param event - Event to send
     * @param error - optional error object to log
     */
    sendTelemetryEvent(event: ITelemetryGenericEventExt, error?: any): void;

    /**
     * Send error telemetry event
     * @param event - Event to send
     */
    sendErrorEvent(event: ITelemetryErrorEventExt, error?: any): void;

    /**
     * Send performance telemetry event
     * @param event - Event to send
     */
    sendPerformanceEvent(event: ITelemetryPerformanceEventExt, error?: any): void;
}

export type TelemetryEventTypes =
    | ITelemetryEvent
    | ITelemetryGenericEventExt
    | ITelemetryErrorEventExt
    | ITelemetryPerformanceEventExt;
