export * from './App';
export * from './ui';
export * from '@omegagrid/core';
export * from '@omegagrid/commands';
export * from '@omegagrid/dialog';

import { dom, getThemeManager } from '@omegagrid/core';
import { registerIcons } from './icons';
import { Container } from './model/Container';
import { App } from './App';
import { Relay } from './model/Relay';
import { validate } from '@prokotol/protocol/dist/validators';

registerIcons();

const container = new Container();

const url = new URL(window.location.href);
const PRKTL_API_URL = url.origin + url.pathname + '_prktl';

// themes
container.themeManager = getThemeManager();
const theme = container.themeManager.themes.get('light');
theme.definition['font-family'] = 'consolas, Arial, Helvetica, sans-serif';
theme.accentColor = '#8000B0';
container.themeManager.activate(theme.name);

// mian app component
container.app = dom.createElement<App>('prktl-app');
container.app.container = container;

// api client
container.relay = new Relay({
	baseUrl: PRKTL_API_URL,
});

dom.empty(document.body);
dom.appendElement(document.body, container.app);
