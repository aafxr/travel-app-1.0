import {Context} from "../Context";
import {Action, Limit} from "../store";
import {ActionType} from "../../../types/ActionType";
import {StoreName} from "../../../types/StoreName";
import {LimitError, NetworkError, UserError} from "../../errors";
import {DB} from "../../db/DB";
import {sendActions} from "../../../api/fetch/sendActions";
import {ActionDto} from "../dto";
import {Compare} from "../Compare";

export class LimitService {
    static async create(ctx: Context, limit: Limit) {
        const user = ctx.user
        if (!user) throw UserError.unauthorized()

        const action = new Action({
            action: ActionType.ADD,
            entity: StoreName.LIMIT,
            data: limit,
            user_id: user.id,
        })

        await DB.add(StoreName.ACTION, action)
        await DB.add(StoreName.LIMIT, limit)
        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if (result.response.ok && result.response.result[action.id]?.ok) {
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    static async read(ctx: Context, limitID: string) {
        const limit =  await DB.getOne<Limit>(StoreName.LIMIT, limitID)
        if (limit) return new Limit(limit)
    }

    static async readAll(ctx: Context, ...limitIDs: string[]) {
        const req = limitIDs.map(id => DB.getOne<Limit>(StoreName.LIMIT, id))
        const limits = await Promise.all(req)
        return limits.filter(l => !!l).map(l => new Limit(l))
    }

    static async update(ctx: Context, limit: Limit) {
        const user = ctx.user
        if(!user) throw UserError.unauthorized()

        const ext = await DB.getOne<Limit>(StoreName.LIMIT, limit.id)
        if(!ext) throw LimitError.updatingLimitNotExist()

        const dif = Compare.limit(ext, limit)
        const action = new Action({
            action: ActionType.UPDATE,
            user_id: user.id,
            entity: StoreName.LIMIT,
            data: dif
        })

        await DB.add(StoreName.ACTION, action)
        await DB.update(StoreName.LIMIT, limit)

        try {
            const dto = new ActionDto(action)
            const result = await  sendActions(dto)
            if(result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        }catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
        return limit
    }

    static async delete(ctx: Context, limit: Limit) {
        const user = ctx.user
        if(!user) throw UserError.unauthorized()

        const ext = await DB.getOne(StoreName.LIMIT, limit.id)
        if(!ext) throw LimitError.deleteLimitNotExist()

        const {id, primary_entity_id} = limit
        const action = new Action({
            action: ActionType.DELETE,
            entity: StoreName.LIMIT,
            user_id: user.id,
            data: { id, primary_entity_id }
        })

        await DB.add(StoreName.LIMIT, action)
        await DB.delete(StoreName.LIMIT, limit.id)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if (result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
        return limit
    }
}