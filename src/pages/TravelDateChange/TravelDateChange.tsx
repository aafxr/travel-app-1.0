import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import NumberInput from "../../components/ui/Input/NumberInput";
import {TravelController} from "../../core/service-controllers";
import {useAppContext} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import DateRange from "../../components/DateRange/DateRange";
import Button from "../../components/ui/Button/Button";
import {useAppDispatch, useTravel} from "../../hooks/redux-hooks";
import {PageHeader} from "../../components/ui";
import {Travel} from "../../core/classes";

import './TravelDateChange.css'
import {updateTravel} from "../../redux/slices/travel-slice";


export function TravelDateChange() {
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {travel: stateTravel} = useTravel()
    const [travel, setTravel] = useState<Travel>()
    const [change, setChange] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (!stateTravel) return
        setTravel(new Travel(stateTravel))
    }, [stateTravel]);


    function handleDateRangeChange({start, end}: { start?: Date, end?: Date }) {
        if (!travel) return;
        if (start) Travel.setDateStart(travel, start)
        if (end) Travel.setDateEnd(travel, end)
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }

    function handleTravelDays(d: number) {
        if (!travel) return
        if (d < 1) return

        Travel.setDays(travel, d)
        if (!change) setChange(true)
        setTravel(new Travel(travel))
    }


    async function handleSaveDateChange() {
        if (!change) return
        if (!travel) return

        try {
            await TravelController.update(context, travel)
            dispatch(updateTravel(travel))
            navigate(-1)
        } catch (e) {
            defaultHandleError(e as Error)
        }
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Дата поездки'} />
            </Container>
            <Container className='content'>
                <section className='travel-settings-date column gap-0.5'>
                    <div className='travel-edit-days'>
                        <span className='title-semi-bold'>Количество дней: </span>
                        <NumberInput
                            className='travel-edit-days-input'
                            value={travel?.days}
                            onChange={handleTravelDays}
                            size={1}
                        />
                    </div>
                    {!!travel && (
                        <DateRange
                            init={travel.date_start.getTime() > 0 ? {
                                start: travel.date_start,
                                end: travel.date_end
                            } : undefined}
                            minDate={travel.date_start}
                            onChange={handleDateRangeChange}
                        />
                    )}
                </section>
            </Container>

            <div className='footer footer-btn-container'>
                <Button
                    onClick={handleSaveDateChange}
                    disabled={!change}
                >
                    Сохранить
                </Button>
            </div>

        </div>
    )
}