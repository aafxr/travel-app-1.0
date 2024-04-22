//  'travel:join'
//  'travel:leave'
//  'travel:action'
//  'travel:message'
//  'disconnect'

import {Socket} from "socket.io-client";

import {Action, Context, Expense, Limit, Recover, Travel} from "../../core/classes";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {StoreName} from "../../types/StoreName";
import {DB} from "../../core/db/DB";


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
        context.setTravel(travel)
    }


    function newTravelMessage(this: Socket, msg: any) {
        console.log(msg)
    }


    async function newExpenseAction(this: Socket, action: Action<Partial<Expense>>) {
        const user = context.user
        if (!user) return

        action.datetime = new Date(action.datetime )
        if(action.data.datetime) action.data.datetime = new Date(action.data.datetime)
        if(action.data.created_at) action.data.created_at = new Date(action.data.created_at)

        const e_id = action.data.id
        try {
            await DB.add(StoreName.ACTION, action)
        }catch (e){}
        if (e_id) {
            const expense = await Recover.expense(e_id, action.entity as ExpenseVariantType)
            await DB.update(StoreName.EXPENSE, expense)
            return expense
        }
    }


    async function newLimitAction(this: Socket, msg: Action<Partial<Limit>>) {
        const user = context.user
        if (!user) return

        msg.datetime = new Date(msg.datetime )

        try {
            await DB.add(StoreName.ACTION, msg)
        } catch (e) {}

        const primary_entity_id = msg.data.primary_entity_id
        if (primary_entity_id) {
            const limit = await Recover.limit(primary_entity_id)
            await DB.update(StoreName.LIMIT, limit)
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