import ActionTypes from 'redux/actions/actionTypes';
import {FilterActions} from 'redux/actions/filter';
import {FilterType} from '../types';

type Filter = {valid: boolean; filter: FilterType};
export const filterReducer = (
  state: Filter = {valid: false, filter: 'all'},
  action: FilterActions
) => {
  switch (action.type) {
    case ActionTypes.filter: {
      return {valid: true, filter: action.payload};
    }
    case ActionTypes.invalidateFilter: {
      return {...state, valid: false};
    }
    default:
      return state;
  }
};
