import { EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction, configureStore } from "@reduxjs/toolkit"
import { CombinedState } from "@reduxjs/toolkit/query"

import { api } from "./api/apiSlice"
import authSlice, { IInitialState } from "./feature/auth/authSlice"
import notificationSlice, { INotificationInitialState } from "./feature/notification/notificationSlice"
import stepSlice, { IStepInitialState } from "./feature/step/stepSlice"



const store: EnhancedStore<
  {
    api: CombinedState<{}, never, 'api'>
    auth: IInitialState
    step: IStepInitialState
    notification: INotificationInitialState
  },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          {
            api: CombinedState<{}, never, 'api'>
            auth: IInitialState

          },
          undefined,
          UnknownAction
        >
      }>,
      StoreEnhancer,
    ]
  >
> = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    step: stepSlice,
    notification: notificationSlice
  },
  preloadedState: {
    // auth: initialState,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
