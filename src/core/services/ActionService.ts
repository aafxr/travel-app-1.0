import {sendActions} from "../../api/fetch/sendActions";
import {StoreName} from "../../types/StoreName";
import {Action, Context} from "../classes";
import {ActionDto} from "../classes/dto";
import {DB} from "../db/DB";
import {ActionError} from "../errors";
import {IndexName} from "../../types/IndexName";
import {PredicateType} from "../../types/Predicate";
import {fetchActions} from "../../api/fetch";

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


    /**
     * методпозволяет полусить время последнего action хранимого в локальной бд
     */
    static async getLastActionTime() {
        const predicate: PredicateType<Action<any>> = item => item.synced === 1
        const cursor = await DB.openIndexCursor<Action<any>>(StoreName.ACTION, IndexName.DATETIME, IDBKeyRange.upperBound(new Date()), "prev", predicate)
        const action = (await cursor.next()).value
        if (action) return new Date(action.datetime)
        return new Date(0)
    }


    static async loadActionsFromTimestamp(ctx:Context, time_ms: number){
        const actionDtoList = await fetchActions(time_ms)
         for (const dto of actionDtoList){
             const action = new Action(dto)
             try{
                 await DB.add(StoreName.ACTION, action)
             }catch (e){}
         }
    }
}