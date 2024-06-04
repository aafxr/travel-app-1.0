import React, {useEffect, useState} from "react";

import DateInput from "../ui/Input/DateInput";
import {DatePicker} from "../DatePicker/DatePicker";


type DateRangeType = { start: Date | undefined, end: Date | undefined }


type DateRangePropsType = {
    init?: DateRangeType,
    minDate?: Date,
    maxDate?: Date,
    onChange?: (date: Partial<DateRangeType>) => unknown
}

/**
 * компонент отрисовывает два поля для ввода диапазона дат
 * @name DateRange
 * @param {DateRangeType} init - инициализация диапазона дат
 * @param {Date} minDate - значение которое используется в качестве ограничения календаяря (делает не активной даты до указанной в ытом поле)
 * @param {Date} maxDate - значение которое используется в качестве ограничения календаяря (делает не активной после даты указанной в этом поле)
 * @param {Function} onChange - функция принимает измененные {start, end}
 * @returns {JSX.Element}
 * @category Components
 */
export default function DateRange({
                                      init,
                                      minDate,
                                      maxDate,
                                      onChange
                                  }: DateRangePropsType) {
    /*** диапазона дат */
    const [range, setRange] = useState<DateRangeType>({start: undefined, end: undefined})

    useEffect(() => {
        if (init &&
            (init.start !== range.start || init.end !== range.end)
        ) {
            setRange(init)
        }
    }, [init])


    /** обработчик устанавливает дату начала диапазона и смещает дату конца диапазона */
    function handleDateChange(date: Date, type: 'start' | 'end') {
        if (range) {
            if (type === 'start') {
                const state = {...range, start: date}
                setRange(state)
                onChange && onChange({start: new Date(date)})
            } else if (type === 'end') {
                const state = {...range, end: date}
                setRange(state)
                onChange && onChange({end: date})
            }
        }
    }


    return (
        <div className='flex-stretch gap-0.25'>
            <DatePicker
                className='w-full'
                placeholder={'Начало'}
                value={range?.start ? new Date(range?.start?.getTime() - range?.start?.getTimezoneOffset() * 60 * 1000) : undefined}
                onChange={date => handleDateChange(date, "start")}
            />
            <DatePicker
                className='w-full'
                placeholder={'Завершение'}
                value={range?.end ? new Date(range?.end?.getTime() - range?.end?.getTimezoneOffset() * 60 *1000) : undefined}
                min={range?.start}
                onChange={date => handleDateChange(date, "end")}
            />
        </div>
    )
}