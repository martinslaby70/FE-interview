import {uniqueId} from 'lodash';
import ActionTypes from 'redux/actions/actionTypes';
import {Section, SectionTypes} from '../actions';

const defaultState: Section[] = [];
export const sectionReducer = (state = defaultState, action: SectionTypes) => {
  switch (action.type) {
    case ActionTypes.addSection: {
      const newSection: Section = {id: uniqueId(), ...action.payload};
      return {...state, newSection};
    }
    case ActionTypes.removeSection: {
      return state.filter((section) => section.id !== action.payload);
    }

    default:
      return state;
  }
};
