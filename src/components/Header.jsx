import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<nav>
				<div className="container">
					<Link className="logo-text" to="/">
						#VANLIFE
					</Link>
					<Link to="/host">Host</Link>
					<Link to="/about">About</Link>
					<Link to="/vans">Vans</Link>
				</div>
			</nav>
		</header>
	)
}
