import {useEffect, useState} from "react";

import {actionHandler} from "../../utils/action-handler/action-handler";
import {ActionController} from "../../core/service-controllers";
import {useAppContext} from "../../contexts/AppContextProvider";
import {fetchActions} from "../../api/fetch";
import {
    useActionSubject,
    useExpenseSubject,
    useHotelSubject,
    useLimitSubject,
    usePhotoSubject,
    usePlaceSubject,
    useTravelSubject
} from "../../contexts/SubjectContextProvider";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";


/**
 * компонент отслеживает состояние устройства online/offline и путается загрузить actions сервера при
 * востановление соединения
 * @constructor
 */
export function LoadActionsComponent(){
    const context = useAppContext()

    const actionSubject = useActionSubject()
    const travelSubject = useTravelSubject()
    const expenseSubject = useExpenseSubject()
    const limitSubject = useLimitSubject()
    const placeSubject = usePlaceSubject()
    const hotelSubject = useHotelSubject()
    const photoSubject = usePhotoSubject()

    const [online, setOnline] = useState(false)



    useEffect(() => {
        const onAction = actionHandler({
            context,
            actionSubject,
            travelSubject,
            expenseSubject,
            limitSubject,
            placeSubject,
            hotelSubject,
            photoSubject,
        })


        async function handleOnline(){
            if(!online) setOnline(true)
            else return

            const time = await ActionController.getLastActionTime()
            const actions = await fetchActions(time.getTime())
            actions.forEach(onAction)
        }

        const  handleOffline = () => online && setOnline(false)


        handleOnline().catch(defaultHandleError)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, []);

    return <></>
}