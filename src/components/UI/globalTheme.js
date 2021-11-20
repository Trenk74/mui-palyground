import { createTheme } from '@mui/material';

export const theme = createTheme({
	components: {
		MuiAvatar: {
			styleOverrides: {
				root: {
					height: '50px',
					width: '50px',
				},
			},
		},
	},

	palette: {
		mode: 'light',
	},
});
