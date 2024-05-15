import clsx from "clsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {HotelController, PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {APIRouteType, fetchRouteAdvice} from "../../api/fetch";
import Container from "../../components/Container/Container";
import {loadTravel} from "../../redux/slices/travel-slice";
import Button from "../../components/ui/Button/Button";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {Hotel, Place, Travel} from "../../core/classes";
import {PageHeader} from "../../components/ui";

import './RouteAdvice.css'

const formatter = Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB', minimumFractionDigits: 2, maximumFractionDigits: 2})

export function RouteAdvice() {
    const context = useAppContext()
    const navigate = useNavigate()
    const [route, setRoute] = useState<APIRouteType>()
    const [routes, setRoutes] = useState<APIRouteType[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        const travel = context.travel
        if (!travel) {
            navigate('/')
            return
        }

        fetchRouteAdvice(travel)
            .then(response => {
                if (!response) {
                    TravelController.create(context, travel)
                        .then(() => navigate(`/travel/${travel.id}/`))
                        .catch(defaultHandleError)
                    return
                }
                console.log(response)
                setRoutes(response.routes)
            })
            .catch(defaultHandleError)
    }, [])


    async function handleRouteSubmit() {
        let travel = context.travel
        if (!travel) return
        travel = new Travel(travel)

        if(!route) {
            await TravelController.create(context, travel)
            navigate(`/travel/${travel.id}/`)
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


        const promises: Promise<any>[] = []
        for (const hotel of hotels){
            promises.push((async () => {
                try { await HotelController.create(context, hotel) }catch(r){}
            })())
        }
        for (const place of places){
            promises.push((async () => {
                try { await PlaceController.create(context, place) }catch(r){}
            })())
        }

        await Promise.all(promises)

        try {
            await TravelController.create(context, travel)
        }catch (e){defaultHandleError(e as Error)}

        dispatch(loadTravel({ctx: context, travelID: travel.id}))
        navigate(`/travel/${travel.id}/`)
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
                >Продолжить</Button>
            </div>
        </div>
    )
}