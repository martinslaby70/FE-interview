import ActionTypes from 'redux/actions/actionTypes';
import {UserActions} from 'redux/actions';
import {User} from '../types';

export const userReducer = (state: User | null = null, action: UserActions) => {
  switch (action.type) {
    case ActionTypes.addUserName: {
      return action.payload;
    }
    default:
      return state;
  }
};
