import {PlaceControls} from "../../components/card-controls/PlaceControls/PlaceControls";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import Swipe from "../../components/ui/Swipe/Swipe";
import {Hotel, Place} from "../../core/classes";

type AllPlacesPropsType = {
    places: Array<Place | Hotel>
}

export function AllPlaces({places}: AllPlacesPropsType) {

    return (
        <>
            <Container className='all-places content'>
                {places.filter(p => p instanceof Place)
                    .map(p => (
                        <Swipe
                            key={p.id}
                            rightElement={<PlaceControls place={p}/>}
                        >
                            <PlaceCard key={p.id} place={p as Place}/>
                        </Swipe>
                    ))
                }
            </Container>
        </>
    )
}