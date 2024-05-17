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
                            isActive ? 'active-link' : undefined
                        }
                    >
                        Host
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? 'active-link' : undefined
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/vans"
                        className={({ isActive }) =>
                            isActive ? 'active-link' : undefined
                        }
                    >
                        Vans
                    </NavLink>
                    <Link to="login" className="login-link">
                        <img
                            src={avatar}
                            className="login-icon"
                            alt="login icon"
                        />
                    </Link>
                    <button onClick={fakeLogOut}>X</button>
                </nav>
            </div>
        </header>
    )
}
