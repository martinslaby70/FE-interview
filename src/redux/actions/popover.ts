import ActionTypes from './actionTypes';

export type PopoverActionType = {todoId: string; popoverHeight: number; sectionId: string};

export interface openPopoverAction {
  type: ActionTypes.openPopover;
  payload: PopoverActionType;
}

export interface closePopoverAction {
  type: ActionTypes.closePopover;
}

export const openPopover = (popOverProps: PopoverActionType): openPopoverAction => ({
  type: ActionTypes.openPopover,
  payload: popOverProps,
});

export const closePopover = (): closePopoverAction => ({
  type: ActionTypes.closePopover,
});

export type PopoverActions = openPopoverAction | closePopoverAction;
