import {useHandleRemoveHotel, useHandleRemovePlace} from "../../hooks/handlers";
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
    const handleRemovePlace = useHandleRemovePlace()
    const handleRemoveHotel = useHandleRemoveHotel()


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

            <Container className='route-content content '>
                {placesLoading && <div className='center h-full'><Loader/></div>}
                <div className='h-full column gap-1'>
                    {places.map(p =>
                        p instanceof Place
                            ? <Swipe
                                key={p.id}
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => handleRemovePlace(p)}/>
                                    </div>
                                }
                            >
                                <PlaceCard key={p.id} className='flex-0' place={p}/>
                            </Swipe>
                            : <Swipe
                                key={p.id}
                                rightElement={
                                    <div className='h-full center'>
                                        <TrashIcon className='icon' onClick={() => handleRemoveHotel(p)}/>
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
