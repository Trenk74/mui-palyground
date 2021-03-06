import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCompany, getAllDriver } from '../api/myCarApi';

const initState = {
	vehicles: [],
	isError: false,
	isSuccess: false,
	isFetching: false,
	errorMessage: null,
};

export const garage = createAsyncThunk(
	'garage/getAll',
	async ({ token, authorities }, thunkAPI) => {
		console.log('fatch vozila');
		let url = getAllCompany;
		if (authorities === 'ROLE_ADMIN') {
			url = getAllCompany;
		} else if (authorities === 'ROLE_DRIVER') {
			url = getAllDriver;
		}
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			let data = await response.json();
			if (response.status === 200) {
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const garageSlice = createSlice({
	name: 'garage',
	initialState: initState,
	reducers: {
		clearState: state => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = null;
			return state;
		},
	},

	extraReducers: {
		[garage.fulfilled]: (state, { payload }) => {
			state.vehicles = payload;
			state.isError = false;
			state.isFetching = false;
			state.isSuccess = true;
			state.errorMessage = null;
		},
		[garage.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.isSuccess = false;
			state.errorMessage = payload.message;
		},
		[garage.pending]: state => {
			state.isFetching = true;
			state.isError = false;
			state.isSuccess = false;
		},
	},
});

export const garageActions = garageSlice.actions;
export const garageSelector = state => state.garage;
export default garageSlice.reducer;
