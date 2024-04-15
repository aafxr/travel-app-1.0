import aFetch from "../../axios";
import {APIPLaceType} from "../../types/APIPLaceType";

export  async function fetchPlaces(text: string): Promise<APIPLaceType[]>{
    const response = (await aFetch.post('/places/getList/', {text})).data
    if (response.ok && Array.isArray(response.data))return response.data
    return []
}