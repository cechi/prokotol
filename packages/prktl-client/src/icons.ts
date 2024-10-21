import { library, config, IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPaperPlane as faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';

const faIcons: IconDefinition[] = [
	faPlay,
	faPaperPlane
];

export const registerIcons = () => {
	config.styleDefault = 'fas';
	library.add(...faIcons);
}
