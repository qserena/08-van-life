import { useState, useEffect } from 'react'

export default function HostVans() {
	const [vans, setVans] = useState([])

	useEffect(() => {
		fetch('/api/host/vans')
			.then((response) => response.json())
			.then((data) => setVans(data.vans))
	}, [])

	const vanElements = vans.map((van) => (
		<div className="host-vans-card">
			<img src={van.imageUrl} alt="photo of van" />
			<div className="host-vans-card-info">
				<h3>{van.name}</h3>
				<p>
					${van.price}
					<span>/day</span>
				</p>
			</div>
		</div>
	))

	return (
		<div className="host-van-list-container">
			<h2>Your listed vans</h2>
			{vanElements}
		</div>
	)
}
