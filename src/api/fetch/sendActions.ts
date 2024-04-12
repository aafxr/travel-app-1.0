import aFetch from "../../axios";
import {ActionDto} from "../../core/classes/dto";


type APISendActionResponseType = {
    [id: string]: { id: string, ok: boolean }
}

type APIResponseType = {
    ok: boolean,
    result: APISendActionResponseType
}


/**
 * меотд преобразует поля actions типа Date в ISOString и отправляет их на сервер
 * @param actions - action dto
 */
export async function sendActions(...actions: ActionDto[]) {
    const {data: response, status} = await aFetch.post<APIResponseType>('/actions/add/', actions)

    return {response, status}
}