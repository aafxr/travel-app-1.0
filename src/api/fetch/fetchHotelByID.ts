import aFetch from "../../axios";
import {Hotel} from "../../core/classes";

type FetchHotelByIDResponseType = {
    data: Hotel
    ok: boolean
    request: Record<string, any>
}


export async function fetchHotelByID(hotelID: string){
    return (await aFetch.post<FetchHotelByIDResponseType>('/places/getByID/', {id: hotelID})).data

}