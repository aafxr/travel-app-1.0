import clsx from "clsx";
import {useEffect, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {APIRouteType, fetchRouteAdvice} from "../../api/fetch";
import Container from "../../components/Container/Container";
import {useNewTravelContext} from "./useNewTravelContext";
import {Hotel, Place, Travel} from "../../core/classes";
import Button from "../../components/ui/Button/Button";
import {TravelStepPropsType} from "./NewTravel";
import {PageHeader} from "../../components/ui";


const formatter = Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})


export function Step_3_AdviceRoute({next}: TravelStepPropsType) {
    const ntc = useNewTravelContext()
    const [route, setRoute] = useState<APIRouteType>()
    const [routes, setRoutes] = useState<APIRouteType[]>([])
    const [confirmBtnDisable, setConfirmBtnDisable] = useState(false)

    useEffect(() => {
        fetchRouteAdvice(ntc.travel)
            .then(response => {
                if (!response) {
                    next(new Travel(ntc.travel))
                    return
                }
                setRoutes(response.routes)
            })
            .catch(defaultHandleError)
    }, [])


    async function handleRouteSubmit() {
        try {

            let travel = ntc.travel
            setConfirmBtnDisable(true)
            travel = new Travel(travel)

            if (!route) {
                next(new Travel(travel))
                return
            }

            const hotels = []
            const places = []

            for (const step of route.steps) {
                if (step.type === "hotel") {
                    const place = step.place
                    const hotel = new Hotel({
                        id: Hotel.getID(travel, place.id),
                        name: place.name,
                        photo: place.photo,
                        price: Number(place.price),
                        rate: Number(place.rate),
                        day: step.day,
                        tags: place.tags,
                        date_start: new Date(step.timeStart),
                        date_end: new Date(step.timeEnd),
                        position: [Number(place.position[0]), Number(place.position[1])],
                    })
                    hotels.push(hotel)
                } else if (step.type === 'place') {
                    const step_place = step.place
                    const place = new Place({
                        id: Place.getID(travel, step_place.id),
                        name: step_place.name,
                        formatted_address: '',
                        photos: [step_place.photo],
                        price: Number(step_place.price),
                        duration: Number(step_place.duration),
                        location: [Number(step_place.position[0]), Number(step_place.position[1])],
                        date_start: new Date(step.timeStart),
                        date_end: new Date(step.timeEnd),
                        day: step.day,
                        popularity: Number(step_place.popularity)
                    })
                    places.push(place)
                }
            }
            travel.places_id = places.map(p => p.id)
            travel.hotels_id = hotels.map(h => h.id)

            ntc.places = places
            ntc.hotels = hotels
            ntc.travel = travel

            next(new Travel(ntc.travel))
        } catch (e) {
            defaultHandleError(e as Error)
        } finally {
            setConfirmBtnDisable(false)
        }
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Подходящие маршруты'}/>
            </Container>
            <Container className='content column gap-1'>
                {
                    routes.map(r => (
                        <div
                            key={r.price + '-' + r.score}
                            className={clsx('route', r === route && 'selected')}
                            onClick={() => setRoute(r)}
                        >
                            <div className='route-date'>{r.date}</div>
                            <div className='route-price'>{formatter.format(r.price)}</div>
                        </div>
                    ))
                }
            </Container>
            <div className='footer footer-btn-container'>
                <Button
                    onClick={handleRouteSubmit}
                    loading={confirmBtnDisable}
                >Продолжить</Button>
            </div>
        </div>
    )
}