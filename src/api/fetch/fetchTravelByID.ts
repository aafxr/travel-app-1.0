import aFetch from "../../axios";
import {Travel} from "../../core/classes";

type FetchTravelResponseType = {
    ok: boolean
    data: Travel
    message?: string
}

export async function fetchTravelByID(id:string){
    const response = await aFetch.post<FetchTravelResponseType>('/travel/getByID/', {id})
    return response.data

}