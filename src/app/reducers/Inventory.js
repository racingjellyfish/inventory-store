import * as ActionTypes from '../constants/ActionTypes';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

const initialState = {
	bottles: {}
};

function bottles(state = Immutable.Map(initialState.bottles), action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			const newBottle = Immutable.fromJS({
						id: action.payload.bottleId
					});
			return state.set(String(action.payload.bottleId), newBottle);

		case ActionTypes.REMOVE_BOTTLE:
			return state.delete(String(action.payload.bottleId));

		default:
			return state;
	}
};

const Inventory = combineReducers({
	bottles
});

export default Inventory;
