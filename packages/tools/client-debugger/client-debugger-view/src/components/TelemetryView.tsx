/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";

import { ITelemetryBaseEvent } from "@fluidframework/common-definitions";
import {
	InboundHandlers,
	TelemetryHistoryMessage,
	GetTelemetryHistoryMessage,
	TelemetryEventMessage,
	ISourcedDebuggerMessage,
	handleIncomingMessage,
	postMessagesToWindow,
} from "@fluid-tools/client-debugger";

/**
 * Displays telemetry events generated by FluidFramework in the application.
 */
export function TelemetryView(): React.ReactElement {
	const [telemetryEvents, setTelemetryEvents] = React.useState<ITelemetryBaseEvent[]>([]);

	React.useEffect(() => {
		/**
		 * Handlers for inbound messages related to telemetry.
		 */
		const inboundMessageHandlers: InboundHandlers = {
			["TELEMETRY_EVENT"]: (untypedMessage) => {
				const message: TelemetryEventMessage = untypedMessage as TelemetryEventMessage;
				setTelemetryEvents((currentEvents) => [...message.data.contents, ...currentEvents]);
				return true;
			},
			["TELEMETRY_HISTORY"]: (untypedMessage) => {
				const message: TelemetryHistoryMessage = untypedMessage as TelemetryHistoryMessage;
				setTelemetryEvents(message.data.contents);
				return true;
			},
		};

		// Event handler for messages coming from the Message Relay
		function messageHandler(event: MessageEvent<Partial<ISourcedDebuggerMessage>>): void {
			handleIncomingMessage(event.data, inboundMessageHandlers);
		}

		globalThis.addEventListener("message", messageHandler);

		// Request all log history
		postMessagesToWindow<GetTelemetryHistoryMessage>(undefined, {
			type: "GET_TELEMETRY_HISTORY",
			data: undefined,
		});
	}, [setTelemetryEvents]);

	return <_TelemetryView telemetryEvents={telemetryEvents}></_TelemetryView>;
}

/**
 * {@link _TelemetryView} input props.
 *
 * @internal
 */
export interface _TelemetryViewProps {
	telemetryEvents: ITelemetryBaseEvent[];
}

/**
 * Debugger view that displays fluid telemetry.
 *
 * @remarks Operates strictly on raw data, so it can be potentially re-used acrossed different contexts.
 *
 * @internal
 */
export function _TelemetryView(props: _TelemetryViewProps): React.ReactElement {
	const { telemetryEvents } = props;

	function mapEventCategoryToBackgroundColor(eventCategory: string): string {
		switch (eventCategory) {
			case "generic":
				return "#b8ebf2";
			case "performance":
				return "#4cf5a3";
			case "error":
				return "#f54c4f";
			default:
				return "#d2d3d4";
		}
	}

	function replacer(key, value): unknown {
		// Filtering out properties
		if (key === "eventName" || key === "category") {
			return undefined;
		}
		return value;
	}

	return (
		<div>
			<h3>Telemetry events (newest first):</h3>
			<ul>
				{telemetryEvents.map((message, index) => (
					<div
						key={index}
						style={{
							border: "1px solid black",
							backgroundColor: mapEventCategoryToBackgroundColor(message.category),
							padding: "5px",
						}}
					>
						<h4 style={{ margin: "0px" }}>
							EventName: {message.eventName}
							<br />
							Category: {message.category}
							<br />
							ContainerId: {message.containerId} ({message.clientType})
							<br />
							DocumentId: {message.docId}
						</h4>
						<p>{JSON.stringify(message, replacer, "  ")}</p>
					</div>
				))}
			</ul>
		</div>
	);
}
