import React, { useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { authSelector } from './../store/authSlice';

import { garage, garageActions } from './../store/garageSlice';
import { toast } from 'react-toastify';

function Garage() {
	const dispatch = useDispatch();

	const { isFetching, isSuccess, isError, errorMessage, token } =
		useSelector(authSelector);

	useEffect(() => {
		const data = {
			token: token,
			authorities: 'ROLE_ADMIN',
		};
		dispatch(garage(data));
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
			dispatch(garageActions.clearState());
		}
		if (isSuccess) {
			dispatch(garageActions.clearState());
		}
	}, [isError, isSuccess]);

	return (
		<Box>
			<Typography>Garage</Typography>
			{isFetching ? <CircularProgress /> : null}
		</Box>
	);
}

export default Garage;
