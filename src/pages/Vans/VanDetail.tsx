import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { getVan } from '../../api'
import { type Van, type VanParams } from '../../types'

export default function VanDetail() {
    const { id } = useParams<VanParams>()
    const location = useLocation()

    const [van, setVan] = useState<Van | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                if (id) {
                    const data = await getVan(id)
                    setVan(data)
                } else {
                    throw new Error('Van id does not exist')
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }
        loadVan()
    }, [id])

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>There was an error: {error.message}</h2>
    }

    const search = location.state?.search || ''
    const type = location.state?.type || 'all'

    return (
        <div className="van-detail-container">
            <Link to={`..${search}`} relative="path" className="back-button">
                &larr; <span>Back to {type} vans</span>
            </Link>

            {van && (
                <>
                    <div className="van-detail">
                        <img
                            src={van.imageUrl}
                            alt={`Image of Van with name ${van.name}`}
                        />
                        <i className={`van-type ${van.type} selected`}>
                            {van.type}
                        </i>
                        <h2>{van.name}</h2>
                        <p className="van-price">
                            <span>${van.price}</span>/day
                        </p>
                        <p>{van.description}</p>
                    </div>

                    <div className="btn-div">
                        <Link to="" className="big-btn">
                            Rent this van
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
