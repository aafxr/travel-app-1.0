import clsx from "clsx";
import React, { useEffect, useRef, useState} from "react";

import {ClockIcon} from "../../svg/ClockIcon";
import range from "../../../utils/range";
import {Popup} from "../Popup/Popup";

import './Time.css'

export type TimePropsType = {
    className?: string
    value?: Date
    placeholder?: string
    onChange?: (date: Date) => unknown
}

export function Time({value, onChange, className, placeholder = '--:--'}: TimePropsType) {
    const [date, setDate] = useState<Date>()
    const [active, setActive] = useState(false)
    const [hh, mm] = date?.toLocaleTimeString().split(':') || ['--', '--']

    const timeRef = useRef<HTMLDivElement>(null)
    const popupRef = useRef<HTMLDivElement>(null)
    const [rect, setRect] = useState<DOMRect>()


    useEffect(() => {
        setDate(value)
    }, [value]);


    useEffect(() => {
        const el = timeRef.current
        if (!el) return

        const initRect = () => {
            const r = el.getBoundingClientRect()
            setRect(r)
        }

        initRect()
        document.addEventListener('resize', initRect)
        return () => {
            document.removeEventListener('resize', initRect)
        }
    }, []);


    function handleHourChange(hh: number) {
        if (!date) return
        const d = new Date(date)
        d.setHours(hh)
        setDate(d)
        onChange?.(d)
    }


    function handleMinutesChange(mm: number) {
        if (!date) return
        const d = new Date(date)
        d.setMinutes(mm)
        setDate(d)
        onChange?.(d)
    }



    function handleTimeClick(){
        setActive(true)
        document.addEventListener('click', checkOutsideClick)

    }


    function checkOutsideClick(this: Document, e: MouseEvent) {
        const el = e.target
        if(!el || !(el instanceof Node)) return
        if(timeRef.current?.contains(el)) return
        if(popupRef.current?.contains(el)) return

        setActive(false)
        document.removeEventListener('click', checkOutsideClick)
    }


    return (
        <>
        <div
            ref={timeRef}
            className={clsx('time', className)}
             onClick={handleTimeClick}
        >
            <div className='time-inner'>{date ? `${hh}:${mm}` : placeholder}</div>
            <ClockIcon className='time-clock icon'/>
            {/*{active && <TimeList ref={listRef}/>}*/}
        </div>
            {active && <Popup ref={popupRef} style={{
                position: 'absolute',
                top: (rect?.bottom || 0) + 5 + 'px',
                left: (rect?.left || 0) + 'px',
            }}>
                <TimeList hour={hh} minute={mm} onHourChange={handleHourChange} onMinuteChange={handleMinutesChange}/>
            </Popup>}
        </>
    )
}


type TimeListPropsType = {
    hour: string,
    onHourChange: (hh: number) => void,
    minute: string,
    onMinuteChange: (mm: number) => void,


}


const TimeList = ({hour, minute, onHourChange, onMinuteChange}: TimeListPropsType) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        handleRowItemUpdate('.hh', "auto")
        handleRowItemUpdate('.mm', "auto")
    }, []);


    useEffect(() => {
        handleRowItemUpdate('.hh')
    }, [hour]);


    useEffect(() => {
        handleRowItemUpdate('.mm')
    }, [minute]);



    function handleRowItemUpdate(tag: string, behavior: ScrollIntoViewOptions['behavior'] = "smooth") {
        const el = ref.current
        if (!el) return

        el.querySelector(tag)
            ?.querySelector('.selected')
            ?.scrollIntoView({block: "center", behavior})
    }

    return (
        <div ref={ref} className='time-list'>
            <div className='hh hide-scroll'>
                {range(0, 23).map(h => (
                    <div
                        key={h}
                        className={clsx('time-item', {selected: +hour === h})}
                        onClick={() => onHourChange(h)}
                    >
                        <div className='item'>{h < 10 ? `0${h}` : h}</div>

                    </div>
                ))}
            </div>
            <div className='mm hide-scroll'>
                {range(0, 59, 5).map(m => (
                    <div
                        key={m}
                        className={clsx('time-item', {selected: +minute === m})}
                        onClick={() => onMinuteChange(m)}
                    >
                        <div className='item'>{m < 10 ? `0${m}` : m}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
