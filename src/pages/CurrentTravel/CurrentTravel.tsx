import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import {PlaceCard} from "../../components/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";
import {Hotel, Place} from "../../core/classes";
import {HotelCard} from "../../components/HotelCard/HotelCard";
import Swipe from "../../components/ui/Swipe/Swipe";
import {CheckIcon, TrashIcon} from "../../components/svg";

export function CurrentTravel() {
    const context = useAppContext()
    const {travelCode} = useParams()
    const navigate = useNavigate()

    const travel = useTravel()

    const [items, setItems] = useState<Array<Place | Hotel>>([])


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
        async function loadItems() {
            if (!travel) return

            const hotels = await HotelController.readAll(context, ...travel.hotels_id)
            const places = await PlaceController.readAll(context, ...travel.places_id)
            const items = [...hotels, ...places].sort((a, b) => a.date_start.getDay() - b.date_start.getTime())
            setItems(items)
        }

        loadItems().catch(defaultHandleError)
    }, [travel])


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack to={'/'} title={'Current Travel'}/>
            </Container>
            <Container className='content column gap-1 overflow-x-hidden'>
                {items.map(i => {
                    if (i instanceof Place)
                        return (
                            <Swipe
                                styles={{
                                    rightControls: 'h-full column center',
                                    leftControls: 'h-full column center'
                                }}
                                rightElement={<div><TrashIcon className='icon'/></div>}
                                leftElement={<div><CheckIcon className='icon'/></div>}
                            >
                                <PlaceCard key={i.id} className='flex-0' place={i}/>
                            </Swipe>
                        )
                    else if (i instanceof Hotel)
                        return (
                            <Swipe
                                styles={{
                                    rightControls: 'h-full column center',
                                    leftControls: 'h-full column center'
                                }}
                                rightElement={<div><TrashIcon className='icon'/></div>}
                                leftElement={<div><CheckIcon className='icon'/></div>}
                            >
                                <HotelCard key={i.id} className='flex-0' hotel={i}/>
                            </Swipe>
                        )
                })}
            </Container>
        </div>
    )
}