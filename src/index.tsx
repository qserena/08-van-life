import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans/Vans.js'
import VanDetail from './pages/Vans/VanDetail.js'
import Layout from './components/Layout.js'
import HostLayout from './components/HostLayout.js'
import Dashboard from './pages/Host/Dashboard.js'
import Income from './pages/Host/Income.js'
import Reviews from './pages/Host/Reviews.js'
import HostVans from './pages/Host/HostVans.js'
import HostVanDetail from './pages/Host/HostVanDetail.js'
import HostVanPricing from './pages/Host/HostVanPricing.js'
import HostVanPhotos from './pages/Host/HostVanPhotos.js'
import HostVanInfo from './pages/Host/HostVanInfo.js'
import NotFound from './pages/NotFound.js'
import Login from './pages/Login.js'
import AuthRequired from './components/AuthRequired.js'

import './server.js'

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="vans" element={<Vans />} />
                        <Route path="vans/:id" element={<VanDetail />} />
                        <Route path="login" element={<Login />} />

                        <Route element={<AuthRequired />}>
                            <Route path="host" element={<HostLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="income" element={<Income />} />
                                <Route path="vans" element={<HostVans />} />
                                <Route
                                    path="vans/:id"
                                    element={<HostVanDetail />}
                                >
                                    <Route index element={<HostVanInfo />} />
                                    <Route
                                        path="pricing"
                                        element={<HostVanPricing />}
                                    />
                                    <Route
                                        path="photos"
                                        element={<HostVanPhotos />}
                                    />
                                </Route>
                                <Route path="reviews" element={<Reviews />} />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
