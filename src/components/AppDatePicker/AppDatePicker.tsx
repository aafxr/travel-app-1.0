import React, {useEffect, useRef, useState} from "react";

import './AppDatePicker.css'
import {ChevronRightIcon} from "../svg";


interface DatePickerPropsType {
    date: Date
}


const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}


export function AppDatePicker({
                                  date
                              }: DatePickerPropsType) {

    const [selected, setSelected] = useState<Date>()


    return (
        <div className='dp'>
            <div className='dp-header'>
                <div className='dp-arrow left'>
                    <ChevronRightIcon className='icon' />
                </div>
                <div className='dp-title'>
                    {date.toLocaleDateString(navigator.language, dateOptions)}
                </div>
                <div className='dp-arrow right'>
                    <ChevronRightIcon className='icon' />
                </div>
            </div>
            <div className='dp-callendar'>
                {
                    Array.from({length: 31}).fill('').map((_, i) => (
                        <div className='dp-item'>{i}</div>

                    ))
                }
            </div>
        </div>
    )
}