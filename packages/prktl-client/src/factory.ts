import { ComponentId, dom } from "@omegagrid/core";
import { BaseElement } from "./ui/BaseElement";
import { FormContainer } from "@omegagrid/form";
import { SpaceFormAdapter } from "./adapters/SpaceFormAdapter";
import { parseComponentId } from "./utils";
import { ComponentFactory, ParsedComponentId } from "./types";
import { SpaceTreeAdapter } from "./adapters/SpaceTreeAdapter";
import { Tree } from "@omegagrid/tree";

const factories = new Map<string, ComponentFactory<HTMLElement>>([
	['spaceForm', (pid: ParsedComponentId) => {
		const form = dom.createElement<FormContainer>('og-form-container');
		form.adapter = new SpaceFormAdapter(pid.id);
		return form;
	}],	['spaceTree', (pid: ParsedComponentId) => {
		const tree = dom.createElement<Tree>('og-tree');
		tree.adapter = new SpaceTreeAdapter();
		return tree;
	}],	['space', (pid: ParsedComponentId) => {
		const div = dom.createElement<BaseElement>('div');
		div.innerHTML = `space`;
		return div;
	}], ['empty', (pid: ParsedComponentId) => {
		const div = dom.createElement<BaseElement>('div');
		div.innerHTML = `component "${pid.type}" not found`;
		return div;
	}]
]);

export function createComponent(componentId: ComponentId) : HTMLElement|Promise<HTMLElement> {
	const parsedId = parseComponentId(componentId);
	const f = factories.get(parsedId.type) ?? factories.get('empty');
	return f(parsedId);
}