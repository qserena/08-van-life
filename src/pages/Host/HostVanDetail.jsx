import { useState, useEffect } from 'react'
import { useParams, Link, NavLink, Outlet } from 'react-router-dom'

export default function HostVanDetail() {
	const [currentVan, setCurrentVan] = useState(null)
	const params = useParams()

	const activeStyles = {
		fontWeight: 'bold',
		textDecoration: 'underline',
		color: '#161616',
	}

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

			{currentVan && (
				<div className="host-van-detail-layout-container">
					<div className="host-van-detail">
						<img src={currentVan.imageUrl} />
						<div className="host-van-detail-info-text">
							<i
								className={`van-type van-type-${currentVan.type}`}
							>
								{currentVan.type}
							</i>
							<h3>{currentVan.name}</h3>
							<h4>${currentVan.price}/day</h4>
						</div>
					</div>

					<nav className="host-van-detail-nav">
						<NavLink
							to="."
							end
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Details
						</NavLink>
						<NavLink
							to="pricing"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Pricing
						</NavLink>
						<NavLink
							to="photos"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Photos
						</NavLink>
					</nav>
					<Outlet context={{ currentVan }} />
				</div>
			)}
		</section>
	)
}
