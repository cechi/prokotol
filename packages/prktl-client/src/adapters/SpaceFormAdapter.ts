import { FormAdapter, FormAlert, FormColumn, FormControlProperties, FormControlType, FormValues } from "@omegagrid/form";
import { Client } from "../model/Client";

export class SpaceFormAdapter extends FormAdapter {

	constructor(private client: Client) {
		super();
	}

	getColumns(): FormColumn[] {
		return [{width: 100}, {}];
	}

	getControls(id: number|string): FormControlProperties[] {
		return [{
			row: 0,
			col: 0,
			type: FormControlType.Label,
			value: 'Name'
		}, {
			row: 0,
			col: 1,
			type: FormControlType.TextInput,
		}];
	}

	async save(values: Map<string | number, FormValues>): Promise<boolean | FormAlert[]> {
		console.log('save', values);
		return true;
	}
}