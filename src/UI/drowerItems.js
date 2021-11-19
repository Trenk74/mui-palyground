import {
	Build,
	CarRepair,
	CreditCard,
	DirectionsCar,
	Group,
	Home,
	LocalGasStation,
} from '@mui/icons-material';

export const drowerItems = [
	{
		text: 'Garaža',
		icon: <Home />,
		path: '/app/garage',
	},
	{
		text: 'Vozila',
		icon: <DirectionsCar />,
		path: '/app/vehicle',
	},
	{
		text: 'Servisne intervencije',
		icon: <CarRepair />,
		path: '/app/repairs',
	},
	{
		text: 'Troškovi',
		icon: <CreditCard />,
		path: '/app/expenses',
	},
	{
		text: 'Gorivo',
		icon: <LocalGasStation />,
		path: '/app/fuel',
	},
	{
		text: 'Kilometraža',
		icon: <Home />,
		path: '/app/mileage',
	},
	{
		text: 'Vozači',
		icon: <Group />,
		path: '/app/drivers',
	},
	{
		text: 'Servisi',
		icon: <Build />,
		path: '/app/services',
	},
];
