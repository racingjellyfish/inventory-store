import * as Bottle from '../actions/Bottle';
import expect from 'expect';
import Inventory from './Inventory';

describe('Reducer -', () => {

	describe('Inventory -', () => {

		it('should return the initial state', () => {
			expect(Inventory(undefined, {})).toEqual({
				bottles: []
			});
		});

		it('should add a bottle', () => {
			expect(Inventory(undefined, Bottle.addBottle(0))).toEqual({
				bottles: [{
					id: 0
				}]
			});
		});

		it('should remove a bottle', () => {
			expect(Inventory({
			bottles: [{
				id: 0
			},
			{
				id: 1
			}]}, Bottle.removeBottle(0))).toEqual({
				bottles: [{
					id: 1
				}]
			});
		});
	});
});
