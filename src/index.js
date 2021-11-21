import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { debounce } from 'debounce';
import App from './App';

import { saveState } from './store/browser-storage';
import { theme } from './components/UI/globalTheme';
import store from './store/store';

store.subscribe(
	debounce(() => {
		saveState(store.getState());
	}, 800)
);

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
