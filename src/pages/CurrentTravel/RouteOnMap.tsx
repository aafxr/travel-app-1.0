import {YandexMapContainer, YPlacemark} from "../../components/YandexMap";
import {Hotel, Place} from "../../core/classes";
import {Tab} from "../../components/ui";
import {useTravel} from "../../hooks/redux-hooks";

type RouteOnMapPropsType = {
    places: Array<Place | Hotel>
}

export function RouteOnMap({places}: RouteOnMapPropsType) {
    const {travel} = useTravel()

    return (
        <>
            <div className='route-tabs'>
                <div className='row'>
                    {Array.from({length: travel?.days || 0})
                        .map((_, i) =>
                            <Tab key={i} name={`День ${i + 1}`} to={`/travel/${travel?.id}/${i + 1}/`}/>
                        )
                    }
                </div>
            </div>
            <div className='on-map content' id={'YMapsID'}>
                <YandexMapContainer id={'YMapsID'}>
                    {places.map(p =>
                        <YPlacemark key={p.id} coordinates={p instanceof Place ? p.location : p.position}/>
                    )}
                </YandexMapContainer>
            </div>
        </>
    )

}