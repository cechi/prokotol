import { ComponentFactory, ComponentId, dom } from "@omegagrid/core";
import { BaseElement } from "./ui/BaseElement";
import { FormContainer } from "@omegagrid/form";
import { SpaceFormAdapter } from "./adapters/SpaceFormAdapter";
import { Container } from "./model/Container";
import { parseComponentId } from "./utils";

let factories: Map<string, ComponentFactory<HTMLElement>>;

function getFactories(container: Container) {
	return factories ?? (factories = new Map<string, ComponentFactory<HTMLElement>>([
		['spaceForm', (id: ComponentId) => {
			const form = dom.createElement<FormContainer>('og-form-container');
			form.adapter = new SpaceFormAdapter(container.relay);
			return form;
		}],	['space', (id: ComponentId) => {
			const div = dom.createElement<BaseElement>('div');
			div.innerHTML = `space`;
			return div;
		}], ['empty', (id: ComponentId) => {
			const div = dom.createElement<BaseElement>('div');
			div.innerHTML = `component ${id} not found`;
			return div;
		}]
	]));
}

export function createComponent(componentId: ComponentId, container: Container) : HTMLElement|Promise<HTMLElement> {
	const parsedId = parseComponentId(componentId);
	const f = getFactories(container).get(parsedId.type) ?? getFactories(container).get('empty');
	return f(componentId);
}