import ActionTypes from 'redux/actions/actionTypes';
import {FilterActions} from 'redux/actions/filter';
import {FilterType} from '../types';

export const filterReducer = (state: FilterType = 'all', action: FilterActions) => {
  switch (action.type) {
    case ActionTypes.filter: {
      return action.payload;
    }
    default:
      return state;
  }
};
