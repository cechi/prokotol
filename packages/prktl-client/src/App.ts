import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { BaseElement } from './ui/BaseElement';
import { CommandWindow } from '@omegagrid/commands';
import { Container } from './model/Container';
import { Dialog } from '@omegagrid/dialog';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentFactory, ComponentId } from '@omegagrid/core';
import { createComponent } from './factory';


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
			font-family: var(--og-font-family);
			font-size: var(--og-font-size);
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

	@property({type: Object})
	container: Container;

	async createComponent(id: ComponentId) {
		const c = await createComponent(id);
		c.container = this.container;
		return c;
	}

	dialogRef = createRef<Dialog>();
	get dialog() { return this.dialogRef?.value; }

	connectedCallback() {
		super.connectedCallback();
		this.tabIndex = 1;
	}

	async openDialog(id: ComponentId) {
		this.dialog.open(document.body, {x: 'center', y: 30});
		this.dialog.component = await this.createComponent(id);
		return this.dialog;
	}

	render = () => html`
		<og-commands .target="${this}" showSections></og-commands>

		<og-dialog ${ref(this.dialogRef)}
			.buttons="${['ok', 'close']}"
			style="height: 300px"
			closable>
			<div slot="header">Dialog</div>
			<div slot="content">Dialog body</div>
		</og-dialog>

		<prktl-sidebar .container="${this.container}">sidebar</prktl-sidebar>

		<prktl-message-container .container="${this.container}"></prktl-message-container>
	`;

}