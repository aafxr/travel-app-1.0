import aFetch from "../../axios";

export async function fetchPlaceByID(placeID: string){
    return (await aFetch.post<any>('/places/getByID/', {id: placeID})).data

}