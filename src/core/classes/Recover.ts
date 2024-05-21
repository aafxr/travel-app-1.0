import {Action, Expense, Hotel, Limit, Photo, Place, Travel} from "./store";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {PartialExpense, PartialLimit} from "./store/partial";
import {PredicateType} from "../../types/Predicate";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {DB} from "../db/DB";
import {assign} from "../../utils/assign";


/**
 * класс содержит методы для востановления данных после востановления сети и наличия необработанных actions
 */
export class Recover {
    /**
     * метод востановления путешествия после пропадания интернета и наличия необработанных actions
     * @param id ид путешествия
     */
    static async travel(id: string) {
        let t = new Travel({id: id})
        const predicate = (a: Action<PartialExpense>) => a.entity === StoreName.TRAVEL && a.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, t)
    }

    static async expense(id: string, entityType: ExpenseVariantType) {
        const e = new Expense({id: id, variant: entityType})
        const predicate = (a: Action<PartialExpense>) => a.entity === StoreName.EXPENSE && a.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, e)
    }

    static async limit(id: string) {
        const l = new Limit({id})
        const predicate: PredicateType<Action<PartialLimit>> = (item) => item.entity === StoreName.LIMIT && item.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, l)
    }


    static async place(id: string) {
        const p = new Place({id})
        const predicate: PredicateType<Action<PartialLimit>> = (item) => item.entity === StoreName.PLACE && item.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, p)
    }


    static async hotel(id: string) {
        const h = new Hotel({id})
        const predicate: PredicateType<Action<PartialLimit>> = (item) => item.entity === StoreName.HOTELS && item.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, h)
    }


    static async photo(id: string) {
        const p = new Photo({id, base64: ''})
        const predicate: PredicateType<Action<PartialLimit>> = (item) => item.entity === StoreName.Photo && item.data.id === id
        let actions = await DB.getLocalActions(predicate)
        return Recover._recordFieldsToTarget(actions, p)
    }

    static _recordFieldsToTarget<T extends Record<string, any>>(actions: Action<Partial<T>>[], target: T): T | undefined {
        const _actions = actions.sort((a, b) => a.datetime.getTime() - b.datetime.getTime())

        for (const a of _actions) {
            if (a.action === ActionType.DELETE) return
            const data = a.data
            let keys = Object.keys(data) as Array<keyof T>
            keys = keys.filter(k => data[k] !== undefined)
            for (const k of keys) {
                const key = k as keyof T
                if (Array.isArray(data[key])) {
                    // @ts-ignore
                    target[key] = Array.from(data[key])
                } else if (data[key] !== undefined && typeof data[key] === 'object') {
                    // @ts-ignore
                    if (!target[key]) target[key] = {}
                    assign(target[key], data[key]!)
                } else {
                    // @ts-ignore
                    target[key] = data[key]
                }
            }
        }
        return target
    }

}