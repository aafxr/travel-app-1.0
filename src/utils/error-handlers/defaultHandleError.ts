import {CustomError} from "../../core/errors/CustomError";
import {pushAlertMessage} from "../../components/Alerts";
import {removeUser} from "../../redux/slices/user-slice";
import {StoreName} from "../../types/StoreName";
import {DB} from "../../core/db/DB";
import {store} from "../../redux";
import {AxiosError} from "axios";

export type LogErrorType = {time: Date, error: string | Record<string, any>}


let dispatch: Function | undefined

if(window){
    dispatch = store.dispatch
}


function saveErrorToDB(e: Error | string) {
    let item: LogErrorType | undefined
    if(typeof e === "string"){
        item = {time: new Date(), error: e}
    } else if(e && typeof e === "object"){
        item = {time: new Date(), error: e}
    }
    if(item){
        DB.add(StoreName.ERRORS, item).catch(console.error)
    }
}


/**
 * отправка сообщения об ошибке
 * @function
 * @name defaultHandleError
 * @param {Error} err ошибка, отправляется на сервер
 * @param {string} [message] сообщение будет выводиться вместо дефлтного
 * @category Utils
 */
export default function defaultHandleError(err: Error, message?: string) {
    if (err.message.match(/Failed to fetch/i)) {
        pushAlertMessage({type: "info", message: 'Проверьте подключение к интернету'})
        return
    } else {
        // ErrorReport.sendError(err).catch(console.error)
        pushAlertMessage({type: "info", message: message || err.message})
    }


    if(err instanceof AxiosError){
        if(err.response?.status === 401 || err.status === 401){
            if(location.hostname !== 'localhost') dispatch?.(removeUser())
        }
    }


    if(err instanceof CustomError){
        /* обработка кастомных ошибок */
    }


    saveErrorToDB(err)
    console.error(err)
}
