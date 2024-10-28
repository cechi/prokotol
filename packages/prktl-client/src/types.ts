import { PRKTLID } from "@prokotol/protocol/src/types";
import { Relay } from "./protocol/Relay";
import { ComponentId } from "@omegagrid/core";
import { BaseElement } from "./ui/BaseElement";

export type BaseAdapterOptions = {
	relay: Relay;
	id?: PRKTLID;
}

export type ParsedComponentId = {
	type: string,
	id: string,
	ids: string[]
}

export type ComponentFactory<T extends HTMLElement> = (id: ComponentId|ParsedComponentId) => T|Promise<T>;

export type RequestParamsOrder = ([string, 'asc'|'desc'|undefined][])|string[];

export type RequestHeaders = Record<string, string>;

export type RequestParams = {
	// fields?: string[],
	// filter?: Record<string, any>,
	// order?: RequestParamsOrder,
	// offset?: number,
	// count?: number,
	[key: string]: unknown
}

