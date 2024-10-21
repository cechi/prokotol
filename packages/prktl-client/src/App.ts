import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { BaseElement } from './ui/BaseElement';
import { CommandWindow } from '@omegagrid/commands';

@customElement('prktl-app')
export class App extends BaseElement {

	static styles = [...BaseElement.styles, css`
		:host {
			width: 100%;
			height: 100%;
			max-width: 1200px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			border: 1px solid var(--og-border-color);
			border-width: 0 1px;
		}

		prktl-sidebar {
			width: 20%;
			background-color: #f0f0f0;
		}

		prktl-message-container {
			flex: 1;
		}
	`];

	@query('og-commands')
	commands: CommandWindow;

	connectedCallback() {
		super.connectedCallback();
		this.tabIndex = 1;
	}

	render = () => html`
		<og-commands .target="${this}" showSections></og-commands>

		<prktl-sidebar>sidebar</prktl-sidebar>
		<prktl-message-container></prktl-message-container>
	`;

}