import aFetch from "../../axios";
import {Travel} from "../../core/classes";
import {TravelDTO} from "../../core/classes/dto";
import {AxiosResponse} from "axios";

type ResponseSendTravelType = {
    ok:boolean
    request: Record<string, any>
    message: string
}

/**
 * send new travel to api
 * @param travel
 */
export async function sendNewTravel(travel: Travel){
    debugger
    const response = await aFetch.post<AxiosResponse<ResponseSendTravelType>>('/travel/add/', [new TravelDTO(travel)])
    if(response.statusText === 'ok') {
        return response.data.data
    }
    else {
        return {
            ok: false,
            request: travel,
            message: response.data.data?.message || response.statusText
        }
    }
}