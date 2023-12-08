import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

export default function VanDetail() {
	const params = useParams()
	const location = useLocation()

	const [van, setVan] = useState(null)

	useEffect(() => {
		fetch(`/api/vans/${params.id}`)
			.then((response) => response.json())
			.then((result) => {
				setVan(result.vans)
			})
	}, [params.id])

	const search = location.state?.search || ''
	const type = location.state?.type || 'all'

	return (
		<div className="van-detail-container">
			{van ? (
				<>
					<Link
						to={`..${search}`}
						relative="path"
						className="back-button"
					>
						&larr; <span>Back to {type} vans</span>
					</Link>

					<div className="van-detail">
						<img src={van.imageUrl} />
						<i className={`van-type ${van.type} selected`}>
							{van.type}
						</i>
						<h2>{van.name}</h2>
						<p className="van-price">
							<span>${van.price}</span>/day
						</p>
						<p>{van.description}</p>
					</div>
					<div className="btn-div">
						<Link className="big-btn">Rent this van</Link>
					</div>
				</>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	)
}
