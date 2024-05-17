import { useCurrentVan } from './HostVanDetail'

export default function HostVanPricing() {
    const { currentVan } = useCurrentVan()
    return (
        <h3 className="host-van-price">
            ${currentVan?.price}
            <span>/day</span>
        </h3>
    )
}
