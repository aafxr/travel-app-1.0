import {Action, Compare, Context, Expense} from "../classes";
import {ActionType} from "../../types/ActionType";
import {ExpenseError, UserError} from "../errors";
import {StoreName} from "../../types/StoreName";
import {ActionService} from "./ActionService";
import {DB} from "../db/DB";
import {IndexName} from "../../types/IndexName";

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

        await ActionService.create(ctx, action)
        await DB.add(StoreName.EXPENSE, expense)
        return expense
    }

    static async read(ctx: Context, expenseID:string){
        return await DB.getOne<Expense>(StoreName.EXPENSE, expenseID)
    }

    static async readAll(ctx: Context, ...expenseIDs:string[]){
        const req = expenseIDs.map(e => DB.getOne<Expense>(StoreName.EXPENSE, e))
        const expenses = await Promise.all(req)
        return expenses.filter(e => !!e ).map(e => new Expense(e))
    }

    static async readByTravelID(context: Context, travelID:string){
        const expenses = await DB.getManyFromIndex<Expense>(StoreName.EXPENSE, IndexName.PRIMARY_ENTITY_ID, travelID)
        return expenses.map(e => new Expense(e))
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

        await ActionService.create(ctx, action)
        await DB.update(StoreName.EXPENSE, expense)
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

        await ActionService.create(ctx, action)
        await DB.delete(StoreName.EXPENSE, expense.id)
        return expense
    }
}