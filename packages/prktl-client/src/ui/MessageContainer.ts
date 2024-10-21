import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './BaseElement';

@customElement('prktl-message-container')
export class MessageContainer extends BaseElement {

	static styles = [...BaseElement.styles, css`
		:host {
			display: flex;
			flex-direction: column;
		}

		prktl-message-stream {
			flex: 1;
		}

		prktl-message-editor {
			flex: 0;
		}
	`];

	render = () => html`
		<prktl-message-stream></prktl-message-stream>
		<prktl-message-editor></prktl-message-editor>
	`;


}