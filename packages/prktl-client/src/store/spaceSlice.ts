import { Space } from '@prokotol/protocol/src/types';
import { StateCreator } from 'zustand';
import { prktl } from '../container';

export interface SpaceState {
	spaces: Space[];
	activeSpace: Space;
	subSpaces: Space[];
	fetchSpaces: () => void;
	setActiveSpace: (space: Space) => void;
	fetchSubSpaces: (space: Space) => void;
	addSpace: (space: Space) => void;
}

export const createSpaceSlice: StateCreator<SpaceState> = (set, get) => ({
	spaces: [],
	activeSpace: null,
	subSpaces: [],
	addSpace: async(space: Space) => {
		await prktl.relay.createSpace(space);
		get().fetchSpaces();
	},
	fetchSpaces: async() => {
		set({spaces: await prktl.relay.getSpaces({filter: {sid: null}})});
	},
	setActiveSpace: async(space: Space) => {
		set({activeSpace: space});
		get().fetchSubSpaces(space);
	},
	fetchSubSpaces: async(space: Space) => {
		set({subSpaces: await prktl.relay.getSpaces({filter: {sid: space.id}})});
	}
});
