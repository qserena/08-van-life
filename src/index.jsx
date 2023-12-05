import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans'
import './server.js'

function App() {
	return (
		<BrowserRouter className="app">
			<nav>
				<div className="container">
					<Link className="logo-text" to="/">
						#VANLIFE
					</Link>
					<Link to="/about">About</Link>
					<Link to="/vans">Vans</Link>
				</div>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/vans" element={<Vans />} />
			</Routes>

			<footer>
				<p>Ⓒ 2023 #VANLIFE</p>
			</footer>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
