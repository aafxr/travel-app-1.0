import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import {HotelCard} from "../../components/HotelCard/HotelCard";
import Container from "../../components/Container/Container";
import {Hotel, Place, Travel} from "../../core/classes";
import Loader from "../../components/Loader/Loader";
import Swipe from "../../components/ui/Swipe/Swipe";
import {TrashIcon} from "../../components/svg";
import {Tab} from "../../components/ui";

type RouteByDayPropsType = {
    travel?: Travel | null,
    places: Array<Place | Hotel>,
    placesLoading: boolean
}


export function RouteByDay({
                        travel,
                        places,
                        placesLoading,
                    }: RouteByDayPropsType) {
    const context = useAppContext()

    async function removePlace(place: Place | Hotel) {
        if (!travel) return
        if (place instanceof Place) {
            travel.places_id = travel.places_id.filter(p => p !== place.id)
            await TravelController.update(context, travel)
                .catch(defaultHandleError)
            await PlaceController.delete(context, place)
                .catch(defaultHandleError)
            context.setTravel(new Travel(travel))
        } else {
            travel.hotels_id = travel.hotels_id.filter(h => h !== place.id)
            await TravelController.update(context, travel)
                .catch(defaultHandleError)
            await HotelController.delete(context, place)
                .catch(defaultHandleError)
            context.setTravel(new Travel(travel))
        }
    }


    return (
        <>
            <div className='route-tabs'>
                {Array.from({length: travel?.days || 0})
                    .map((_, i) =>
                        <Tab key={i} name={`День ${i + 1}`} to={`/travel/${travel?.id}/${i + 1}/`}/>
                    )
                }
            </div>

            <Container className='route-content content '>
                {placesLoading && <div className='center h-full'><Loader/></div>}
                <div className='h-full column gap-1'>
                    {places.map(p =>
                        p instanceof Place
                            ? <Swipe
                                key={p.id}
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => removePlace(p)}/>
                                    </div>
                                }
                            >
                                <PlaceCard key={p.id} className='flex-0' place={p}/>
                            </Swipe>
                            : <Swipe
                                key={p.id}
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => removePlace(p)}/>
                                    </div>
                                }
                            >
                                <HotelCard key={p.id} className='flex-0' hotel={p}/>
                            </Swipe>
                    )}
                </div>
            </Container>
        </>
    )
}
