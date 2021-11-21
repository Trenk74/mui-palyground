import { configureStore } from '@reduxjs/toolkit';

import { loadState } from './browser-storage';
import authReducer from './authSlice';

const store = configureStore({
	reducer: { auth: authReducer },
	preloadedState: loadState(),
});

export default store;
