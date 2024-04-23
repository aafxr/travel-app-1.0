import {sendActions} from "../../api/fetch/sendActions";
import {StoreName} from "../../types/StoreName";
import {Action, Context} from "../classes";
import {ActionDto} from "../classes/dto";
import {DB} from "../db/DB";
import {ActionError} from "../errors";

export class ActionService{
    static async create(ctx: Context, action: Action<any>){
        await DB.add(StoreName.ACTION, action)
        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if (result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        }catch (e){
            // throw NetworkError.connectionError()
        }
    }

    static async add(ctx: Context, action : Action<any>){
        try {
            return await DB.add(StoreName.ACTION, action)
        }catch (e){
            console.error(e)
            throw ActionError.actionAlreadyExist()
        }
    }
}