import { FormAdapter, FormAlert, FormColumn, FormControlProperties, FormControlType, FormValues } from "@omegagrid/form";
import { PRKTLID, Space } from "@prokotol/protocol/dist/types";
import { prktl } from "../container";

export class SpaceFormAdapter extends FormAdapter {

	constructor(id?: PRKTLID) {
		super();
	}

	getColumns(): FormColumn[] {
		return [{width: 100}, {}];
	}

	getControls(id: number|string): FormControlProperties[] {
		const testName = 'test_' + Date.now();
		return [{
			row: 0,
			col: 0,
			type: FormControlType.Label,
			value: 'ID'
		}, {
			key: 'id',
			row: 0,
			col: 1,
			type: FormControlType.TextInput,
			required: true,
			value: testName
		}, {
			row: 1,
			col: 0,
			type: FormControlType.Label,
			value: 'Name'
		}, {
			key: 'name',
			row: 1,
			col: 1,
			type: FormControlType.TextInput,
			required: false,
			value: testName
		}];
	}

	async save(values: Map<string | number, FormValues>): Promise<boolean | FormAlert[]> {
		const data = values.get(0);
		const space: Space = {
			id: data['id'] as string,
			n: data['name'] as string,
		};
		prktl.store.getState().addSpace(space);
		// await this.container.relay.createSpace(space);
		return true;
	}
}