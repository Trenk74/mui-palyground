import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi } from '../api/myCarApi';

const initState = {
	email: '',
	token: '',
	firstName: '',
	expiresIn: '',
	isFetching: false,
	isSuccess: false,
	isError: false,
	isLoggedIn: false,
	errorMessage: '',
};

export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password, returnSecureToken }, thunkAPI) => {
		try {
			const response = await fetch(loginApi, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
					returnSecureToken,
				}),
			});
			let data = await response.json();
			console.log(response);
			console.log('response:', data);
			console.log(data.accessToken);
			if (response.status === 200) {
				localStorage.setItem('token', data.accessToken);
				let dateTime = (Date.now() + 3600000).toString();
				console.log(dateTime);
				localStorage.setItem('tokenExpiration', dateTime);
				sessionStorage.setItem('isLoggedIn', true);
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log('Error:', e.response.data);
			thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: initState,
	reducers: {
		clearState: (state, action) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = null;
			return state;
		},
		logout: state => {
			return initState;
		},
		lg: state => {
			state.isLoggedIn = false;
			return state;
		},
	},

	extraReducers: {
		[login.fulfilled]: (state, { payload }) => {
			state.email = payload.username;
			state.token = payload.accessToken;
			state.firstName = payload.firstName;
			state.expiresIn = payload.exparation;
			state.isFetching = false;
			state.isSuccess = true;
			state.isLoggedIn = true;
			state.errorMessage = null;
		},
		[login.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.isLoggedIn = false;
			state.errorMessage = payload.message;
		},
		[login.pending]: state => {
			state.isFetching = true;
		},
	},
});

export const authActions = authSlice.actions;
export const authSelector = state => state.auth;
export default authSlice.reducer;
