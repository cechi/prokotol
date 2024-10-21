export * from './App';
export * from './ui';
export * from '@omegagrid/core';
export * from '@omegagrid/commands';

import { getThemeManager } from '@omegagrid/core';
import { registerIcons } from './icons';
registerIcons();

const tm = getThemeManager();
const theme = tm.themes.get('light');
theme.definition['font-family'] = 'consolas, Arial, Helvetica, sans-serif';
theme.accentColor = '#8000B0';
tm.activate(theme.name);

document.body.innerHTML = '<prktl-app></prktl-app>';