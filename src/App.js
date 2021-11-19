import { Routes, Route } from 'react-router-dom';
import Layout from './UI/Layout';
import Garage from './pages/Garage';
import Vehicle from './pages/Vehicle';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='garage' element={<Garage />} />
				<Route path='vehicle' element={<Vehicle />} />
			</Routes>
		</Layout>
	);
}

export default App;
