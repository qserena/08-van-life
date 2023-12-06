import { Link, NavLink } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<div className="container">
				<Link className="logo-text" to="/">
					#VANLIFE
				</Link>
				<nav>
					<NavLink
						to="/host"
						className={({ isActive }) =>
							isActive ? 'active-link' : null
						}
					>
						Host
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) =>
							isActive ? 'active-link' : null
						}
					>
						About
					</NavLink>
					<NavLink
						to="/vans"
						className={({ isActive }) =>
							isActive ? 'active-link' : null
						}
					>
						Vans
					</NavLink>
				</nav>
			</div>
		</header>
	)
}
