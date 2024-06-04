import clsx from "clsx";
import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";

import {CalendarIcon, ChevronRightIcon} from "../svg";
import './DatePicker.css'


interface DatePickerPropsType {
    className?: string
    value?: Date
    placeholder?: string
    min?: Date
    max?: Date
    onChange?: (d: Date) => unknown
    onSubmit?: (d: Date) => unknown
}


const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: '2-digit'
}


const legend = ['Пн', "Вт", "Ср", "ЧТ", "ПТ", "Сб", "Вс"]


/**
 *
 * @param value
 * @param placeholder
 * @param min
 * @param max
 * @param onChange
 * @param onSubmit
 * @param className
 * @constructor
 */
export function DatePicker({
                               value,
                               placeholder,
                               min,
                               max,
                               onChange,
                               onSubmit,
                               className
                           }: DatePickerPropsType) {

    const [current, setCurrent] = useState<Date>(new Date())
    const [range, setRange] = useState<number[]>([])
    const [showPicker, setShowPicker] = useState(false)
    const dpHeaderRef = useRef<HTMLDivElement>(null)
    const dpPickerRef = useRef<HTMLDivElement>(null)


    const getPrevMonth = (d: Date) => d.getMonth() <= 0 ? 11 : d.getMonth() - 1
    const getNextMonth = (d: Date) => d.getMonth() >= 11 ? 0 : d.getMonth() + 1


    useEffect(() => {
        if (value) setCurrent(new Date(value))
    }, [value]);


    useEffect(() => {
        const r: number[] = []

        const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        const getMonthDayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay()

        for (let i = 0; i < getMonthDayStart(current); i++) r.push(0)
        for (let i = 1; i <= daysInMonth(current); i++) r.push(i)

        setRange(r)

    }, [current]);


    useEffect(() => {
        if(!showPicker) return
        const picker = dpPickerRef.current
        const header = dpHeaderRef.current
        if(!picker || !header) return

        const rect = header.getBoundingClientRect()
        picker.style.top = rect.bottom + 'px'
        if(rect.left + picker.offsetWidth > window.innerWidth){
            picker.style.right = window.innerWidth - rect.right + 'px'
        } else {
            picker.style.left = rect.left + 'px'
        }
    }, [showPicker])


    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            const picker = dpPickerRef.current
            const header = dpHeaderRef.current
            if(!picker || !header) return

            const el = e.target
            if(!el || !(el instanceof Node)) return

            if(picker.contains(el)) return
            if(header.contains(el)) return
            setShowPicker(false)
        }

        document.addEventListener('click', clickOutside)
        return () => {document.removeEventListener('click', clickOutside)}
    }, []);


    function handlePrevMonthClick() {
        const pm = getPrevMonth(current)
        const d = new Date(current)
        if (min && d.getTime() < min.getTime()) return

        d.setMonth(pm)
        onChange?.(d)
        setCurrent(d)
    }


    function handleNextMonthClick() {
        const nm = getNextMonth(current)
        const d = new Date(current)
        if (max && d.getTime() < max.getTime()) return
        d.setMonth(nm)
        onChange?.(d)
        setCurrent(d)
    }


    function handleSetDayClick(day: number) {
        if(!current) return
        if (!day) return
        const d = new Date(current)
        d.setDate(day)
        onChange?.(d)
        setCurrent(d)
    }


    function handleDateReset() {
        setCurrent(value ? new Date(value) : new Date())
    }


    function handleDateSubmit() {
        if (!current) return
        setShowPicker(false)
        onSubmit?.(current)
    }


    return (
        <div className={clsx('date', className)}>

            <div
                ref={dpHeaderRef}
                className='date-header'
                onClick={() => setShowPicker(!showPicker)}
            >
                <div className='date-text'>
                    {value ? current.toLocaleDateString(navigator.language, dateOptions) : placeholder || '-/-'}
                </div>
                <div className='date-icon'>
                    <CalendarIcon className='icon'/>
                </div>
            </div>

            {showPicker && createPortal(
                <div ref={dpPickerRef} className={'dp'}>
                    <div className='dp-header'>
                        <div
                            className='dp-arrow left'
                            onClick={handlePrevMonthClick}
                        >
                            <ChevronRightIcon className='icon'/>
                        </div>
                        <div className='dp-title'>
                            {current.toLocaleDateString(navigator.language, dateOptions) || '-/-'}
                        </div>
                        <div
                            className='dp-arrow right'
                            onClick={handleNextMonthClick}
                        >
                            <ChevronRightIcon className='icon'/>
                        </div>
                    </div>
                    <div className='dp-calendar'>
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
                </div>,
                document.body)}
        </div>
    )
}