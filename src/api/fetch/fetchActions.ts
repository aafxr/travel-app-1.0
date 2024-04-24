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
        const actions = result.data
        // actions.forEach(a => {
        //     Object.keys(a.data)
        //         .forEach(key => {
        //             if(key.includes('date') || dateKeys.includes(key)){
        //                 // @ts-ignore
        //                 a.data[key] = new Date(a.data[key])
        //             }
        //         })
        // })
        return actions
    } else {
        return []
    }
}