import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { garageActions, garageSelector } from './../store/garageSlice';

function Garage() {
	const dispatch = useDispatch();
	const { vehicles } = useSelector(garageSelector);

	useEffect(() => {
		dispatch(garageActions.clearState());
		return () => {};
	}, []);

	vehicles.forEach(function (vehicle) {
		console.log(vehicle);
	});

	return (
		<Box>
			<Typography>Garage</Typography>
			{vehicles.map(vehicle => (
				<Box key={vehicle.idVehicle}>
					<Typography>{vehicle.idVehicle}</Typography>
					<Typography>{vehicle.vehicleRegistration}</Typography>
					<Typography>{vehicle.Model}</Typography>
					<Typography>{vehicle.Maker}</Typography>
					<Typography>{vehicle.vehicleVIN}</Typography>
				</Box>
			))}
		</Box>
	);
}

export default Garage;
