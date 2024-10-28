import { createSpaceSlice, SpaceState } from './spaceSlice';
import { createStore } from 'zustand/vanilla';

export { SpaceState };

export const store = createStore<SpaceState>((...a) => ({
	...createSpaceSlice(...a)
}));


// const { getState, setState, subscribe, getInitialState } = store

// export default store


// export function useSpaceStore(): SpaceState
// export function useSpaceStore<T>(selector: (state: SpaceState) => T): T
// export function useSpaceStore<T>(selector?: (state: SpaceState) => T) {
// 	return useStore(spaceStore, selector!)
// }

/*
type ExtractState<S> = S extends { getState: () => infer X } ? X : never
const createBoundedUseStore = (
	(store) => (selector) => useStore(store, selector)
) as <S extends StoreApi<unknown>>(store: S) => {
	(): ExtractState<S>
	<T>(selector: (state: ExtractState<S>) => T): T
}

const useSpaceStore = createBoundedUseStore(store);
*/
