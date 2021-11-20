import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { theme } from './components/UI/globalTheme';
import store from './store/store';

import { ToastContainer } from 'react-toastify';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
					<ToastContainer />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
