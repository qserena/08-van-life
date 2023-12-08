import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HostVans() {
	const [vans, setVans] = useState([])

	useEffect(() => {
		fetch('/api/host/vans')
			.then((response) => response.json())
			.then((data) => {
				setVans(data.vans)
			})
	}, [])

	const vanElements = vans.map((van) => (
		<Link to={van.id} key={van.id}>
			<div className="host-vans-card">
				<img src={van.imageUrl} alt="photo of van" />
				<div className="host-vans-card-info">
					<h3>{van.name}</h3>
					<p>${van.price}/day</p>
				</div>
			</div>
		</Link>
	))

	return (
		<div className="host-van-list-container">
			<h2>Your listed vans</h2>
			{vans.length > 0 ? (
				<section>{vanElements}</section>
			) : (
				<h3>Loading...</h3>
			)}
		</div>
	)
}
