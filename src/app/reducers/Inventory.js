import { combineReducers } from 'redux';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	bottles: []
};

function bottles(state = initialState.bottles, action) {
	switch (action.type) {
		case ActionTypes.ADD_BOTTLE:
			return [
					...state,
					{
						id: action.payload.bottleId
					}
				];
		case ActionTypes.REMOVE_BOTTLE:
			return state.filter((bottle) => {
					return bottle.id !== action.payload.bottleId;
				});
		default:
			return state;
	}
};

const Inventory = combineReducers({
	bottles
});

export default Inventory;
