import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Message } from '@prokotol/protocol/dist/types';

@customElement('prktl-message-stream')
export class MessageStream extends LitElement {

	@property({type: Object})
	message: Message;

	render = () => html``;

}