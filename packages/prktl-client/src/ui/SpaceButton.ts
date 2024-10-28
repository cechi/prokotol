import { html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseElement } from "./BaseElement";
import { Space } from "@prokotol/protocol/dist/types";

@customElement("prktl-spacebutton")
export class SpaceButton extends BaseElement {

	static styles = [...BaseElement.styles, css`
		:host {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		:host(:hover) {
			background-color: var(--og-accent-color-alpha-15);
			cursor: pointer;
		}

		:host([active]) {
			background-color: var(--og-accent-color-alpha-30);
		}

		#inner {
			width: 80%;
			height: 80%;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--og-accent-color-alpha-15);
		}
	`];

	@property({type: Object})
	space: Space;

	@property({type: Boolean, reflect: true})
	active = false;

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this._onClick);
	}

	_onClick = () => {
		this.active = true;
	}

	get label() { return this.space ? this.space.n?.substring(0, 3) : "" }

	render = () => html`<div id="inner">${this.label}</div>`;

}