import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'
import { type Van } from '../../types'

export default function Vans() {
    const [vans, setVans] = useState<Van[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get('type')

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        loadVans()
    }, [])

    const displayedVans = typeFilter
        ? vans.filter((van) => van.type === typeFilter)
        : vans

    const vanElements = displayedVans.map((van) => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter,
                }}
                aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
            >
                <img
                    src={van.imageUrl}
                    alt={`Image of van with name ${van.name}`}
                />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key: string, value: string) {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>There was an error: {error.message}</h2>
    }

    return (
        <div className="van-list-container">
            <h2>Explore our van options</h2>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange('type', 'simple')}
                    className={`van-type simple ${
                        typeFilter === 'simple' ? 'selected' : ''
                    }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'luxury')}
                    className={`van-type luxury ${
                        typeFilter === 'luxury' ? 'selected' : ''
                    }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'rugged')}
                    className={`van-type rugged ${
                        typeFilter === 'rugged' ? 'selected' : ''
                    }`}
                >
                    Rugged
                </button>

                {typeFilter && (
                    <button
                        onClick={() => setSearchParams({})}
                        className="van-type clear-filters"
                    >
                        Clear filter
                    </button>
                )}
            </div>
            <div className="van-list">{vanElements}</div>
        </div>
    )
}
