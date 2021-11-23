import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { garageActions, garageSelector } from './../store/garageSlice';

function Garage() {
	const dispatch = useDispatch();
	const { vehicles } = useSelector(garageSelector);

	console.log('Garage vehicles: ', vehicles);

	useEffect(() => {
		dispatch(garageActions.clearState());
		return () => {};
	}, []);

	return (
		<Box>
			<Typography>Garage</Typography>
		</Box>
	);
}

export default Garage;
