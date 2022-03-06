import {uniqueId} from 'lodash';
import ActionTypes from 'redux/actions/actionTypes';
import {Section, TodoActions} from '../actions';

// NOTE:
// there i was deciding between 2 approaches, storing `Todos` and `Sections` in 2 separate states and creating a custom hook
// that would later on filter todos for every sections -> that would make todo CRUD much easier.

// current approach is better performance wise, but its surely looks/reads way worse.

const defaultState: Section[] = [];
export const todoReducer = (state = defaultState, action: TodoActions) => {
  switch (action.type) {
    case ActionTypes.addTodo: {
      return state.map((section) => {
        if (section.id === action.payload.sectionId)
          return {...section, items: [...section.items, {...action.payload, id: uniqueId()}]};

        return section;
      });
    }
    case ActionTypes.removeTodo: {
      return state.map((section) => {
        if (section.id === action.payload.sectionId)
          return {...section, items: section.items.filter((todo) => todo.id !== action.payload.id)};

        return section;
      });
    }
    case ActionTypes.toggleTodoStatus: {
      return state.map((section) => {
        if (section.id === action.payload.sectionId)
          return {
            ...section,
            items: section.items.map((todo) => {
              if (todo.id === action.payload.id) return {...todo, isDone: !todo.isDone};

              return todo;
            }),
          };

        return section;
      });
    }
    case ActionTypes.updateTodo: {
      return state.map((section) => {
        if (section.id === action.payload.sectionId)
          return {
            ...section,
            items: section.items.map((todo) => {
              if (todo.id === action.payload.id) return {...todo, ...action.payload};

              return todo;
            }),
          };

        return section;
      });
    }

    default:
      return state;
  }
};
