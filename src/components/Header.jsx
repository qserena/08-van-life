import { Link, NavLink } from 'react-router-dom'
import avatar from '../assets/avatar-icon.png'

export default function Header() {
	function fakeLogOut() {
		localStorage.removeItem('loggedin')
	}

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
					<Link to="login" className="login-link">
						<img src={avatar} className="login-icon" />
					</Link>
					<button onClick={fakeLogOut}>X</button>
				</nav>
			</div>
		</header>
	)
}
