import React, {useEffect, useMemo, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useLangContext} from "../../contexts/LangContextProvider";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {PageHeader} from "../../components/ui";
import {CheckIcon} from "../../components/svg";
import {Action} from "../../core/classes";
import {DB} from "../../core/db/DB";

import './ActionsList.css'


const convertActionType: { [key: string]: string } = {
    [ActionType.ADD]: "Добавлен",
    [ActionType.UPDATE]: "Обновлен",
    [ActionType.DELETE]: "Удален",
}
const convertorStoreName: { [key: string]: string } = {

    [StoreName.EXPENSES_ACTUAL]: 'Расходы(Т)',
    [StoreName.EXPENSES_PLAN]: 'Расходы(П)',
    [StoreName.EXPENSE]: 'Расходы',
    [StoreName.LIMIT]: 'Лимит',
    [StoreName.TRAVEL]: 'Маршрут',
    [StoreName.PLACE]: 'Локация',
    [StoreName.HOTELS]: 'Отель',
    [StoreName.Photo]: 'Фото',
    [StoreName.USERS]: 'Пользователь',

}


const actionTimeOptions: Intl.DateTimeFormatOptions = {
    minute: "2-digit",
    hour: "2-digit",
    day: "numeric",
    month: "long",
    year: "2-digit"
}

/**
 * страница отображения последних действий
 * @function
 * @name ActionsList
 * @category Pages
 */
export function ActionsList() {
    const lang = useLangContext()
    const [actions, setActions] = useState<Action<any>[]>([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        DB.getAll<Action<any>>(StoreName.ACTION, 200)
            .then(setActions)
            .catch(defaultHandleError)
            .finally(() => setLoading(false))
    }, [])


    const list = useMemo(() => actions.sort(
        (a, b) => b.datetime.getTime() - a.datetime.getTime())
        .map(
            action => {
                const a = {...action}
                a.entity = (convertorStoreName[a.entity] || '') as StoreName
                a.action = (convertActionType[a.action] || '') as ActionType
                return a
            }
        ), [actions])


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={lang.actions}/>
            </Container>
            <Container className='content' loading={loading}>
                {list.map(a => (
                    <div key={a.id} className='action'>
                        <div className='action-title'>
                            <span>{a.data.id}</span>
                        </div>
                        <div className='action-type'>
                            {a.entity}&nbsp;-&nbsp;{a.action}
                        </div>
                        <div className='action-time'>
                            {a.datetime.toLocaleTimeString(navigator.language, actionTimeOptions)}
                        </div>
                        <div className='action-synced'>
                            {a.synced
                                ? <CheckIcon className='icon success'/>
                                : <Loader/>
                            }
                        </div>
                    </div>
                ))}

            </Container>

        </div>
    )
}
