import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {filter} from "rxjs";


import {ShowTravelsList} from "./ShowTravelsList";
import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import {useActionSubject} from "../../contexts/SubjectContextProvider";
import {Travel} from "../../core/classes";
import {StoreName} from "../../types/StoreName";
import {TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import Container from "../../components/Container/Container";
import {PageHeader, Tab} from "../../components/ui";
import Navigation from "../../components/Navigation/Navigation";

/**
 * @typedef {'old' | 'current' | 'plan'} TravelDateStatus
 */

/**
 * компонент отображает  маршруты, отсортированные по времени (прошлыые, текущие, будущие)
 * @function
 * @name TravelRoutes
 * @category Pages
 */
export function TravelRoutes() {
    const user = useUser()
    const ctx = useAppContext()
    const actionSubject = useActionSubject()

    const {travelType} = useParams()
    const navigate = useNavigate()
    const [travels, setTravels] = useState<Travel[]>([])
    /** список отфильтрованных путешествий в соответствии с выбранным табом */
    const [actualTravels, setActualTravels] = useState<Array<Travel>>([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if(!user) return
        const set = new Set(travels.map(t => t.id))
        const subscription = actionSubject
            .pipe( filter(a => a.entity === StoreName.TRAVEL && a.data.id && !set.has(a.data.id)) )
            .subscribe({
            next: (action) => {
                TravelController.read(ctx, action.data.id)
                    .then(t => t && setTravels(prev => [...prev, t]) )
                    .catch(defaultHandleError)
            }
        })
        return () => {subscription.unsubscribe()}
    }, [travels])


    useEffect(() => {
        if (user) {
            TravelController.getList(ctx)
                .then(setTravels)
                .catch(console.error)
                .finally(() => setLoading(false))
        }
    }, [])


    /** обновление списка актуальных путешествий */
    useEffect(() => {
        if (travels && travelType) {
            const filteredTravels = travels.filter(t => getTravelDateStatus(t) === travelType)
            travels.forEach(t => console.log(getTravelDateStatus(t)))

            setActualTravels(filteredTravels)
        }
    }, [travels, travelType])


    /** обработка удаления путешествия */
    function handleRemove(travel: Travel) {
        if (user) {
            /** удаление путешествия из бд и добавление экшена об удалении */
            TravelController.delete(ctx, travel)
                .then(() => setTravels(travels.filter(t => t !== travel)))
                .catch(defaultHandleError)
        }
    }


    const handleNewTrip = () => navigate(`/travel/add/`)


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader title={'Маршруты'}/>
            </Container>
            <div className='flex-stretch'>
                <Tab name={'Прошедшие'} to={'/travels/old/'}/>
                <Tab name={'Текущие'} to={'/travels/current/'}/>
                <Tab name={'Будущие'} to={'/travels/plan/'}/>
            </div>
            <Container className='overflow-x-hidden content pt-20 pb-20' loading={loading}>
                {!travels.length && <div className='link' onClick={handleNewTrip}>Запланировать поездку</div>}
                {!!travels.length && <ShowTravelsList travels={actualTravels} onRemove={handleRemove}/>}
            </Container>
            <Navigation className='footer'/>
        </div>
    )
}


/**
 * функция определяет временной статус путешествия (прошлыые, текущие, будущие)
 */
function getTravelDateStatus(travel: Travel) {
    if (!travel) return "old"
    const now = new Date()

    if (travel.date_end < now) {
        return "old"
    } else if (travel.date_start > now) {
        return "plan"
    }
    return "current"
}