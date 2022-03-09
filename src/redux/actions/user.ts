import {User} from '../types';
import ActionTypes from './actionTypes';

export interface addUserNameAction {
  type: ActionTypes.addUserName;
  payload: User;
}

export const setUser = (newName: User): addUserNameAction => ({
  type: ActionTypes.addUserName,
  payload: newName,
});

export type UserActions = addUserNameAction;
