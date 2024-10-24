import { css, html } from "lit";
import { BaseElement } from "./BaseElement";
import { customElement } from "lit/decorators.js";
import { msg } from "@omegagrid/localize";

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

		og-panel {
			border: none;
		}

		prktl-spaces {
			flex: 1;
		}
	`];

	render = () => html`
		<prktl-header></prktl-header>

		<og-panel icon="layer-group">
			<div slot="header" style="display: flex; flex-direction: row">
				<div style="flex: 1">${msg('Spaces')}</div>
				<div>
					<og-button
						icon="plus"
						color="transparent"
						style="height: 10px"
						@click="${() => this.container.app.openDialog('spaceForm')}">
					</og-button>
				</div>
			</div>
			<div slot="body">
				<prktl-spaces></prktl-spaces>
			</div>
		</og-panel>
	`;

}