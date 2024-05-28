import axios, {AxiosInstance} from 'axios'

import defaultHandleError from "../utils/error-handlers/defaultHandleError";
import {APIResponseType} from "../api/fetch/types/APIResponseType";
import {USER_AUTH} from "../constants";
import {User} from "../core/classes";
import sleep from "../utils/sleep";
import {DB} from "../core/db/DB";


interface AxiosInstanceWithFlag extends AxiosInstance {
    refresh: boolean
}


const baseURL = process.env.REACT_APP_SERVER_URL
let refresh  = false


const aFetch = axios.create({
    baseURL,
    timeout: 3000,
}) as AxiosInstanceWithFlag;


aFetch.interceptors.request.use(async (config) => {
    const user = await DB.getStoreItem<User>(USER_AUTH)
    config.headers.authorization = `Bearer ${user?.token || ''}`
    return config
}, e => Promise.reject(e))


aFetch.interceptors.response.use(r => r, async (err) => {
    const originalRequest = err.config
    while (refresh) await sleep(300)
    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        refresh = true

        try {
            const u = await DB.getStoreItem<User>(USER_AUTH)
            if (u) {
                const {refresh_token} = u
                const response = await axios.post<APIResponseType<User>>(baseURL + '/user/auth/refresh/', {refresh_token}, {
                    headers: {authorization: `Bearer ${refresh_token}`}
                })
                if (response.status === 200 && response.data.ok) {
                    const {data: userAuth} = response.data
                    u.token = userAuth.token
                    u.refresh_token = userAuth.refresh_token
                    await axios.get(baseURL + '/user/auth/refresh/confirm/', {
                        headers: {authorization: `Bearer ${u.refresh_token}`}
                    })
                    await DB.setStoreItem(USER_AUTH, u)
                }
                return aFetch(originalRequest)
            }
        } catch (e) {
            DB.deleteStoreItem(USER_AUTH).catch(defaultHandleError)
        } finally {
            refresh = false
        }
    }
    return Promise.reject(err)
})

export default aFetch
