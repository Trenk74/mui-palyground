import * as React from 'react';
import {
	AppBar,
	Box,
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
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

function Layout(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
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
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
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
					<Typography variant='h6' noWrap component='div'>
						Responsive drawer
					</Typography>
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
				<Outlet />
			</Box>
		</Box>
	);
}

export default Layout;