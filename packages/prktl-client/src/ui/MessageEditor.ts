import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Message } from '@prokotol/protocol/dist/types';
import { BaseElement } from './BaseElement';

@customElement('prktl-message-editor')
export class MessageEditor extends BaseElement {

	static styles = [...BaseElement.styles, css`
		#editor {
			height: 100%;
			flex: 1;
		}

		textarea {
			width: 100%;
			height: 100%;
		}

		#submit {
			height: 100%;
		}

		#submit og-button {
			height: 100%;
			width: 60px;
		}

		#inner {
			padding: 10px;
			display: flex;
			flex-direction: row;
			height: 60px;
		}
	`];

	@property({type: Object})
	message: Message;

	render = () => html`
		<div id="inner">
			<div id="editor">
				<textarea></textarea>
			</div>
			<div id="submit">
				<og-button icon="paper-plane"></og-button>
			</div>
		</div>
	`;

}