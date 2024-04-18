import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import RadioButtonGroup, {RadioButtonGroupItemType} from "../../components/ui/RadioButtonGroup/RadioButtonGroup";
import {defaultMovementTags} from "../../components/defaultMovementTags/defaultMovementTags";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import TravelInterests from "../../components/TravelInterests/TravelInterests";
import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import {TravelPeople} from "../../components/TravelPeople/TravelPeople";
import {TravelController} from "../../core/service-controllers";
import NumberInput from "../../components/ui/Input/NumberInput";
import ToggleBox from "../../components/ui/ToggleBox/ToggleBox";
import {Member, Preference, Travel} from "../../core/classes";
import Container from "../../components/Container/Container";
import DateRange from "../../components/DateRange/DateRange";
import {MovementType} from "../../types/MovementType";
import {Chip, PageHeader} from "../../components/ui";
import Counter from "../../components/Counter/Counter";
import Button from "../../components/ui/Button/Button";

import './TravelSettings.css'



const sightseeingTime: RadioButtonGroupItemType[] = [
    {id: 1, title: 'Низкая'},
    {id: 2, title: 'Средняя'},
    {id: 3, title: 'Высокая'},
]

const depth: RadioButtonGroupItemType[] = [
    {id: 1, title: 'Поверхностно'},
    {id: 2, title: 'Обычно'},
    {id: 3, title: 'Детально'},
]
/**
 * Страница формирования путешествия ( добавление даты / отели / встречи / участники)
 * @function
 * @name TravelSettings
 * @returns {JSX.Element}
 * @category Pages
 */
export function TravelSettings() {
    const user = useUser()!
    const context = useAppContext()
    const navigate = useNavigate()

    const [travel, setTravel] = useState<Travel>()
    const [change, setChange] = useState(false)
    const [message, setMessage] = useState<string>('')


    useEffect(() => {
        const t = context.travel
        if(t) setTravel(new Travel(t))
        else setMessage(`Context travel is not set`)
    }, [])

    /** обработка нажатия на карточку пользователя */
    const handleUserClick = (user: Member) => {
        if(!context.travel) return
        navigate(`/travel/${context.travel.id}/settings/${user.id}/`)
    }

    useEffect(() => {
        if(!context.travel){
            console.log('Travel field is empty in context')
            navigate(-1)
        }
    }, [])

    /** добавление / удаление способа перемещения во время маршрута */
    function handleMovementSelect(movementType: MovementType) {
        if (!travel) return;
        if (travel.movementTypes.length === 1 && movementType === travel.movementTypes[0]) return
        if (travel.movementTypes.includes(movementType))
            travel.movementTypes = travel.movementTypes.filter(mt => mt !== movementType)
        else
            travel.movementTypes = [...travel.movementTypes, movementType]
        if(!change) setChange(true)
        setTravel({...travel})
    }


    /** обработчик изменения времени */
    function handleDateRangeChange({start, end}: { start?: Date, end?: Date }) {
        console.log({ start: start?.getHours(), end })
        if (!travel) return;
        if (start) Travel.setDateStart(travel, start)
        if (end) Travel.setDateEnd(travel, end)
        if(!change) setChange(true)
        console.log({ start: travel.date_start.getHours(), end: travel.date_end.getHours() })
        setTravel({...travel})
    }

    function handleTravelDays(d: number) {
        if (!travel) return
        if (d < 1) return

        Travel.setDays(travel, d)
        if(!change) setChange(true)
        setTravel({...travel})
    }


    function handleDensityChange(select: RadioButtonGroupItemType[]) {
        if (!travel) return;
        travel.preference.density = select[0].id as Preference['density']
        if(!change) setChange(true)
        setTravel({...travel})
    }


    function handleDepthChange(select: RadioButtonGroupItemType[]) {
        if (!travel) return;
        travel.preference.depth = select[0].id as Preference['depth']
        if(!change) setChange(true)
        setTravel({...travel})
    }


    /** сохранение параметров путешествия */
    function handleSaveTravelButton() {
        if (!user) return
        if (!travel) return;
        TravelController.create(context, travel)
            .then(() => context.setTravel(travel))
            .then(() => navigate(`/travel/${travel.id}/advice-route/`))
            .catch(defaultHandleError)
    }


    function handleToggleBoxChanged(isPublic: boolean) {
        if (!travel) return
        travel.permission.public = isPublic ? 1 : 0
        if(!change) setChange(true)
        setTravel({...travel})
    }


    function handleMembersCountChange(num: number) {
        if (!travel) return
        travel.members_count = num
        if(!change) setChange(true)
        setTravel({...travel})
    }

    function handleChildrenCountChange(num: number) {
        if (!travel) return
        travel.children_count = num
        if(!change) setChange(true)
        setTravel({...travel})
    }

    function handleInterestsChange(key: keyof Preference['interests'] ) {
        if (!travel) return
        Travel.getInterest(travel, key)
            ? travel.preference.interests[key] = 0
            : travel.preference.interests[key] = 1
        if(!change) setChange(true)
        setTravel({...travel})
    }


    if(message) return <Container className={'center h-full'}>{message}</Container>

    if (!travel) return null


    return (
        <>
            <div className='travel-settings wrapper'>
                <Container>
                    <PageHeader arrowBack title={'Параметры'}/>
                </Container>
                <Container className='content overflow-x-hidden'>
                    <div className='content column'>
                        <section className='travel-settings-dirrection block'>
                            <h4 className='title-semi-bold'>Направление</h4>
                            <div className='travel-settings-dirrection-title row'>
                                <Chip color='light-orange' rounded>
                                    {travel.direction || travel.title}
                                </Chip>
                            </div>
                        </section>

                        <section className='travel-settings-date column gap-0.5 block'>
                            <h4 className='title-semi-bold'>Дата поездки</h4>
                            <div className='travel-edit-days'>
                                <span className='title-semi-bold'>Количество дней</span>
                                <NumberInput
                                    className='travel-edit-days-input'
                                    value={travel.days}
                                    onChange={handleTravelDays}
                                    size={1}
                                />
                            </div>
                            <DateRange
                                init={travel.date_start.getTime() > 0 ? {
                                    start: travel.date_start,
                                    end: travel.date_end
                                } : undefined}
                                minDate={travel.date_start}
                                onChange={handleDateRangeChange}
                            />
                        </section>

                        <section className='travel-settings-movement column gap-0.5 block'>
                            <h4 className='title-semi-bold'>Предпочитаемый способ передвижения</h4>
                            <div className='flex-wrap gap-1'>
                                {
                                    defaultMovementTags.map(dmt => (
                                        <Chip
                                            key={dmt.id}
                                            icon={dmt.icon}
                                            color={~travel.movementTypes.findIndex(mt => mt === dmt.id) ? 'orange' : 'grey'}
                                            rounded
                                            onClick={() => handleMovementSelect(dmt.id)}
                                        >
                                            {dmt.title}
                                        </Chip>
                                    ))
                                }
                            </div>
                        </section>

                        <section className='block'>
                            <ToggleBox
                                className='block'
                                init={Boolean(travel.isPublic)}
                                onChange={handleToggleBoxChanged}
                                title={"Сделать видимым для всех"}
                            />
                        </section>

                        <section className='travel-settings-members column gap-0.5 block'>
                            <h4 className='title-semi-bold'>Участники</h4>
                            {Travel.getMembers(travel).map(mid => (
                                <TravelPeople memberID={mid} onClick={handleUserClick}/>
                            ))}
                            <div className='center'>
                                {/*<AddButton to={`/travel/${travelCode}/settings/invite/`}>Добавить*/}
                                {/*    участника</AddButton>*/}
                            </div>
                            <div className='flex-between'>
                                <span>Взрослые</span>
                                <Counter
                                    init={travel.members_count}
                                    min={travel.admins.length + travel.editors.length + travel.commentator.length || 1}
                                    onChange={handleMembersCountChange}
                                />
                            </div>
                            <div className='flex-between'>
                                <span>Дети</span>
                                <Counter
                                    init={travel.children_count}
                                    min={0}
                                    onChange={handleChildrenCountChange}
                                />
                            </div>
                        </section>

                        <section className='block'>
                            <RadioButtonGroup
                                title={'Насыщенность путешествия'}
                                checklist={sightseeingTime}
                                onChange={handleDensityChange}
                                init={sightseeingTime.find(st => st.id === context.travel?.preference.density)!}
                            />
                        </section>

                        <section className='block'>
                            <RadioButtonGroup
                                title={'Глубина осмотра '}
                                checklist={depth}
                                onChange={handleDepthChange}
                                init={depth.find(d => d.id === context.travel?.preference.depth)!}
                            />
                        </section>

                        <section className='block'>
                            <div className='title-semi-bold'>Интересы</div>
                            <TravelInterests
                                interests={travel.preference.interests}
                                onClick={handleInterestsChange}
                            />
                        </section>

                        <section className='block'>
                            <div className='link' onClick={() => navigate(`/travel/${travel.id}/details/`)}>+ Добавить
                                детали поездки
                            </div>
                        </section>

                        {/*{*/}
                        {/*    Array.isArray(updatedTravel.hotels) && updatedTravel.hotels.length > 0 && (*/}
                        {/*        <section className='travel-settings-hotels column gap-0.5 block'>*/}
                        {/*            <h4 className='title-semi-bold'>Отель</h4>*/}
                        {/*            {*/}
                        {/*                updatedTravel.hotels.map(h => (*/}
                        {/*                    <Link key={h.id} to={`/travel/${travel.id}/add/hotel/${h.id}/`}>*/}
                        {/*                        <div className='travel-settings-hotel'>*/}
                        {/*                            <div*/}
                        {/*                                className='travel-settings-hotel-rent'>{dateRange(h.check_in, h.check_out)}</div>*/}
                        {/*                            <div*/}
                        {/*                                className='travel-settings-hotel-title title-semi-bold'>{h.title}</div>*/}
                        {/*                        </div>*/}
                        {/*                    </Link>*/}
                        {/*                ))*/}
                        {/*            }*/}
                        {/*            /!*<div*!/*/}
                        {/*            /!*    className='link'*!/*/}
                        {/*            /!*    onClick={() => navigate(`/travel/${travelCode}/add/hotel/`)}*!/*/}
                        {/*            /!*>*!/*/}
                        {/*            /!*    + Добавить отель*!/*/}
                        {/*            /!*</div>*!/*/}
                        {/*        </section>*/}
                        {/*    )*/}
                        {/*}*/}

                        {/*{*/}
                        {/*    Array.isArray(updatedTravel.appointments) && updatedTravel.appointments.length > 0 && (*/}
                        {/*        <section className='travel-settings-appointments column gap-0.5 block'>*/}
                        {/*            <h4 className='title-semi-bold'>Встреча</h4>*/}
                        {/*            {*/}
                        {/*                !!updatedTravel.appointments && Array.isArray(updatedTravel.appointments) && (*/}
                        {/*                    updatedTravel.appointments.map(a => (*/}
                        {/*                        <Link key={a.id}*/}
                        {/*                              to={`/travel/${travel.id}/add/appointment/${a.id}/`}>*/}
                        {/*                            <div className='travel-settings-appointment'>*/}
                        {/*                                <div*/}
                        {/*                                    className='travel-settings-appointment-date'>{dateRange(a.date, a.date) + ' ' + a.time.split(':').slice(0, 2).join(':')}</div>*/}
                        {/*                                <div*/}
                        {/*                                    className='travel-settings-appointment-title title-semi-bold'>{a.title}</div>*/}
                        {/*                            </div>*/}
                        {/*                        </Link>*/}
                        {/*                    ))*/}
                        {/*                )*/}
                        {/*            }*/}
                        {/*            /!*<div*!/*/}
                        {/*            /!*    className='link'*!/*/}
                        {/*            /!*    onClick={() => navigate(`/travel/${travelCode}/add/appointment/`)}*!/*/}
                        {/*            /!*>*!/*/}
                        {/*            /!*    + Добавить встречу*!/*/}
                        {/*            /!*</div>*!/*/}
                        {/*        </section>*/}
                        {/*    )*/}
                        {/*}*/}


                    </div>
                </Container>
                <div className='footer-btn-container footer'>
                    <Button onClick={handleSaveTravelButton} disabled={!change}>Построить маршрут</Button>
                </div>
            </div>
            {/*<FlatButton*/}
            {/*    className={'buttons-block'}*/}
            {/*    onInvite={() => navigate(`/travel/${travel.id}/settings/invite/`)}*/}
            {/*    onHotel={() => navigate(`/travel/${travel.id}/add/hotel/`)}*/}
            {/*    onAppointment={() => navigate(`/travel/${travel.id}/add/appointment/`)}*/}
            {/*/>*/}
        </>
    )
}