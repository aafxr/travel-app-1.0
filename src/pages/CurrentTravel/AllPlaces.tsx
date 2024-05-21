import {useHandleRemoveHotel, useHandleRemovePlace} from "../../hooks/handlers";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import Swipe from "../../components/ui/Swipe/Swipe";
import {Hotel, Place} from "../../core/classes";
import {TrashIcon} from "../../components/svg";

type AllPlacesPropsType = {
    places: Array<Place | Hotel>
}

export function AllPlaces({places}: AllPlacesPropsType) {
    const handleRemovePlace = useHandleRemovePlace()
    const handleRemoveHotel = useHandleRemoveHotel()

    return (
        <>
            <Container className='all-places content'>
                {places.filter(p => p instanceof Place)
                    .map(p => (
                        <Swipe
                            key={p.id}
                            rightElement={
                                <div
                                    className='h-full center'
                                    onClick={() => p instanceof Place ? handleRemovePlace(p) : handleRemoveHotel(p)}
                                >
                                    <TrashIcon className='icon'/>
                                </div>}
                        >
                            <PlaceCard key={p.id} place={p as Place}/>
                        </Swipe>
                    ))
                }
            </Container>
        </>
    )
}