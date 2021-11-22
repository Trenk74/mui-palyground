import { configureStore } from '@reduxjs/toolkit';

import { loadState } from './browser-storage';
import authReducer from './authSlice';
import garageReducer from './garageSlice';

const store = configureStore({
	reducer: { auth: authReducer, garage: garageReducer },
	preloadedState: loadState(),
});

export default store;
