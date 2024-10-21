import { CSSResultGroup, LitElement, css } from 'lit';

export class BaseElement extends LitElement {

	static styles = [css`
		* {
			box-sizing: border-box;
		}

		:host {
			display: block;
		}	
	`];

}