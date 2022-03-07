import {FilterType} from '../types';
import ActionTypes from './actionTypes';

export interface changeFilterAction {
  type: ActionTypes.filter;
  payload: FilterType;
}

export const changeFilter = (newFilter: FilterType): changeFilterAction => ({
  type: ActionTypes.filter,
  payload: newFilter,
});

export type FilterActions = changeFilterAction;
