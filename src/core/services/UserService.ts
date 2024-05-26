import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_AUTH} from "../../constants";
import {fetchRemoveUserAuth, fetchUserAuthTg} from "../../api/fetch";
import {Action, Compare, Context, User} from "../classes";
import {UserError} from "../errors";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {DB} from "../db/DB";
import {ActionService} from "./ActionService";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";

const devUser = {
    id: 'dev',
    first_name: 'Иван',
    last_name: 'Алексеев',
    token: process.env.REACT_APP_DEV_TOKEN,
    refresh_token: process.env.REACT_APP_DEV_TOKEN_REFRESH
}

export class UserService{
    static async create(ctx: Context, user: User){
        const ext = await DB.getOne(StoreName.USERS, user.id)
        if(ext) await DB.update(StoreName.USERS, user)
        else await DB.add(StoreName.USERS, user)
        return user
    }

    static async read(ctx: Context, userID:string){
        return await DB.getOne<User>(StoreName.USERS, userID)
    }

    static async update(ctx: Context, user:User){
        const ext = await DB.getOne<User>(StoreName.USERS, user.id)
        if(!ext) return await DB.add(StoreName.USERS, user)

        const dif = Compare.user(ext, user)
        const action = new Action({
            action:ActionType.UPDATE,
            user_id: user.id,
            data:dif,
            entity: StoreName.USERS
        })

        await ActionService.create(ctx, action)
        await DB.update(StoreName.USERS, user)
    }

    static async delete(ctx: Context, user:User){
        const ctx_user = ctx.user
        if(!ctx_user) throw UserError.unauthorized()

        const action = new Action({
            action: ActionType.DELETE,
            user_id: user.id,
            entity: StoreName.USERS,
            data: {id: user.id}
        })

        await ActionService.create(ctx, action)
        await DB.delete(StoreName.USERS, user.id)
        return user
    }

    /**
     * метод получает информацию о пользователе от сервиса telegramAuthWidget и формирует запрос к апи для прохождения
     * процедуры аутентификации. Затем, в случае успешной верификации, сохраняет информацию в бд
     * @param ctx
     * @param tg_authData информацию от telegramAuthWidget
     */
    static async logIn(ctx: Context, tg_authData: TelegramAuthPayloadType){
        const user = await fetchUserAuthTg(tg_authData)
        if (user) {
            await DB.update(StoreName.USERS, user)
            await DB.update(StoreName.STORE, {name: ACCESS_TOKEN, value: user.token})
            await DB.update(StoreName.STORE, {name: REFRESH_TOKEN, value: user.refresh_token})

            await DB.setStoreItem(USER_AUTH, user)
            localStorage.setItem(USER_AUTH, JSON.stringify(user))
        }
        return user
    }

    /**
     * метод удаляет информацию о залогиненом пользователе
     * @param ctx
     * @param user
     */
    static async logOut(ctx: Context, user: User) {
        await fetchRemoveUserAuth(user).catch(defaultHandleError)
        localStorage.removeItem(USER_AUTH)
        await DB.deleteStoreItem(USER_AUTH)
        await DB.delete(StoreName.USERS, user.id)
        await DB.delete(StoreName.STORE, ACCESS_TOKEN)
        await DB.delete(StoreName.STORE, REFRESH_TOKEN)
    }

    /**
     * метод загружает информацию о последнем пользователе, который был авторизован
     */
    static async getLoggedInUser(ctx: Context) {
        if (location.hostname === 'localhost') {
            let dev_user: User | undefined = await DB.getStoreItem(USER_AUTH)
            if (dev_user) {
                dev_user = new User(dev_user)
                return dev_user
            }else{
                dev_user = new User(devUser)
                await DB.setStoreItem<User>(USER_AUTH, dev_user)
                await DB.setStoreItem(ACCESS_TOKEN, dev_user.token)
                await DB.setStoreItem(REFRESH_TOKEN, dev_user.refresh_token)
                const d = await DB.getOne(StoreName.USERS, dev_user.id)
                if(!d) await DB.add(StoreName.USERS, dev_user)
                return dev_user
            }

        }

        const u =  await DB.getStoreItem(USER_AUTH)
        if(u) return new User(u)
    }
}