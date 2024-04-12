import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";
import {PredicateType} from "../../types/Predicate";
import {Action, Expense, Limit, Travel} from "./store";
import {ExpenseDTO, LimitDTO, TravelDTO} from "./dto";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";

export class Recover {
    static async travel(id: string) {
        const result = new Travel({id})
        const predicate: PredicateType<Action<TravelDTO>> = (item) => item.entity === StoreName.TRAVEL && item.data.id === id
        const cursor = DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let travelAction = (await cursor.next()).value
        while (travelAction) {
            travelAction = (await cursor.next()).value
            if (travelAction) {
                const t = new Travel(travelAction.data)
                const keys = Object.keys(t) as Array<keyof Travel>
                for (const key of keys){
                    if (typeof t[key] === 'object') Object.assign(result[key]!, t[key])
                    else {
                        // @ts-ignore
                        result[key] = t[key]
                    }

                }
            }
        }
        return result
    }

    static async expense(id: string, entityType: ExpenseVariantType) {
        const result = new Expense({id, variant: entityType})
        const predicate: PredicateType<Action<ExpenseDTO>> = (item) => item.entity === entityType && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let expenseAction = (await cursor.next()).value
        while (expenseAction) {
            expenseAction = (await cursor.next()).value
            if (expenseAction) Object.assign(result, expenseAction.data)
        }
        return result
    }

    static async limit(id: string) {
        const result = new Limit({id})
        const predicate: PredicateType<Action<LimitDTO>> = (item) => item.entity === StoreName.LIMIT && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let limitAction = (await cursor.next()).value
        while (limitAction) {
            limitAction = (await cursor.next()).value
            if (limitAction) Object.assign(result, limitAction.data)
        }
        return result
    }

}