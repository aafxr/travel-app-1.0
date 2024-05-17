import aFetch from "../../axios";
import {Travel} from "../../core/classes";
import {TravelDTO} from "../../core/classes/dto";

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
    const response = await aFetch.post<ResponseSendTravelType>('/travel/add/', [new TravelDTO(travel)])
    if(response.data.ok) {
        return response.data
    }
    else {
        return {
            ok: false,
            request: travel,
            message: response.data?.message || response.statusText
        }
    }
}