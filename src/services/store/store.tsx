// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/user/userSlice';

import { searchApi } from '../api';
import api from '@/services/AuthApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
        [searchApi.reducerPath]: searchApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, searchApi.middleware),
});

// Типизация корневого состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
