import aFetch from "../../axios";
import {APIResponseType} from "./types/APIResponseType";


export type APISessionResponseType = {
    uid: string
    active: boolean
    created_user_agent: string
    created_ip: string
    created_at: string
    created_location: string
    updated_ip: string
    updated_at: string
    update_location: string
}

export type SessionType = Omit<APISessionResponseType, 'created_at' | 'updated_at'> & {
    created_at: Date
    updated_at: Date
}


/**
 * получение активных сессий пользователя
 * @param refresh_token
 */
export async function fetchSessionList(refresh_token: string): Promise<SessionType[] | undefined>{
    const res = await aFetch.post<APIResponseType<APISessionResponseType[]>>('/user/auth/getList/', {refresh_token})
    if(res.status === 200 && res.data.ok){
        const data = res.data.data
        return data.map(s => ({
            ...s,
            created_at: new Date(s.created_at),
            updated_at: new Date(s.updated_at),
            id:s.uid
        }))
    }
}