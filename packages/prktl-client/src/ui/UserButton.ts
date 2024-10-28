import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";

@customElement("prktl-user")
export class UserButton extends BaseElement {

	static styles = [...BaseElement.styles, css`
		og-button {
			width: 100%;
			height: 100%;
		}
	`];

	render = () => html`
		<og-button icon="user" color="accent"></og-button>
	`;

}