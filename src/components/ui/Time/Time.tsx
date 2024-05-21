import {forwardRef, useRef, useState} from "react";

import {ClockIcon} from "../../svg/ClockIcon";
import {Input} from "../index";

import './Time.css'
import range from "../../../utils/range";
import {useOutside} from "../../../hooks";
import {createPortal} from "react-dom";
import clsx from "clsx";

export type TimePropsType = {
    className?: string
    value?: Date
    onChange?: Date
}

export function Time({value, onChange, className}: TimePropsType){
    const {ref: listRef} = useOutside<HTMLDivElement>(false, () => {setActive(false)})
    const [inputValue, setInputValue] = useState('')
    const [date, setDate] = useState(value || new Date(0))
    const [active, setActive] = useState(false)
    // const listRef = useRef<HTMLDivElement>(null)
    const [hh, mm] = date.toLocaleTimeString().split(':').map(el => Number(el))

    console.log([hh, mm])


    function handleMinutesChange(m: number){

    }

    return (
        <div className='time'
             onClick={() => setActive(prev => !prev)}
        >
            <Input
                className='time-input'
                value={value?.toLocaleTimeString().slice(0, 5)}
                // onFocus={() => setActive(true)}
            />
            <ClockIcon className='time-clock icon'/>
            {/*{active && <TimeList ref={listRef}/>}*/}
            <div ref={listRef} className='time-list'>
                <div className='hh'>
                    {range(0, 24).map(h => (
                        <div
                            key={h}
                            className={clsx('item', {selected: hh === h})}
                        >
                            {h < 10 ? `0${h}` : h}
                        </div>
                    ))}
                </div>
                <div className='mm'>
                    {range(0, 60, 5).map(m => (
                        <div
                            key={m}
                            className={clsx('item', {selected: hh === m})}
                        >
                            {m < 10 ? `0${m}` : m}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const TimeList = forwardRef<HTMLDivElement>((props, ref) => {
    return createPortal(
        <div ref={ref} className='time-list'>
            <div className='hh'>
                {range(0, 24).map(h => (
                    <div key={h} className='item'>{h < 10 ? `0${h}` : h}</div>
                ))}
            </div>
            <div className='mm'>
                {range(0, 60, 5).map(m => (
                    <div key={m} className='item'>{m < 10 ? `0${m}` : m}</div>
                ) )}
            </div>
        </div>, document.body
    )
})