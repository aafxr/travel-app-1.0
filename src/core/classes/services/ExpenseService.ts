import {Context} from "../Context";
import {Action, Expense} from "../store";
import {ActionType} from "../../../types/ActionType";
import {ExpenseError, NetworkError, UserError} from "../../errors";
import {DB} from "../../db/DB";
import {StoreName} from "../../../types/StoreName";
import {ActionDto} from "../dto";
import {sendActions} from "../../../api/fetch/sendActions";
import {Compare} from "../Compare";

export class ExpenseService{
    static async create(ctx: Context, expense: Expense){
        const user = ctx.user
        if(!user) throw UserError.unauthorized()

        const action = new Action({
            action:ActionType.ADD,
            entity: expense.variant,
            user_id: user.id,
            data: expense
        })
        await DB.add(StoreName.ACTION, action)
        await DB.add(StoreName.EXPENSE, expense)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if (result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        }catch (e){
            throw NetworkError.connectionError()
        }

    }

    static async read(ctx: Context, expenseID:string){
        return await DB.getOne<Expense>(StoreName.EXPENSE, expenseID)
    }

    static async readAll(ctx: Context, ...expenseIDs:string[]){
        const req = expenseIDs.map(e => DB.getOne<Expense>(StoreName.EXPENSE, e))
        const expenses = await Promise.all(req)
        return expenses.filter(e => !!e ).map(e => new Expense(e))
    }

    static async update(ctx: Context, expense:Expense){
        const user = ctx.user
        if(!user) throw UserError.unauthorized()

        const ext = await DB.getOne<Expense>(StoreName.EXPENSE, expense.id)
        if(!ext) throw ExpenseError.updateExpenseNotExist()

        const dif = Compare.expense(ext, expense)
        const action = new Action({
            action:ActionType.UPDATE,
            entity: expense.variant,
            user_id: user.id,
            data: dif,
        })

        await DB.add(StoreName.ACTION, action)
        await DB.update(StoreName.EXPENSE, expense)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
        return expense
    }

    static async delete(ctx: Context, expense:Expense){
        const user = ctx.user
        if(!user) throw UserError.unauthorized()

        const ext = await DB.getOne<Expense>(StoreName.EXPENSE, expense.id)
        if(!ext) throw ExpenseError.deleteExpenseNotExist()

        const {id, primary_entity_id} = expense
        const action = new Action({
            action:ActionType.DELETE,
            entity: expense.variant,
            user_id: user.id,
            data: {id, primary_entity_id},
        })

        await DB.add(StoreName.ACTION, action)
        await DB.delete(StoreName.EXPENSE, expense.id)

        try{
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            console.error(e)
            throw NetworkError.connectionError()
        }
    }
}