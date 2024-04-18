import clsx from "clsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {APIRouteType, fetchRouteAdvice} from "../../api/fetch";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {Hotel, Place} from "../../core/classes";
import {PageHeader} from "../../components/ui";

import './RouteAdvice.css'

const formatter = Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 2, maximumFractionDigits: 2})

export function RouteAdvice() {
    const context = useAppContext()
    const navigate = useNavigate()
    const [route, setRoute] = useState<APIRouteType>()
    const [routes, setRoutes] = useState<APIRouteType[]>([])

    useEffect(() => {
        const travel = context.travel
        if (!travel) return

        fetchRouteAdvice(travel)
            .then(response => {
                if (!response) return
                console.log(response)
                setRoutes(response.routes)
            })
            .catch(defaultHandleError)
    }, [])

    function handleRouteSubmit() {
        const travel = context.travel
        if (!travel || !route) return

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
                    date_start: new Date(step.timeEnd * 1000),
                    date_end: new Date(step.timeStart * 1000),
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
                    date_start: new Date(step.timeStart * 1000),
                    date_end: new Date(step.timeEnd * 1000),
                    day: step.day,
                    popularity: Number(step_place.popularity)
                })
                places.push(place)
            }
        }
        travel.places_id = places.map(p => p.id)
        travel.hotels_id = hotels.map(h => h.id)

        console.log(travel)
        console.log(places)
        console.log(hotels)

        Promise.all([
            TravelController.create(context, travel).catch(defaultHandleError),
            ...places.map(p => PlaceController.create(context, p).catch(defaultHandleError)),
            ...hotels.map(h => HotelController.create(context, h).catch(defaultHandleError))
        ])
            .then(() => context.setTravel(travel))
            .then(() => navigate(`/travel/${travel.id}/`))
            .catch((e) => {
                defaultHandleError(e)
                navigate(`/travel/${travel.id}/`)
            })
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
                    disabled={!route}
                >Продолжить</Button>
            </div>
        </div>
    )
}