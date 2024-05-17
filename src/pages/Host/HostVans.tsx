import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHostVans } from '../../api'
import { type Van } from '../../types'

export default function HostVans() {
    const [vans, setVans] = useState<Van[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const vanElements = vans.map((van) => (
        <Link to={van.id} key={van.id}>
            <div className="host-vans-card">
                <img src={van.imageUrl} alt="photo of van" />
                <div className="host-vans-card-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>There was an error: {error.message}</h2>
    }

    return (
        <div className="host-van-list-container">
            <h2>Your listed vans</h2>
            {vans.length > 0 ? (
                <section>{vanElements}</section>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    )
}
