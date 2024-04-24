import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";
import {Hotel, Place} from "../../core/classes";

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()

    const [items, setItems ] = useState<Array<Place | Hotel>>([])


    useEffect(() => {
        if (!travelCode) {
            navigate('/')
            return
        }

        TravelController.read(context, travelCode)
            .then(t => t && context.setTravel(t))
            .catch(defaultHandleError)
    }, [])


    useEffect(() => {
        async function loadItems(){
            if(!travel) return

            const hotels = await HotelController.readAll(context, ...travel.hotels_id)
            const places = await PlaceController.readAll(context, ...travel.places_id)
            setItems([...hotels, ...places])
        }

        loadItems().catch(defaultHandleError)
    }, [travel])

    console.log(items)
    console.log(travel)


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack to={'/'} title={'Current Travel'}/>
            </Container>
            <Container className='content column gap-1'>
                {items.filter(i => i instanceof Place)
                    .map(i => <PlaceCard key={i.id} className='flex-0' place={i as Place}/>)}
            </Container>
        </div>
    )
}