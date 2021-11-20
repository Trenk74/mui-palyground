import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/UI/Layout';
import Garage from './pages/Garage';
import Vehicle from './pages/Vehicle';
import SignIn from './pages/SignIn';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate replace to='/login' />} />
			<Route path='/login' element={<SignIn />} />
			<Route path='app' element={<Layout />}>
				<Route path='garage' element={<Garage />} />
				<Route path='vehicle' element={<Vehicle />} />
				<Route path='repairs' element={<Garage />} />
				<Route path='expenses' element={<Vehicle />} />
				<Route path='fuel' element={<Garage />} />
				<Route path='mileage' element={<Vehicle />} />
				<Route path='drivers' element={<Garage />} />
				<Route path='services' element={<Vehicle />} />
			</Route>
		</Routes>
	);
}

export default App;
