import aFetch from "../../axios";
import {Place} from "../../core/classes/store/Place";

type FetchPlaceByIDResponseType = {
    data: Place
    ok: boolean
    request: Record<string, any>
}


export async function fetchPlaceByID(placeID: string){
    return (await aFetch.post<FetchPlaceByIDResponseType>('/places/getByID/', {id: placeID})).data

}