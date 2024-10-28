import { prktl } from './container';

declare global {
	interface Window {
		prktl: typeof prktl;
	}
}

window.prktl = prktl;