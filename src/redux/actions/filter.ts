import {FilterType} from '../types';
import ActionTypes from './actionTypes';

export interface changeFilterAction {
  type: ActionTypes.filter;
  payload: FilterType;
}

export interface invalidateGlobalFilter {
  type: ActionTypes.invalidateFilter;
}

export const changeFilter = (newFilter: FilterType): changeFilterAction => ({
  type: ActionTypes.filter,
  payload: newFilter,
});

export const invalidateFilter = (): invalidateGlobalFilter => ({
  type: ActionTypes.invalidateFilter,
});

export type FilterActions = changeFilterAction | invalidateGlobalFilter;
