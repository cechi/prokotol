import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { BaseElement } from './ui/BaseElement';
import { CommandWindow } from '@omegagrid/commands';
import { Container } from './model/Container';
import { Dialog, DialogEvent } from '@omegagrid/dialog';
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

	dialogRef = createRef<Dialog>();
	get dialog() { return this.dialogRef?.value; }

	@state()
	dialogOptions: {
		component: BaseElement;
		title: string;
	}

	createComponent: ComponentFactory<BaseElement> = async (id: ComponentId) => {
		const c = await createComponent(id, this.container) as BaseElement;
		c.container = this.container;
		return c;
	}

	connectedCallback() {
		super.connectedCallback();
		this.tabIndex = 1;
	}

	async openDialog(id: ComponentId) {
		this.dialog.open(document.body, {x: 'center', y: 30});
		this.dialogOptions = {
			component: await this.createComponent(id),
			title: 'Dialog 123'
		};
		this.dialog.component = this.dialogOptions.component;
	}

	_onDialogButtonClick = async (e: DialogEvent) => {
		if (e.button === 'ok') {
			if (this.dialogOptions.component) {
				e.preventDefault();
				e.dialog.showLoader();
				await new Promise(resolve => setTimeout(resolve, 2000));
				(this.dialogOptions.component as any).save(true);
				e.dialog.hideLoader();
				e.dialog.close();
			}
		}
	}

	_onDialogClose = () => {
		this.dialog.component = null;
		this.dialogOptions = null;
	}

	render = () => html`
		<og-commands .target="${this}" showSections></og-commands>

		<og-dialog ${ref(this.dialogRef)}
			.buttons="${['ok', 'close']}"
			style="height: 300px"
			@dialog.click="${this._onDialogButtonClick}"
			@dialog.close="${this._onDialogClose}"
			closable>
			<div slot="header">${this.dialogOptions?.title}</div>
			<div slot="content">Dialog body</div>
		</og-dialog>

		<prktl-sidebar .container="${this.container}">sidebar</prktl-sidebar>

		<prktl-message-container .container="${this.container}"></prktl-message-container>
	`;

}