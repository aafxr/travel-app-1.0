import {Hotel, Place} from "../../core/classes";
import Container from "../../components/Container/Container";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import Swipe from "../../components/ui/Swipe/Swipe";
import {TrashIcon} from "../../components/svg";

type AllPlacesPropsType = {
    places: Array<Place | Hotel>
}

export function AllPlaces({places}: AllPlacesPropsType){
    return (
        <>
            <Container className='all-places content'>
                {places.filter(p => p instanceof Place)
                    .map(p => (
                        <Swipe rightElement={<div className='h-full center'><TrashIcon className='icon'/></div>}>
                            <PlaceCard key={p.id} place={p as Place} />
                        </Swipe>
                    ))
                }
            </Container>
        </>
    )
}