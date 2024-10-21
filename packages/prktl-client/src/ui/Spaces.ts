import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";

@customElement("prktl-spaces")
export class Spaces extends BaseElement {

	static styles = [...BaseElement.styles, css`
	`];

	render = () => html`
		spaces
	`;

}