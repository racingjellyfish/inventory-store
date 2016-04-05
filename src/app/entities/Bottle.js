import * as BottleProps from '../constants/BottleProps';
import { Record } from 'immutable';

const defaultType = BottleProps.GLASS;
const defaultVolume = 500;
const defaultBottle = {
	id: undefined,
	status: BottleProps.DEFAULT_STATUS,
	type: defaultType,
	volume: defaultVolume
};

export class Bottle extends Record(defaultBottle) {
	static create(id, status, type, volume) {
		// TODO: use invariant?
		if (id === undefined) {
			throw new Error('id must be defined');
		}

		return new Bottle({
			id: id,
			status: status || BottleProps.DEFAULT_STATUS,
			type: type || defaultType,
			volume: volume || defaultVolume
		});
	}

	static fromJson(jsonData) {
		return Bottle.create(jsonData.id, jsonData.status, jsonData.type, jsonData.volume);
	}
};
