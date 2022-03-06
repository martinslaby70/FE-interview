import ActionTypes from './actionTypes';
import {Section} from './types';

type sectionPayload = Omit<Section, 'id'>;

export interface addSectionAction {
  type: ActionTypes.addSection;
  payload: sectionPayload;
}

export interface removeSectionAction {
  type: ActionTypes.removeSection;
  payload: string;
}

export const addSection = (newSection: sectionPayload): addSectionAction => ({
  type: ActionTypes.addSection,
  payload: newSection,
});

export const removeSection = (id: string): removeSectionAction => ({
  type: ActionTypes.removeSection,
  payload: id,
});

export type SectionTypes = addSectionAction | removeSectionAction;
