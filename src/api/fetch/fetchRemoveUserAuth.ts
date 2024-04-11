import {REFRESH_TOKEN} from "../../constants";
import {User} from "../../core/classes";
import aFetch from "../../axios";

export async function fetchRemoveUserAuth(user:User){
    await aFetch.post('/user/auth/remove/', {
        [REFRESH_TOKEN]: user.refresh_token
    })
}