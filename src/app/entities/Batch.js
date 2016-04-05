import { Record } from 'immutable';

const defaultBatch = {
	id: undefined,
	name: undefined
};
export class Batch extends Record(defaultBatch) {
	static create(id, name) {
		// TODO: use invariant and move to super class?
		if (id === undefined) {
			throw new Error('id must be defined');
		}
		// TODO: use invariant and move to super class?
		if (name === undefined) {
			throw new Error('name must be defined');
		}

		return new Batch({
			id: id,
			name: name
		});
	}

	static fromJson(jsonData) {
		return Batch.create(jsonData.id, jsonData.name);
	}
};
