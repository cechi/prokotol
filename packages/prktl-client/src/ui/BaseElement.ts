import { LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { Container } from '../model/Container';

export class BaseElement extends LitElement {

	static styles = [css`
		* {
			box-sizing: border-box;
		}

		:host {
			display: block;
		}	
	`];

	@property({type: Object})
	container: Container;

}