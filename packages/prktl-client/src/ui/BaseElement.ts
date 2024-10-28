import { LitElement, css } from 'lit';
import type { StoreApi } from 'zustand/vanilla';

export class BaseElement<TState = unknown> extends LitElement {

	static styles = [css`
		* {
			box-sizing: border-box;
		}

		:host {
			display: block;
		}	
	`];

	state: TState;

	unsubscribe: () => void;

	subscribe(store: StoreApi<TState>, listener: (state: TState) => void): void {
		this.state = store.getState();
		this.unsubscribe = store.subscribe(listener);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.unsubscribe) this.unsubscribe();
	}

}