import React, {useEffect, useMemo, useState} from "react";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {DB} from "../../core/db/DB";
import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";
import ListItem from "../../components/ListItem/ListItem";
import {CheckIcon} from "../../components/svg";
import Loader from "../../components/Loader/Loader";
import {Action} from "../../core/classes";



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
    [StoreName.TRAVEL]: 'Маршрут'
}

/**
 * страница отображения последних действий
 * @function
 * @name ActionsList
 * @returns {JSX.Element}
 * @category Pages
 */
export function ActionsList() {
    const [actions, setActions] = useState<Action<any>[]>([])

    useEffect(() => {
        DB.getAll<Action<any>>(StoreName.ACTION, 200)
            .then(setActions)
            .catch(defaultHandleError)
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
        <Container>
            <PageHeader arrowBack title='Действия'/>
            {
                !!list.length && list.map(e => (
                        <ListItem
                            key={e.id}
                            topDescription={e.entity + ' - ' + e.action}
                            time={e.datetime}
                            icon={e.synced ? <CheckIcon success/> : <Loader/>}
                        >
                            {e.data.title || e.data.value || ''}
                        </ListItem>
                    )
                )
            }
        </Container>
    )
}