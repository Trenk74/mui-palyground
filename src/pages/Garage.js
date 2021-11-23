import React, { useEffect, useRef, useState } from 'react';
import {
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { garageActions, garageSelector } from './../store/garageSlice';

function Garage() {
	const { vehicles } = useSelector(garageSelector);
	const dispatch = useDispatch();
	const vehicleRef = useRef(vehicles);
	const [idVehicle, setIdVehicle] = useState(9);

	useEffect(() => {
		dispatch(garageActions.clearState());
		return () => {};
	}, []);

	console.log(idVehicle);

	const selectedVehicleHandler = event => {
		setIdVehicle(event.target.value);
	};

	return (
		<Box>
			<FormControl sx={{ m: 1, minWidth: '96%' }}>
				<InputLabel id='select-vehicle-label'>Odaberi Vozilo</InputLabel>

				<Select
					labelId='select-vehicle-label'
					id='select-vehicle'
					value={idVehicle}
					label='Odaberi Vozilo'
					onChange={selectedVehicleHandler}>
					{vehicleRef.current.map(vehicle => {
						return (
							<MenuItem key={vehicle.idVehicle} value={vehicle.idVehicle}>
								{vehicle.vehicleRegistration +
									' -- ' +
									vehicle.vehicleMaker +
									' ' +
									vehicle.vehicleModel}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<Typography>Garage</Typography>
		</Box>
	);
}

export default Garage;
