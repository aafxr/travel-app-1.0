import clsx from "clsx";
import {useCallback, useEffect, useRef, useState} from "react";

import './Alerts.css'

const ALERT_EVENT_NAME = 'alert-message'

let alertId = 0

/**
 * @category Types
 * @name AlertPayload
 * @typedef {object} AlertPayload
 * @property {'info' | 'success' | 'warning' | 'danger'} type
 * @property {string} message
 */
type AlertPayloadType = {
    type:'info' | 'success' | 'warning' | 'danger'
    message: string
    id?:number
}

/**
 * Помогает генерировать alert-event
 * @param {AlertPayload} payload
 */
export function pushAlertMessage(payload: AlertPayloadType) {
    if (!payload)
        console.warn('Push empty alert ', payload)

    payload.id = alertId++

    document.dispatchEvent(new CustomEvent(ALERT_EVENT_NAME, {
        detail: payload
    }))
}

// if (window)
//     window.newAlert = pushAlertMessage


/**
 * компонент отображает информационные сообщения
 * @param {number} count - количество одновременно отобрадаемых сообщений
 * @param {number} maxAlertsCount - количество сообщений , которые хранятся в очереди на отобрадение
 * @returns {JSX.Element}
 * @category Components
 */
export default function Alerts({count = 1, maxAlertsCount = 10}) {
    /*** число активных сообщений */
    const activeAlerts = useRef(0)
    /*** флаг сигнализирует о том, что очередб пуста */
    const [isEmpty, setIsEmpty] = useState(true)
    /*** очередь сообщений */
    const alertsQueue = useRef<AlertPayloadType[]>([])
    /*** React ref на контейнер с сообщениями */
    const ref = useRef<HTMLDivElement>(null)

    const onNewAlert = useCallback(function (e: CustomEvent<AlertPayloadType>) {
        const {detail} = e

        if (activeAlerts.current < count && ref && ref.current) {
            const {type, message} = detail
            activeAlerts.current += 1
            appendAlert(type, message)
        } else {
            alertsQueue.current.length < maxAlertsCount && alertsQueue.current.push(detail)
            isEmpty && setIsEmpty(false)
        }
    }, [])


    useEffect(() => {
        document.addEventListener(ALERT_EVENT_NAME, onNewAlert as any)
        return () => document.removeEventListener(ALERT_EVENT_NAME, onNewAlert as any)
    }, [])


    function handleRemoveAlert(e:  React.AnimationEvent<HTMLDivElement>| React.TouchEvent | React.MouseEvent) {
        if (e.type === 'animationend'  && (e.target as HTMLDivElement).classList.contains('alert-item')) {
            (e.target as HTMLDivElement).remove()
            activeAlerts.current = activeAlerts.current > 0 ? activeAlerts.current - 1 : 0
            addAlertToDOM()
        } else if (e.type === 'click' && (e.target as HTMLDivElement).classList.contains('close-svg')) {
            const alertItem = (e.target as HTMLDivElement).closest('.alert-item')
            if (alertItem) {
                alertItem.remove()
                activeAlerts.current = activeAlerts.current > 0 ? activeAlerts.current - 1 : 0
                addAlertToDOM()
            }
        }


    }

    function addAlertToDOM() {
        if (alertsQueue.current.length && ref && ref.current) {
            const extraAlert = alertsQueue.current.shift()

            if (extraAlert) {
                const { type, message} = extraAlert
                activeAlerts.current += 1
                appendAlert(type, message)
            }
            alertsQueue.current.length === 0 && setIsEmpty(true)
        }
    }

    function appendAlert(type: AlertPayloadType['type'], message: AlertPayloadType['message']) {
        const icon_url = `${process.env.PUBLIC_URL}/icons/${type}_icon.png`
        const div = document.createElement('div')
        div.className = clsx('alert-item')
        div.innerHTML = `
            <span class="alert-icon flex-0" style="background-image: url(${icon_url})"></span>
            <span>${message}</span>
            <span class="close-svg" ></span>
        `
        // <span class="alert-line"></span>
        ref.current?.append(div)
    }

    return (
        <div
            ref={ref}
            className='alert-container column-revers gap-1'
            onAnimationEnd={handleRemoveAlert}
            onClick={handleRemoveAlert}
        />
    )
}
