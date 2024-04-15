import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import aFetch from "../../axios";
import {APIResponseType} from "./types/APIResponseType";
import {APIUserType} from "../../types/APIUserType";
import {User} from "../../core/classes";

export async function fetchUserAuthTg(authPayload: TelegramAuthPayloadType){
    const response = await aFetch.post<APIResponseType<APIUserType>>('/user/auth/tg/', authPayload)
    if(response.data.ok){
        return new User(response.data.data)
    }
}