import { ComponentId } from "@omegagrid/core";

export function parseComponentId(id: ComponentId) {
	const strId = id.toString();
	const chunks = strId.split('-');
	return {
		type: chunks[0],
		id: chunks[1],
		ids: chunks.slice(1)
	}
}