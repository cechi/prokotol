import { FormAdapter, FormColumn, FormControlProperties } from "@omegagrid/form";

export class SpaceFormAdapter extends FormAdapter {

	getColumns(): FormColumn[] {
		return [{width: 100}, {}];
	}

	getControls(id: number|string): FormControlProperties[] {
		return [{
			row: 0,
			col: 0
		}];
	}
}