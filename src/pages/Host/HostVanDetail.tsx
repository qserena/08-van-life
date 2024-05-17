import { useState, useEffect } from 'react'
import {
    useParams,
    Link,
    NavLink,
    Outlet,
    useOutletContext,
} from 'react-router-dom'
import { getVan } from '../../api'
import type { Van } from '../../types'

export type ContextType = { currentVan: Van | null }

export default function HostVanDetail() {
    const [currentVan, setCurrentVan] = useState<Van | null>(null)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616',
    }

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                if (id) {
                    const data = await getVan(id)
                    setCurrentVan(data)
                } else {
                    throw new Error('Van id does not exist')
                }
            } catch (err) {
                setError(err as Error)
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
    return (
        <section>
            <Link to=".." relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>

            {currentVan && (
                <div className="host-van-detail-layout-container">
                    <div className="host-van-detail">
                        <img src={currentVan.imageUrl} alt="Image of a van" />
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
                                isActive ? activeStyles : undefined
                            }
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={{ currentVan } satisfies ContextType} />
                </div>
            )}
        </section>
    )
}

export function useCurrentVan(): ContextType {
    return useOutletContext<ContextType>()
}
