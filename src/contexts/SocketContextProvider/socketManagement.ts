//  'travel:join'
//  'travel:leave'
//  'travel:action'
//  'travel:message'
//  'disconnect'


import {Socket} from "socket.io-client";
import {StoreName} from "../../types/StoreName";
import {Action, Context, Expense, Limit, Recover, Travel} from "../../core/classes";
import {DB} from "../../core/db/DB";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";

export default function socketManagement(context: Context) {

    async function newTravelAction(this: Socket, msg: Action<Travel>) {
        const user = context.user
        if (!user) return

        msg.datetime = new Date(msg.datetime )
        if(msg.data.date_start) msg.data.date_start = new Date(msg.data.date_start)
        if(msg.data.date_end) msg.data.date_end = new Date(msg.data.date_end)
        if(msg.data.updated_at) msg.data.updated_at = new Date(msg.data.updated_at)
        if(msg.data.created_at) msg.data.created_at = new Date(msg.data.created_at)

        try {
            await DB.add(StoreName.ACTION, msg)
        }catch (e){}

        const travelID = msg.data.id
        const travel = await Recover.travel(travelID)
        await DB.update(StoreName.TRAVEL, travel)
        if (travel) context.setTravel(travel)
    }


    function newTravelMessage(this: Socket, msg: any) {
        console.log(msg)
    }


    async function newExpenseAction(this: Socket, msg: Action<Partial<Expense>>) {
        const user = context.user
        if (!user) return

        msg.datetime = new Date(msg.datetime )
        if(msg.data.datetime) msg.data.datetime = new Date(msg.data.datetime)
        if(msg.data.created_at) msg.data.created_at = new Date(msg.data.created_at)

        const eID = msg.data.id
        if(!eID) return
        try {
            await DB.add(StoreName.ACTION, msg)
        }catch (e){}
        const expense = await Recover.expense(eID, msg.entity as ExpenseVariantType)

        if (expense) await DB.update(StoreName.EXPENSE, expense)

        return expense
    }


    async function newLimitAction(this: Socket, msg: Action<Partial<Limit>>) {
        const user = context.user
        if (!user) return

        msg.datetime = new Date(msg.datetime )

        try {
            await DB.add(StoreName.ACTION, msg)
        } catch (e) {}

        const primary_entity_id = msg.data.primary_entity_id
        const limitID = msg.data.id
        if(!limitID) return
        if (primary_entity_id) {
            const limit = await Recover.limit(limitID)
            if (limit) await DB.update(StoreName.LIMIT, limit)
            return limit
        }
    }

    return {
        newTravelAction,
        newTravelMessage,
        newExpenseAction,
        newLimitAction
    }
}