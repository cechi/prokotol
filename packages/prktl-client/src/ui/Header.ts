import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";

@customElement("prktl-header")
export class Header extends BaseElement {

	static styles = [...BaseElement.styles, css`
	`];

	render = () => html`
		header
	`;

}