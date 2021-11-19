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
		path: '/garage',
	},
	{
		text: 'Vozila',
		icon: <DirectionsCar />,
		path: '/vehicle',
	},
	{
		text: 'Servisne intervencije',
		icon: <CarRepair />,
		path: '/repairs',
	},
	{
		text: 'Troškovi',
		icon: <CreditCard />,
		path: '/expenses',
	},
	{
		text: 'Gorivo',
		icon: <LocalGasStation />,
		path: '/fuel',
	},
	{
		text: 'Kilometraža',
		icon: <Home />,
		path: '/mileage',
	},
	{
		text: 'Vozači',
		icon: <Group />,
		path: '/drivers',
	},
	{
		text: 'Servisi',
		icon: <Build />,
		path: '/services',
	},
];
