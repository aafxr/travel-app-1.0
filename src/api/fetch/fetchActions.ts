import aFetch from "../../axios";
import {ActionDto} from "../../core/classes/dto";

type ResponseType = {
    ok:boolean
    data?: ActionDto[]
    message?: string
}

// const dateKeys = ['created_at', 'updated_at']

export async function fetchActions(time_ms:number){
    const result = (await aFetch.post<ResponseType>('/actions/get/', {time: time_ms})).data
    if(result.ok && result.data){
        return result.data
    } else {
        return []
    }
}