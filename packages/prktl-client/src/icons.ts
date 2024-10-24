import { library, config, IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

const faIcons: IconDefinition[] = [
	faPlay,
	faPaperPlane,
	faLayerGroup,
	faPlus,
	faSpinner
];

export const registerIcons = () => {
	config.styleDefault = 'fas';
	library.add(...faIcons);
}
