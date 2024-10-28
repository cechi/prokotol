export * from './App';
export * from './ui';
export * from '@omegagrid/core';
export * from '@omegagrid/commands';
export * from '@omegagrid/dialog';
export * from '@omegagrid/tree';
import './global';

import { dom, getThemeManager } from '@omegagrid/core';
import { registerIcons } from './icons';
import { prktl } from './container';
import { App } from './App';
import { Relay } from './protocol/Relay';
import { store } from './store';

registerIcons();

const url = new URL(window.location.href);
const PRKTL_API_URL = url.origin + url.pathname + '_prktl';

// themes
prktl.themeManager = getThemeManager();
const theme = prktl.themeManager.themes.get('light');
theme.definition['font-family'] = 'consolas, Arial, Helvetica, sans-serif';
theme.accentColor = '#8000B0';
prktl.themeManager.activate(theme.name);

// mian app component
prktl.app = dom.createElement<App>('prktl-app');

// api client
prktl.relay = new Relay({
	baseUrl: PRKTL_API_URL,
});

dom.empty(document.body);
dom.appendElement(document.body, prktl.app);

prktl.store = store;
prktl.store.getState().fetchSpaces();

// prktl.events.subscribe('space.change', () => {
// 	prktl.store.getState().fetchSpaces();
// });
