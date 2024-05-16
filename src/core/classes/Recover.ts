import {DB} from "../db/DB";
import {StoreName} from "../../types/StoreName";
import {IndexName} from "../../types/IndexName";
import {PredicateType} from "../../types/Predicate";
import {Action, Expense, Hotel, Limit, Photo, Place, Travel} from "./store";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {ActionType} from "../../types/ActionType";
import {PartialExpense, PartialHotel, PartialLimit, PartialPlace, PartialTravel} from "./store/partial";


/**
 * класс содержит методы для востановления данных после востановления сети и наличия необработанных actions
 */
export class Recover {
    /**
     * метод востановления путешествия после пропадания интернета и наличия необработанных actions
     * @param travelID ид путешествия
     */
    static async travel(travelID: string){
        let t = new Travel({id: travelID})

        const predicate = (a:Action<Partial<Travel>>) => a.entity === StoreName.TRAVEL && a.data.id === travelID

        let actions = await DB.getLocalActions(predicate)

        actions = actions.sort((a, b) => a.datetime.getTime() - b.datetime.getTime())

        actions.forEach(a => {
            const data = a.data
            const keys = Object.keys(data)
            for (const k of keys){
                const key = k as keyof Travel

                if(Array.isArray(data[key])){
                    // @ts-ignore
                    t[key] = Array.from(data[key])
                } else if(data[key] && typeof data[key] === 'object'){
                    // @ts-ignore
                    if(!t[key]) t[key] = {}
                    // @ts-ignore
                    Object.assign(t[key], data[key])
                } else{
                    // @ts-ignore
                    t[key] = data[key]
                }
            }
        })

        return t
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
        let hotelAction = (await cursor.next()).value
        while (hotelAction) {
            if(hotelAction.action === ActionType.DELETE) return
            hotelAction = (await cursor.next()).value
            if (hotelAction) Object.assign(result, hotelAction.data)
        }
        return result
    }


    static async photo(id: string){
        const result = new Photo({id, base64: ''})
        const predicate: PredicateType<Action<Photo>> = (item) => item.entity === StoreName.Photo && item.data.id === id
        const cursor = await DB.openIndexCursor(StoreName.ACTION, IndexName.DATETIME, undefined, "next", predicate)
        let photoAction = (await cursor.next()).value
        while (photoAction) {
            if(photoAction.action === ActionType.DELETE) return
            photoAction = (await cursor.next()).value
            if (photoAction) Object.assign(result, photoAction.data)
        }
        return result
    }

}