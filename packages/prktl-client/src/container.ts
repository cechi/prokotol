import { ThemeManager } from "@omegagrid/core";
import { App } from "./App";
import { Relay } from "./protocol/Relay";
import { StoreApi } from "zustand/vanilla";
import { SpaceState } from "./store";

export class ContextEvent extends Event {
	constructor(public type: string) {
		super(`context.${type}`);
	}
}

export class ContextSpaceEvent extends ContextEvent {
	constructor(public type: string) {
		super(`space.${type}`);
	}
}

export class ContextMessageEvent extends ContextEvent {
	constructor(public type: string) {
		super(`message.${type}`);
	}
}

class Events extends EventTarget {
	emit(event: ContextEvent) {
		this.dispatchEvent(event);
	}

	subscribe(event: string, listener: EventListener, options?: EventListenerOptions) {
		this.addEventListener(event, listener, options);
	}

	unsubscribe(event: string, listener: EventListener, options?: EventListenerOptions) {
		this.removeEventListener(event, listener, options);
	}
}

export class Container<TState = unknown> {
	app: App;
	relay: Relay;
	themeManager: ThemeManager;
	events = new Events();
	store: StoreApi<TState>;
}

export const prktl = new Container<SpaceState>();