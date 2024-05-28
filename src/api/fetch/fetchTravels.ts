import aFetch from "../../axios";
import {Travel} from "../../core/classes";

type GetListResponseType = {
    ok: boolean
    data: Travel[]
    message?: string
}

export async function fetchTravels(): Promise<Travel[]> {
    const request = (await aFetch.get<GetListResponseType>('/travel/getList/')).data
    let travels: Travel[] = request.ok ? request.data : []
    travels = travels.map(t => new Travel(t))
    return travels
}