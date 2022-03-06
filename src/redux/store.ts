import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {sectionReducer} from './reducers/sectionReducer';
import {todoReducer} from './reducers/todoReducer';

// NOTE: for this small app, it would be much more comfortable to use react useContext hook, or react-recoil -> redux is a bit of overkill

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    todoReducer,
    sectionReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // place for your middleware if you want
});

export const storePersistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
