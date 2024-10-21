import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";

@customElement("prktl-sidebar")
export class Sidebar extends BaseElement {

	static styles = [...BaseElement.styles, css`
		:host {
			display: flex;
			flex-direction: column;
			border-right: 1px solid var(--og-border-color);
		}

		prktl-header {
			min-height: 30px;
			flex: 0;
			border-bottom: 1px solid var(--og-border-color);
		}

		prktl-spaces {
			flex: 1;
		}
	`];

	render = () => html`
		<prktl-header></prktl-header>
		<prktl-spaces></prktl-spaces>
	`;

}