import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { drowerItems } from './drowerItems';
import { authActions } from '../../store/authSlice';
import {
	garage,
	garageActions,
	garageSelector,
} from './../../store/garageSlice';
import { authSelector } from './../../store/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

function Layout(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { token, authorities } = useSelector(authSelector);
	const { isError, isFetching, isSuccess, errorMessage } =
		useSelector(garageSelector);

	let singleAuth = '';

	authorities.map(roleName => {
		if (roleName.authority === 'ROLE_ADMIN') {
			return (singleAuth = 'ROLE_ADMIN');
		} else {
			return (singleAuth = 'ROLE_DRIVER');
		}
	});

	useEffect(() => {
		const data = {
			token: token,
			authorities: singleAuth,
		};
		dispatch(garage(data));
		dispatch(garageActions.clearState());
		return () => {
			dispatch(garageActions.clearState());
		};
	}, []);

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
		}
		if (isSuccess) {
			dispatch(garageActions.clearState());
			navigate('/app/garage');
		}
		return () => {
			dispatch(garageActions.clearState());
		};
	}, [dispatch, errorMessage, isError, isSuccess, navigate]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const logoutHandler = () => {
		dispatch(authActions.logout());
		localStorage.clear();
		navigate('/');
	};

	const drawer = (
		<div>
			<Toolbar>LogoPlaceHolder</Toolbar>
			<Divider />
			<List>
				{drowerItems.map(item => {
					const active = location.pathname === item.path;
					return (
						<ListItem
							button
							key={item.text}
							onClick={() => navigate(item.path)}
							sx={{ backgroundColor: active ? 'primary.light' : null }}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				color='inherit'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					boxShadow: 1,
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
						Responsive drawer
					</Typography>
					<Button color='inherit' onClick={logoutHandler}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				{isFetching ? <CircularProgress /> : <Outlet />}
			</Box>
		</Box>
	);
}

export default Layout;
