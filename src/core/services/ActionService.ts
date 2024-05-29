import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {sendActions} from "../../api/fetch/sendActions";
import {PredicateType} from "../../types/Predicate";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";
import {fetchActions} from "../../api/fetch";
import {Action, Context} from "../classes";
import {ActionDto} from "../classes/dto";
import {ActionError} from "../errors";
import {DB} from "../db/DB";

export class ActionService {
    static async create(ctx: Context, action: Action<any>) {
        await DB.add(StoreName.ACTION, action)
        const dto = new ActionDto(action)
        sendActions(dto)
            .then(async (result) => {
                if (!result.response.ok || !result.response.result[action.id]?.ok) return
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            })
            .catch(defaultHandleError)
    }

    static async add(ctx: Context, action: Action<any>) {
        try {
            return await DB.add(StoreName.ACTION, action)
        } catch (e) {
            console.error(e, action)
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


    static async loadActionsFromTimestamp(ctx: Context, time_ms: number) {
        const actionDtoList = await fetchActions(time_ms)
        for (const dto of actionDtoList) {
            const action = new Action(dto)
            try {
                await DB.add(StoreName.ACTION, action)
            } catch (e) {
            }
        }
    }


    static async sendAnsyncedActions(ctx: Context, count: number = 50){
        let actions = await DB.getManyFromIndex<Action<any>>(StoreName.ACTION, "synced", 0, count)
        while (actions.length) {
            const dto = actions.map(a => new ActionDto(a))
            const res = await sendActions(...dto)
            if (res.response.ok){
                const result = res.response.result
                actions.forEach(a => result[a.id]?.ok && (a.synced = 1))
                await Promise.all(
                    actions.map(a => a.synced
                        ? DB.update(StoreName.ACTION, a)
                        : DB.delete(StoreName.ACTION, a.id)
                    )
                )
            }
        }
    }
}