import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getVans } from '../../api.js'

export default function VanDetail() {
	const { id } = useParams()
	const location = useLocation()

	const [van, setVan] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function loadVans() {
			setLoading(true)
			try {
				const data = await getVans(id)
				setVan(data)
			} catch (err) {
				setError(err)
			} finally {
				setLoading(false)
			}
		}
		loadVans()
	}, [id])

	if (loading) {
		return <h2>Loading...</h2>
	}

	if (error) {
		return <h2>There was an error: {error.message}</h2>
	}

	const search = location.state?.search || ''
	const type = location.state?.type || 'all'

	return (
		<div className="van-detail-container">
			<Link to={`..${search}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>

			{van && (
				<>
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
			)}
		</div>
	)
}
