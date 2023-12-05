import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Vans() {
	const [vans, setVans] = useState([])
	useEffect(() => {
		fetch('/api/vans')
			.then((response) => response.json())
			.then((result) => {
				setVans(result.vans)
				console.log(result.vans)
			})
	}, [])

	const vanElements = vans.map((van) => (
		<Link to={`/vans/${van.id}`}>
			<div key={van.id} className="van-tile">
				<img src={van.imageUrl} />
				<div className="van-info">
					<h3>{van.name}</h3>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</div>
		</Link>
	))

	return (
		<div className="van-list-container">
			<h2>Explore our van options</h2>
			<div className="van-list">{vanElements}</div>
		</div>
	)
}
