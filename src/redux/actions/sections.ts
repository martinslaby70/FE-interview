import {Section, Todo} from '../types';
import ActionTypes from './actionTypes';

// NOTE: id is usually generated by BE, in this case, we will add it inside TODO reducer
type sectionPayload = Omit<Section, 'id'>;
type TodoPayload = Omit<Todo, 'id'>;

export interface AddTodoAction {
  type: ActionTypes.addTodo;
  payload: TodoPayload;
}
export interface addSectionAction {
  type: ActionTypes.addSection;
  payload: sectionPayload;
}

export interface removeSectionAction {
  type: ActionTypes.removeSection;
  payload: string;
}

type todoId = Pick<Todo, 'id' | 'sectionId'>;

export interface RemoveTodoAction {
  type: ActionTypes.removeTodo;
  payload: todoId;
}

type updateTodoPayload = {id: string} & Partial<TodoPayload>;
export interface updateTodoAction {
  type: ActionTypes.updateTodo;
  payload: updateTodoPayload;
}

type ClearTodosPayload = {onlyDone: boolean};
export interface clearTodosAction {
  type: ActionTypes.clearTodos;
  payload: ClearTodosPayload;
}

export interface toggleTodoStatusAction {
  type: ActionTypes.toggleTodoStatus;
  payload: todoId;
}

export const removeToDos = (id: todoId): RemoveTodoAction => ({
  type: ActionTypes.removeTodo,
  payload: id,
});

export const addTodo = (todo: TodoPayload): AddTodoAction => ({
  type: ActionTypes.addTodo,
  payload: todo,
});
export const updateTodo = (partialTodo: updateTodoPayload): updateTodoAction => ({
  type: ActionTypes.updateTodo,
  payload: partialTodo,
});

export const toggleTodoStatus = (todo: todoId): toggleTodoStatusAction => ({
  type: ActionTypes.toggleTodoStatus,
  payload: todo,
});

export const clearTodos = (todo: ClearTodosPayload): clearTodosAction => ({
  type: ActionTypes.clearTodos,
  payload: todo,
});

export const addSection = (newSection: sectionPayload): addSectionAction => ({
  type: ActionTypes.addSection,
  payload: newSection,
});

export const removeSection = (id: string): removeSectionAction => ({
  type: ActionTypes.removeSection,
  payload: id,
});

export type Actions =
  | AddTodoAction
  | RemoveTodoAction
  | updateTodoAction
  | toggleTodoStatusAction
  | addSectionAction
  | removeSectionAction
  | clearTodosAction;
