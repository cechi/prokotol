import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { BaseElement } from './ui/BaseElement';
import { CommandWindow } from '@omegagrid/commands';
import { Dialog, DialogEvent } from '@omegagrid/dialog';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentFactory, ComponentId } from '@omegagrid/core';
import { createComponent } from './factory';
import { FormContainer } from '@omegagrid/form';


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
			border-right: 1px solid var(--og-border-color);
		}

		prktl-strip {
			width: 30px;
			border-right: 1px solid var(--og-border-color);
		}
			
		prktl-message-container {
			flex: 1;
		}
	`];

	@query('og-commands')
	commands: CommandWindow;

	dialogRef = createRef<Dialog>();
	get dialog() { return this.dialogRef?.value; }

	@state()
	dialogOptions: {
		component: BaseElement;
		title: string;
	}

	createComponent: ComponentFactory<BaseElement> = async (id: ComponentId) => {
		return await createComponent(id) as BaseElement;
	}

	connectedCallback() {
		super.connectedCallback();
		this.tabIndex = 1;
	}

	async openDialog(id: ComponentId) {
		this.dialog.open(document.body, {x: 'center', y: 30});
		const component = await this.createComponent(id);
		this.dialogOptions = {component: component, title: 'Dialog'};
		if (component instanceof FormContainer) 
			component.addEventListener('form.save', () => this.dialog.close(), {once: true});
		this.dialog.component = component;
	}

	_onDialogButtonClick = async (e: DialogEvent) => {
		if (e.button === 'ok') {
			const component = this.dialogOptions?.component;
			if (component) {
				e.preventDefault();
				e.dialog.showLoader();
				if (component instanceof FormContainer) await (component as FormContainer).save(true);
				else e.dialog.close();
				e.dialog.hideLoader();
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


		<prktl-strip></prktl-strip>
		<prktl-sidebar></prktl-sidebar>
		<prktl-message-container></prktl-message-container>
	`;

}