import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function HostVanDetail() {
	const [currentVan, setCurrentVan] = useState(null)
	const params = useParams()
	console.log(params.id)

	useEffect(() => {
		fetch(`/api/host/vans/${params.id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.vans)
				setCurrentVan(data.vans)
			})
	}, [])

	if (!currentVan) {
		return <h3>Loading...</h3>
	}

	return (
		<section>
			<Link to=".." relative="path" className="back-button">
				&larr; <span>Back to all vans</span>
			</Link>

			<div className="host-van-detail-layout-container">
				<div className="host-van-detail">
					<img src={currentVan.imageUrl} />
					<div className="host-van-detail-info-text">
						<i className={`van-type van-type-${currentVan.type}`}>
							{currentVan.type}
						</i>
						<h3>{currentVan.name}</h3>
						<h4>${currentVan.price}/day</h4>
					</div>
				</div>
			</div>
		</section>
	)
}
