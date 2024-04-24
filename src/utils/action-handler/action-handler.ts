import {Subject} from "rxjs";

import {Action, Context, Expense, Hotel, Limit, Photo, Place, Travel} from "../../core/classes";
import defaultHandleError from "../error-handlers/defaultHandleError";
import {ActionController} from "../../core/service-controllers";
import {ActionDto} from "../../core/classes/dto";
import {Update} from "../../core/classes/Update";
import {StoreName} from "../../types/StoreName";


export type ActionHandlerOptionsType = {
    context: Context
    travelSubject?: Subject<Travel>
    expenseSubject?: Subject<Expense>
    limitSubject?: Subject<Limit>
    placeSubject?: Subject<Place>
    hotelSubject?: Subject<Hotel>
    photoSubject?: Subject<Photo>
    actionSubject?: Subject<Action<any>>
}


export function actionHandler({
                                  context,
                                  travelSubject,
                                  expenseSubject,
                                  limitSubject,
                                  placeSubject,
                                  hotelSubject,
                                  photoSubject,
                                  actionSubject
                              }: ActionHandlerOptionsType) {

    return async (actionDTO: ActionDto) => {
        console.log(actionDTO, typeof actionDTO)
        try {
            const result = await ActionController.add(context, actionDTO)
            if (!result.ok) {
                console.log(result)
                return
            }

            const action = result.action
            if (!action) return

            actionSubject?.next(action)

            switch (action.entity) {
                case StoreName.TRAVEL:
                    const travel = await Update.travel(action)
                    if (travel) travelSubject?.next(travel)
                    break

                case StoreName.EXPENSES_ACTUAL:
                case StoreName.EXPENSES_PLAN:
                    const expense = await Update.expense(action)
                    if (expense) expenseSubject?.next(expense)
                    break

                case StoreName.LIMIT:
                    const limit = await Update.limit(action)
                    if (limit) limitSubject?.next(limit)
                    break

                case StoreName.PLACE:
                    const place = await Update.place(action)
                    if (place) placeSubject?.next(place)
                    break

                case StoreName.HOTELS:
                    const hotel = await Update.hotel(action)
                    if (hotel) hotelSubject?.next(hotel)
                    break

                case StoreName.Photo:
                    const photo = await Update.photo(action)
                    if (photo) photoSubject?.next(photo)
                    break
            }

        } catch (e) {
            console.error(e)
            defaultHandleError(e as Error)
        }
    }
}