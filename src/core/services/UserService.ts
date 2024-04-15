import {Context} from "../classes/Context";
import {Action, User} from "../classes/store";
import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";
import {Compare} from "../classes/Compare";
import {ActionType} from "../../types/ActionType";
import {ActionDto} from "../classes/dto";
import {sendActions} from "../../api/fetch/sendActions";
import {NetworkError, UserError} from "../errors";

export class UserService{
    static async create(ctx: Context, user: User){
        const ext = await DB.getOne(StoreName.USERS, user.id)
        if(ext) await DB.update(StoreName.USERS, user)
        else await DB.add(StoreName.USERS, user)
        return user
    }

    static async read(ctx: Context, userID:string){
        return await DB.getOne(StoreName.USERS, userID)
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

        await DB.add(StoreName.ACTION, action)
        await DB.update(StoreName.USERS, user)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        }catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
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

        await DB.add(StoreName.ACTION, action)
        await DB.delete(StoreName.USERS, user.id)

        try{
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        }catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
        return user
    }
}