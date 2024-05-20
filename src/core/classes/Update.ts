import {Action, Expense, Photo, Travel} from "./store";
import {PartialExpense, PartialHotel, PartialLimit, PartialPlace, PartialTravel} from "./store/partial";
import {StoreName} from "../../types/StoreName";
import {DB} from "../db/DB";
import {Recover} from "./Recover";
import {ActionType} from "../../types/ActionType";
import {ActionError} from "../errors";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";

/**
 * ### важно перед использование класса созранить action в бд
 * ---
 *
 * если класс возвращает обект -> запиь в бд обновлени и можно отправлять сущность в поток
 */
export class Update{
    /**
     * обновляет запись в бд о путешествии по имеющемся actions
     * - если были произведены обновления метод вернет обновленную сущность
     * @param action - новый эктион с измененными полями в travel
     */
    static async travel(action: Action<PartialTravel>){
        if (action.entity !== StoreName.TRAVEL) ActionError.tryToUpdateEntityByWrongAction(StoreName.TRAVEL, action)

        if(action.action === ActionType.ADD){
            try {
                const travel = new Travel(action.data)
                await DB.add(StoreName.TRAVEL, travel)
                return travel
            }catch(e){
                return
            }
        }

        const id = action.data.id
        if(!id) return

        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, id)
        if(!travel) {
            travel = await Recover.travel(id)
            travel && await DB.update(StoreName.TRAVEL, travel)
            return travel
        }


        if(travel.updated_at.getTime() < action.datetime.getTime()){
            Object.keys(action.data)
                .forEach(k => {
                    // @ts-ignore
                    if(action.data[k] !== undefined) travel[k] = action.data[k]
                })
            await DB.update(StoreName.TRAVEL, travel)
            return new Travel(travel)
        }

        travel = await Recover.travel(id)
        if(travel) {
            await DB.update(StoreName.TRAVEL, travel)
            return travel
        }
    }



    static async expense(action: Action<PartialExpense>){
        if (!action.entity.includes('expense')) ActionError.tryToUpdateEntityByWrongAction('expense', action)

        const id = action.data.id
        if(!id) return

        if(action.action === ActionType.ADD){
            const expense = await Recover.expense(id, action.entity as ExpenseVariantType)
            if(expense) {
                await DB.update(StoreName.EXPENSE, expense)
                return expense
            }
        }else if(action.action === ActionType.DELETE){
            const expense = await DB.getOne<Expense>(StoreName.EXPENSE, id)
            if(!expense) return
            await DB.delete(StoreName.EXPENSE, id)
            expense.deleted = true
            return expense
        }
    }




    static async limit(action: Action<PartialLimit>){
        if (action.entity !== StoreName.LIMIT) ActionError.tryToUpdateEntityByWrongAction(StoreName.LIMIT, action)

        const id = action.data.id
        if(!id) return

        let limit = await Recover.limit(id)
        if(limit) await DB.update(StoreName.LIMIT, limit)
        return limit
    }


    static async place(action: Action<PartialPlace>){
        if (action.entity !== StoreName.PLACE) ActionError.tryToUpdateEntityByWrongAction(StoreName.PLACE, action)

        const id = action.data.id
        if(!id) return

        let place = await Recover.place(id)
        if(place) await DB.update(StoreName.PLACE, place)
        return place
    }


    static async hotel(action: Action<PartialHotel>){
        if (action.entity !== StoreName.HOTELS) ActionError.tryToUpdateEntityByWrongAction(StoreName.HOTELS, action)

        const id = action.data.id
        if(!id) return

        let hotel = await Recover.hotel(id)
        if(hotel) await DB.update(StoreName.HOTELS, hotel)
        return hotel
    }



    static async photo(action: Action<Photo>){
        if (action.entity !== StoreName.Photo) ActionError.tryToUpdateEntityByWrongAction(StoreName.Photo, action)

        const id = action.data.id
        if(!id) return

        const photo = await Recover.photo(id)
        if(photo) await DB.update(StoreName.Photo, photo)
        return photo
    }
}