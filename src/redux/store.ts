import {
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
  configureStore,
} from '@reduxjs/toolkit';
import { CombinedState } from '@reduxjs/toolkit/query';

import { getCookie } from '../utility/cookies';
import { api } from './api/apiSlice';
import authSlice, { IInitialState, initialState } from './feature/auth/authSlice';
import notificationSlice, {
  INotificationInitialState,
} from './feature/notification/notificationSlice';
import stepSlice, { IStepInitialState } from './feature/step/stepSlice';
import openSlice, { IOpenInitialState } from './feature/open/openSlice';
import filterSlice, { IFilterInitialState } from './feature/filter/filterSlice';

const cookieUser = getCookie('user');
const user = cookieUser ? cookieUser : {};

const preloadedState = {
  auth: {
    ...initialState,
    userInformation: {
      ...initialState.userInformation,
      ...user,
    },
  },
};

const store: EnhancedStore<
  {
    api: CombinedState<Record<string, never>, never, 'api'>;
    auth: IInitialState;
    step: IStepInitialState;
    open: IOpenInitialState;
    notification: INotificationInitialState;
    filter: IFilterInitialState;
  },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          {
            api: CombinedState<Record<string, never>, never, 'api'>;
            auth: IInitialState;
          },
          undefined,
          UnknownAction
        >;
      }>,
      StoreEnhancer,
    ]
  >
> = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    step: stepSlice,
    open: openSlice,
    notification: notificationSlice,
    filter: filterSlice,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
