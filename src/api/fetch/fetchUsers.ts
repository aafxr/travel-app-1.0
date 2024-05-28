import aFetch from "../../axios";
import {APIUserType} from "../../types/APIUserType";

type APIUsersResultType = {
    ok: boolean,
    data: APIUserType[]
}

export async function fetchUsers(ids: string[]) {
    if (!ids.length) return []
    const response: APIUsersResultType | undefined = (await aFetch.post('/user/getList/', {data: ids})).data
    if (response && response.ok) return response.data
    else return []
}