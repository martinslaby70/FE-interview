import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {todoReducer, userReducer, filterReducer, popoverReducer} from './reducers';

// NOTE: for this small app, it would be much more comfortable to use react useContext hook, or react-recoil -> redux is a bit of overkill

const persistConfig = {
  key: 'persistedReduxState',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userReducer,
    todoReducer,
    filterReducer,
    popoverReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const storePersistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
