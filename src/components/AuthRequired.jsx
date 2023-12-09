import { Navigate, Outlet } from 'react-router-dom'

export default function AuthRequired() {
	const authenticated = true

	if (!authenticated) {
		return (
			<Navigate
				to="/login"
				state={{ message: 'You must log in first' }}
			/>
		)
	}

	return <Outlet />
}
