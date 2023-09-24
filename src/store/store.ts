/* eslint-disable no-restricted-imports */
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';

import { eventApi } from '~/api/events/api';
import promotionsApi, { PROMOTIONS_API_REDUCER_KEY } from '~/api/promotions/api';
import { jerrySlice } from '~/features/Slices/jerrySlice';

import { RESET_STATE_ACTION_TYPE } from './actions/resetState';

const reducers = {
  [eventApi.reducerPath]: eventApi.reducer,
  [PROMOTIONS_API_REDUCER_KEY]: promotionsApi.reducer,
  jerrySlice: jerrySlice.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<AppState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // eslint-disable-next-line no-param-reassign
    state = {} as AppState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
