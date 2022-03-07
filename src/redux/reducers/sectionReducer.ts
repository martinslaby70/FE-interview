import {uniqueId} from 'lodash';
import ActionTypes from 'redux/actions/actionTypes';
import {Actions, Section} from '../actions';

// NOTE:
// there i was deciding between 2 approaches, storing `Todos` and `Sections` in 2 separate states and creating a custom hook
// that would later on filter todos for every sections -> that would make todo CRUD much easier.

// current approach is better performance wise, but its surely looks/reads way worse.

export const todoReducer = (state: Section[] = [], action: Actions) => {
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
    case ActionTypes.markAllAsDone: {
      return state.map((section) => {
        if (section.id === action.payload)
          return {
            ...section,
            items: section.items.map((todo) => ({...todo, isDone: true})),
          };

        return section;
      });
    }
    case ActionTypes.clearTodos: {
      if (!action.payload.onlyDone) return [];

      return state.map((section) => ({
        ...section,
        items: section.items.filter((todo) => !todo.isDone),
      }));
    }
    case ActionTypes.addSection: {
      const newSection: Section = {id: uniqueId(), ...action.payload};
      return [...state, newSection];
    }
    case ActionTypes.removeSection: {
      return state.filter((section) => section.id !== action.payload);
    }
    case ActionTypes.updateSection: {
      return state.map((section) => {
        if (section.id === action.payload.id) return {...section, ...action.payload};

        return section;
      });
    }

    default:
      return state;
  }
};
