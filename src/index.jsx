import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans/Vans.jsx'
import VanDetail from './pages/Vans/VanDetail.jsx'
import Layout from './components/Layout.jsx'
import HostLayout from './components/HostLayout.jsx'
import Dashboard from './pages/Host/Dashboard.jsx'
import Income from './pages/Host/Income.jsx'
import Reviews from './pages/Host/Reviews.jsx'
import HostVans from './pages/Host/HostVans.jsx'
import HostVanDetail from './pages/Host/HostVanDetail.jsx'
import HostVanPricing from './pages/Host/HostVanPricing.jsx'
import HostVanPhotos from './pages/Host/HostVanPhotos.jsx'
import HostVanInfo from './pages/Host/HostVanInfo.jsx'
import NotFound from './pages/NotFound.jsx'

import './server.js'

function App() {
	return (
		<BrowserRouter className="app">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans" element={<Vans />} />
					<Route path="vans/:id" element={<VanDetail />} />
					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="vans" element={<HostVans />} />
						<Route path="vans/:id" element={<HostVanDetail />}>
							<Route index element={<HostVanInfo />} />
							<Route
								path="pricing"
								element={<HostVanPricing />}
							/>
							<Route path="photos" element={<HostVanPhotos />} />
						</Route>
						<Route path="reviews" element={<Reviews />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
