import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'

function App() {
	return (
		<BrowserRouter>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	)
}

function Home() {
	return <h1>Hello, React Router!</h1>
}

function About() {
	return <h1>About page goes here! 🎉</h1>
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
