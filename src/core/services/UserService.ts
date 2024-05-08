import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import {ACCESS_TOKEN, REFRESH_TOKEN, USER_AUTH} from "../../constants";
import {fetchRemoveUserAuth, fetchUserAuthTg} from "../../api/fetch";
import {Context, Action, User, Compare} from "../classes";
import { UserError} from "../errors";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {PhotoService} from "./PhotoService";
import {DB} from "../db/DB";
import {ActionService} from "./ActionService";

const devUser = {
    id: 'dev',
    first_name: 'Иван',
    last_name: 'Алексеев'
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

        await DB.update(StoreName.USERS, user)

        await ActionService.create(ctx, action)
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

        await DB.delete(StoreName.USERS, user.id)

        await ActionService.create(ctx, action)
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
        localStorage.removeItem(USER_AUTH)
        await DB.delete(StoreName.USERS, user.id)
        await DB.delete(StoreName.STORE, ACCESS_TOKEN)
        await DB.delete(StoreName.STORE, REFRESH_TOKEN)
        await fetchRemoveUserAuth(user)
    }

    /**
     * метод загружает информацию о последнем пользователе, который был авторизован
     */
    static async getLoggedInUser(ctx: Context) {
        if (location.hostname === 'localhost') {
            const dev_user = await DB.getOne<User>(StoreName.USERS, devUser.id)
            if (!dev_user) await DB.add(StoreName.USERS, devUser)
            const user = new User(dev_user || devUser)
            if (user.photo) {
                const pt = await PhotoService.read(ctx, user.photo)
                if (pt) user.photo = pt.id
            }
            return user
        }

        if ('localStorage' in global) {
            try {
                const ls_user = JSON.parse(localStorage.getItem(USER_AUTH) || '')
                if (ls_user) return new User(ls_user)
            } catch (e) {
            }
        }
        return null
    }
}