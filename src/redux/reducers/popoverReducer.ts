import {PopoverActions, PopoverActionType} from 'redux/actions';
import ActionTypes from 'redux/actions/actionTypes';

export const popoverReducer = (state: PopoverActionType | null = null, action: PopoverActions) => {
  switch (action.type) {
    case ActionTypes.openPopover: {
      return action.payload;
    }
    case ActionTypes.closePopover: {
      return null;
    }
    default:
      return state;
  }
};
