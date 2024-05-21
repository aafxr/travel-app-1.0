import {forwardRef, useRef, useState} from "react";

import {ClockIcon} from "../../svg/ClockIcon";
import {Input} from "../index";

import './Time.css'
import range from "../../../utils/range";
import {useOutside} from "../../../hooks";
import {createPortal} from "react-dom";

export type TimePropsType = {
    className?: string
    value?: Date
    onChange?: Date
}

export function Time({value, onChange, className}: TimePropsType){
    const {ref: listRef} = useOutside<HTMLDivElement>(false, () => {setActive(false)})
    const [inputValue, setInputValue] = useState('')
    const [active, setActive] = useState(false)
    // const listRef = useRef<HTMLDivElement>(null)



    return (
        <div className='time'>
            <Input
                className='time-input'
                value={value?.toLocaleTimeString().slice(0,5)}
                onFocus={() => setActive(true)}
            />
            <ClockIcon className='time-clock icon'/>
            {active && <TimeList ref={listRef}/>}
        </div>
    )
}

const TimeList = forwardRef<HTMLDivElement>((props, ref) => {
    return createPortal(
        <div ref={ref} className='time-list'>
            <div className='hh'>
                {range(0,24).map(h => (
                    <div key={h} className='item'>{h < 10 ? `0${h}` : h}</div>
                ) )}
            </div>
            <div className='mm'>
                {range(0,60, 5).map(h => (
                    <div key={h} className='item'>{h < 10 ? `0${h}` : h}</div>
                ) )}
            </div>
        </div>, document.body
    )
})