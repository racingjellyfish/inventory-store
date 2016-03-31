import { Batch, Bottle } from '../entities/Entities';
import * as BottleActions from '../actions/Bottle';
import expect from 'expect';
import Immutable from 'immutable';
import Inventory from './Inventory';
import * as ServerActions from '../actions/Server';
import { State } from '../entities/State';

describe('Reducer -', () => {
	const initialState = State();

	describe('Inventory -', () => {

		describe('performance -', () => {

			it('map-style access', () => {
				let testMap = Immutable.Map({});
				let count = 0;
				const start = Date.now();
				while (count++ < 1000000) {
					testMap = testMap.set(count, {id: count, value: 'a string'});
				}
				console.log('built map: ' + (Date.now() - start));
				console.log('map entry: ' + testMap.get(777777));
				console.log('got entry: ' + (Date.now() - start));
				console.log('size:   ' + testMap.size);
				testMap = testMap.delete(777777);
				console.log('size:   ' + testMap.size);
				console.log('deleted:   ' + (Date.now() - start));
			});

			it('list-style access', () => {
				let testList = Immutable.List([]);
				let count = 0;
				const start = Date.now();
				while (count++ < 1000000) {
					testList = testList.push({id: count, value: 'a string'});
				}
				console.log('built list: ' + (Date.now() - start));
				console.log('list entry: ' + testList.filter((item) => item.id == 777777));
				console.log('got entry: ' + (Date.now() - start));
				console.log('size:   ' + testList.size);
				testList = testList.filter((item) => item.id != 777777);
				console.log('size:   ' + testList.size);
				console.log('deleted:   ' + (Date.now() - start));
			});
		});

		describe('generic -', () => {

			it('should return the initial state', () => {
				checkEquality(Inventory(undefined, {}), initialState);
			});
		});

		describe('bottles -', () => {

			it('should add a bottle', () => {
				const expectedState = State([], [Bottle(0)]);

				const updatedState = Inventory(initialState, BottleActions.addBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should remove a bottle', () => {
				const state = State([], [Bottle(0), Bottle(1)]);
				const expectedState = State([], [Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.removeBottle(0));

				checkEquality(updatedState, expectedState);
			});

			it('should fill a bottle', () => {
				const state = State([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);
				const expectedState = State([Batch(0, 'batch-0')], [Bottle(0, 0), Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.fill(0, 0));

				checkEquality(updatedState, expectedState);
			});

			it('should empty a bottle', () => {
				const state = State([Batch(0, 'batch-0')], [Bottle(0, 0), Bottle(1)]);
				const expectedState = State([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);

				const updatedState = Inventory(state, BottleActions.drink(0));

				checkEquality(updatedState, expectedState);
			});
		});

		describe('server -', () => {

			it('should merge data', () => {
				const state = State();
				const expectedState = State([Batch(0, 'batch-0')], [Bottle(0), Bottle(1)]);
				const jsonData = JSON.stringify({
					batches: [
						{id: 0, name: 'batch-0'}
					],
					bottles: [
						{id: 0},
						{id: 1}
					]
				});

				const updatedState = Inventory(state, ServerActions.receiveData(jsonData));

				checkEquality(updatedState, expectedState);
			});
		});

		it('requesting data should set isFetching flag to true', () => {
			const state = State();
			const expectedState = State([], [], true);

			const updatedState = Inventory(state, ServerActions.requestData());

			checkEquality(updatedState, expectedState);
		});
	});
});

function checkEquality(actual, expected) {
	if (!Immutable.is(actual, expected)) {
		throw new Error('Expected:\t' + actual + '\n\tto be:\t\t' + expected);
	}
};
