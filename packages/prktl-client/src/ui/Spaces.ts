import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";
import { createComponent } from "../factory";
import { prktl } from "../container";

@customElement("prktl-spaces")
export class Spaces extends BaseElement {

	static styles = [...BaseElement.styles, css`
	`];

	connectedCallback() {
		super.connectedCallback();
		prktl.events.addEventListener('spaces.change', this._onSpaceChange);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		prktl.events.removeEventListener('spaces.change', this._onSpaceChange);
	}

	_onSpaceChange = () => {
		this.requestUpdate();
	}

	render = () => html`
		${createComponent('spaceTree')}
	`;

}