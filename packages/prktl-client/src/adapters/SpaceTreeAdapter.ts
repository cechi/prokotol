import { Tree, TreeAdapter, TreeSource } from "@omegagrid/tree";
import { prktl } from "../container";
import { Space } from "@prokotol/protocol/dist/types";

export class SpaceTreeAdapter extends TreeAdapter {

	// attach(component: Tree): void {
		// prktl.store.subscribe('space.change', () => {
		// 	component.refresh();
		// });
	// }

	async getTree() : Promise<TreeSource> {
		const spaces = prktl.store.getState().subSpaces;
		return spaces.map(space => ({k: space.id, v: space.n}));
	}

}