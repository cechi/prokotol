import { FormAdapter, FormAlert, FormColumn, FormControlProperties, FormControlType, FormValues } from "@omegagrid/form";
import { Relay } from "../model/Relay";

export class SpaceFormAdapter extends FormAdapter {

	constructor(private relay: Relay, private spaceId?: string) {
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
			required: true,
		}];
	}

	async save(values: Map<string | number, FormValues>): Promise<boolean | FormAlert[]> {
		//await this.relay.createSpace();
		console.log('save', values);
		return true;
	}
}