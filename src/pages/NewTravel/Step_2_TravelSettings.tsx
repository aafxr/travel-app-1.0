import React, {useEffect, useState} from "react";

import RadioButtonGroup, {RadioButtonGroupItemType} from "../../components/ui/RadioButtonGroup/RadioButtonGroup";
import {defaultMovementTags} from "../../components/defaultMovementTags/defaultMovementTags";
import TravelInterests from "../../components/TravelInterests/TravelInterests";
import NumberInput from "../../components/ui/Input/NumberInput";
import ToggleBox from "../../components/ui/ToggleBox/ToggleBox";
import {Member, Preference, Travel} from "../../core/classes";
import Container from "../../components/Container/Container";
import DateRange from "../../components/DateRange/DateRange";
import Counter from "../../components/Counter/Counter";
import Button from "../../components/ui/Button/Button";
import {MovementType} from "../../types/MovementType";
import {Chip, PageHeader} from "../../components/ui";
import {useUser} from "../../hooks/redux-hooks";
import {TravelStepPropsType} from "./NewTravel";
import {useNewTravelContext} from "./useNewTravelContext";


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


export function Step_2_TravelSettings({next}: TravelStepPropsType) {
    const user = useUser()!
    const ntc = useNewTravelContext()
    const [travel, setTravel] = useState<Travel>(new Travel())
    const [change, setChange] = useState(false)


    useEffect(() => { setTravel(new Travel(ntc.travel)) }, [])


    function handleMovementSelect(movementType: MovementType) {
        if (travel.movementTypes.length === 1 && movementType === travel.movementTypes[0]) return
        if (travel.movementTypes.includes(movementType))
            travel.movementTypes = travel.movementTypes.filter(mt => mt !== movementType)
        else
            travel.movementTypes = [...travel.movementTypes, movementType]
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleDateRangeChange({start, end}: { start?: Date, end?: Date }) {
        if (!travel) return;
        if (start) Travel.setDateStart(travel, start)
        if (end) Travel.setDateEnd(travel, end)
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }

    function handleTravelDays(d: number) {
        if (d < 1) return
        Travel.setDays(travel, d)
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleDensityChange(select: RadioButtonGroupItemType[]) {
        travel.preference.density = select[0].id as Preference['density']
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleDepthChange(select: RadioButtonGroupItemType[]) {
        travel.preference.depth = select[0].id as Preference['depth']
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleToggleBoxChanged(isPublic: boolean) {
        travel.permission.public = isPublic ? 1 : 0
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleMembersCountChange(num: number) {
        travel.members_count = num
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }

    function handleChildrenCountChange(num: number) {
        travel.children_count = num
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }

    function handleInterestsChange(key: keyof Preference['interests']) {
        Travel.getInterest(travel, key)
            ? travel.preference.interests[key] = 0
            : travel.preference.interests[key] = 1
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    function handleUserClick(m: Member) {
        console.log(m)
    }


    function handleAddDetails() {
        next(new Travel(travel), "Step_4_AddDetails")
    }


    function handleSaveTravelButton() {
        if (!change) return
        next(new Travel(travel), "Step_4_AddDetails")
    }


    return (
        <>
            <div className='travel-settings wrapper'>
                <Container>
                    <PageHeader
                        to={() => next(ntc.travel, 'Step_1_TravelName')}
                        arrowBack
                        title={'Параметры'}
                    />
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
                            {/*<h4 className='title-semi-bold'>Участники</h4>*/}
                            {/*{Travel.getMembers(travel).map(mid => (*/}
                            {/*    <TravelPeople key={mid} memberID={mid} onClick={handleUserClick}/>*/}
                            {/*))}*/}
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
                                init={sightseeingTime.find(st => st.id === travel.preference.density)!}
                            />
                        </section>

                        <section className='block'>
                            <RadioButtonGroup
                                title={'Глубина осмотра '}
                                checklist={depth}
                                onChange={handleDepthChange}
                                init={depth.find(d => d.id === travel.preference.depth)!}
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
                            <div className='link' onClick={handleAddDetails}>
                                + Добавить детали поездки
                            </div>
                        </section>
                    </div>
                </Container>
                <div className='footer-btn-container footer'>
                    <Button onClick={handleSaveTravelButton} disabled={!change}>Построить маршрут</Button>
                </div>
            </div>
        </>
    )
}