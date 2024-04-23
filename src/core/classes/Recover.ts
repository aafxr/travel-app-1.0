import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";
import {PredicateType} from "../../types/Predicate";
import {Action, Expense, Hotel, Limit, Place, Travel} from "./store";
import {ExpenseDTO, LimitDTO} from "./dto";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {ActionType} from "../../types/ActionType";
import {PartialExpense, PartialHotel, PartialLimit, PartialPlace, PartialTravel} from "./store/partial";

export class Recover {
    static async travel(id: string) {
        const result = new Travel({id})
        const predicate: PredicateType<Action<PartialTravel>> = (item) => item.entity === StoreName.TRAVEL && item.data.id === id
        const cursor = DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let travelAction = (await cursor.next()).value
        while (travelAction) {
            if(travelAction.action ===ActionType.DELETE) return
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
        const predicate: PredicateType<Action<PartialExpense>> = (item) => item.entity === entityType && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let expenseAction = (await cursor.next()).value
        while (expenseAction) {
            if (expenseAction.action === ActionType.DELETE) return
            expenseAction = (await cursor.next()).value
            if (expenseAction) Object.assign(result, expenseAction.data)
        }
        return result
    }

    static async limit(id: string) {
        const result = new Limit({id})
        const predicate: PredicateType<Action<PartialLimit>> = (item) => item.entity === StoreName.LIMIT && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let limitAction = (await cursor.next()).value
        while (limitAction) {
            if(limitAction.action === ActionType.DELETE) return
            limitAction = (await cursor.next()).value
            if (limitAction) Object.assign(result, limitAction.data)
        }
        return result
    }


    static async place(id: string){
        const result = new Place({id})
        const predicate: PredicateType<Action<PartialPlace>> = (item) => item.entity === StoreName.PLACE && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let placeAction = (await cursor.next()).value
        while (placeAction) {
            if(placeAction.action === ActionType.DELETE) return
            placeAction = (await cursor.next()).value
            if (placeAction) Object.assign(result, placeAction.data)
        }
        return result
    }


    static async hotel(id: string){
        const result = new Hotel({id})
        const predicate: PredicateType<Action<PartialHotel>> = (item) => item.entity === StoreName.HOTELS && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let HotelAction = (await cursor.next()).value
        while (HotelAction) {
            if(HotelAction.action === ActionType.DELETE) return
            HotelAction = (await cursor.next()).value
            if (HotelAction) Object.assign(result, HotelAction.data)
        }
        return result
    }

}