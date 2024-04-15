import {Expense} from "../classes/store";
import {Context} from "../classes/Context";
import {ExpenseService} from "../services";
import {CustomError} from "../errors/CustomError";
import {ErrorCode} from "../errors/ErrorCode";

export class ExpenseController{
    static async create(ctx: Context, expense: Expense){
        try {
            return await ExpenseService.create(ctx, expense)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, expenseID:string){
        try {
            return await ExpenseService.read(ctx, expenseID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...expenseIDs:string[]){
        try {
            return await ExpenseService.readAll(ctx, ...expenseIDs)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, expense:Expense){
        try {
            return await ExpenseService.update(ctx, expense)
        }catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.UPDATE_EXPENSE_NOT_EXIST){
                return await ExpenseController.create(ctx, expense)
            }
            throw e
        }
    }

    static async delete(ctx: Context, expense:Expense){
        try {
            return await ExpenseService.delete(ctx, expense)
        }catch (e){
            throw e
        }
    }
}