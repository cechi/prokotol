import { ComponentFactory, ComponentId, dom } from "@omegagrid/core";
import { BaseElement } from "./ui/BaseElement";

const factories = new Map<string, ComponentFactory<BaseElement>>([
	['space', (id: ComponentId) => {
		const div = dom.createElement<BaseElement>('div');
		div.innerHTML = `space`;
		return div;
	}], ['empty', (id: ComponentId) => {
		const div = dom.createElement<BaseElement>('div');
		div.innerHTML = `component ${id} not found`;
		return div;
	}]
]);



export function createComponent(componentId: ComponentId) : BaseElement|Promise<BaseElement> {
	const [type, id] = (componentId as string).split(':');
	const f = factories.get(type) ?? factories.get('empty');
	return f(componentId);
}