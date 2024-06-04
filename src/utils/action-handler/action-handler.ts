import {Subject} from "rxjs";

import {Action, Context, Expense, Hotel, Limit, Photo, Place, Travel} from "../../core/classes";
import defaultHandleError from "../error-handlers/defaultHandleError";
import {ActionController, ErrorController} from "../../core/service-controllers";
import {ActionDto} from "../../core/classes/dto";
import {Update, UpdateStatusType} from "../../core/classes/Update";
import {StoreName} from "../../types/StoreName";
import {store} from "../../redux";
import {updateTravel} from "../../redux/slices/travel-slice";
import {addExpense, removeExpense} from "../../redux/slices/expenses-slice";
import {addLimit, removeLimit} from "../../redux/slices/limit-slice";
import {addPlace, removePlace} from "../../redux/slices/places-slice";
import {addHotel, removeHotel} from "../../redux/slices/hotel-slice";
import {setUser} from "../../redux/slices/user-slice";


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
        const dispatch = store.dispatch
        try {
            const result = await ActionController.add(context, actionDTO).catch(defaultHandleError)
            if (!result || !result.ok) {
                return
            }

            const action = result.action

            if (!action) return
            actionSubject?.next(action)

            switch (action.entity) {
                case StoreName.TRAVEL:
                    const r = await Update.travel(action)
                    if (r.status === UpdateStatusType.UPDATED && r.result) {
                        travelSubject?.next(r.result)
                        dispatch(updateTravel(r.result))
                    }
                    else if(r.status === UpdateStatusType.DELETED){
                        //delete logic
                    }
                    break


                case StoreName.EXPENSES_ACTUAL:
                case StoreName.EXPENSES_PLAN:
                    const er = await Update.expense(action)
                    if (er.status === UpdateStatusType.UPDATED && er.result) {
                        expenseSubject?.next(er.result)
                        dispatch(addExpense(er.result))
                    }
                    else if(er.status === UpdateStatusType.DELETED){
                        dispatch(removeExpense(action.data))
                    }
                    break


                case StoreName.LIMIT:
                    const lr = await Update.limit(action)
                    if (lr.status === UpdateStatusType.UPDATED && lr.result) {
                        limitSubject?.next(lr.result)
                        dispatch(addLimit(lr.result))
                    }
                    else if(lr.status === UpdateStatusType.DELETED){
                        dispatch(removeLimit(action.data))
                    }
                    break


                case StoreName.PLACE:
                    const pr = await Update.place(action)
                    if (pr.status === UpdateStatusType.UPDATED && pr.result) {
                        placeSubject?.next(pr.result)
                        dispatch(addPlace(pr.result))
                    }
                        else if(pr.status === UpdateStatusType.DELETED){
                            dispatch(removePlace(action.data))
                    }
                    break


                case StoreName.HOTELS:
                    const hr = await Update.hotel(action)
                    if (hr.status === UpdateStatusType.UPDATED && hr.result) {
                        hotelSubject?.next(hr.result)
                        dispatch(addHotel(hr.result))
                    }
                    else if(hr.status === UpdateStatusType.DELETED){
                        dispatch(removeHotel(action.data))
                    }
                    break


                case StoreName.Photo:
                    const phr = await Update.photo(action)
                    if (phr.status === UpdateStatusType.UPDATED && phr.result) {
                        photoSubject?.next(phr.result)
                    }
                    break

                case StoreName.USERS:
                    const ur = await Update.user(action)
                    if(ur.status === UpdateStatusType.UPDATED && ur.result){
                        dispatch(setUser(ur.result))
                    } else if(ur.status === UpdateStatusType.ERROR && ur.error){
                        defaultHandleError(ur.error)
                    }
            }

        } catch (e) {
            console.error(e)
            defaultHandleError(e as Error)
        }
    }
}