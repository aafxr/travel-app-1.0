import React, {useEffect, useState} from "react";

import {ChevronRightIcon} from "../svg";
import './DatePicker.css'
import clsx from "clsx";


interface DatePickerPropsType {
    className?: string
    init: Date
    min?: Date
    max?: Date
    onChange?: (d: Date) => unknown
    onSubmit?: (d: Date) => unknown
}


const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}


const legend = ['Пн', "Вт", "Ср", "ЧТ", "ПТ", "Сб", "Вс"]


export function DatePicker({
                               init,
                               min,
                               max,
                               onChange,
                               onSubmit,
                               className
                           }: DatePickerPropsType) {

    const [current, setCurrent] = useState<Date>(init)
    const [range, setRange] = useState<number[]>([])


    const getPrevMonth = (d: Date) => d.getMonth() <= 0 ? 11 : d.getMonth() - 1
    const getNextMonth = (d: Date) => d.getMonth() >= 11 ? 0 : d.getMonth() + 1


    useEffect(() => {
        if (init) setCurrent(new Date(init))
        else setCurrent(new Date())
    }, []);


    useEffect(() => {
        const r: number[] = []

        const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        const getMonthDayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay()

        for (let i = 0; i < getMonthDayStart(current); i++) r.push(0)
        for (let i = 1; i <= daysInMonth(current); i++) r.push(i)

        setRange(r)

    }, [current]);


    function handlePrevMonthClick() {
        const pm = getPrevMonth(current)
        const d = new Date(current)
        if(min && d.getTime() < min.getTime()) return

        d.setMonth(pm)
        onChange?.(d)
        setCurrent(d)
    }


    function handleNextMonthClick() {
        const nm = getNextMonth(current)
        const d = new Date(current)
        if(max && d.getTime() < max.getTime()) return
        d.setMonth(nm)
        onChange?.(d)
        setCurrent(d)
    }


    function handleSetDayClick(day: number) {
        if (!day) return
        const d = new Date(current)
        d.setDate(day)
        onChange?.(d)
        setCurrent(d)
    }


    function handleDateReset() {
        setCurrent(init ? new Date(init) : new Date())
    }


    function handleDateSubmit() {
        onSubmit?.(current)
    }


    return (
        <div className={clsx('dp', className)}>
            <div className='dp-header'>
                <div
                    className='dp-arrow left'
                    onClick={handlePrevMonthClick}
                >
                    <ChevronRightIcon className='icon'/>
                </div>
                <div className='dp-title'>
                    {current.toLocaleDateString(navigator.language, dateOptions)}
                </div>
                <div
                    className='dp-arrow right'
                    onClick={handleNextMonthClick}
                >
                    <ChevronRightIcon className='icon'/>
                </div>
            </div>
            <div className='dp-callendar'>
                {legend.map(l => (
                    <div className='dp-item'>{l}</div>
                ))}
                {range.map((idx) => (
                    <div
                        className={clsx('dp-item', {selected: idx === current.getDate()})}
                        onClick={() => handleSetDayClick(idx)}
                    >{idx ? idx : ''}</div>
                ))
                }
            </div>

            <div className='dp-footer'>
                <button className='dp-btn' onClick={handleDateReset}>Сбросить</button>
                <button className='dp-btn' onClick={handleDateSubmit}>Установить</button>
            </div>
        </div>
    )
}