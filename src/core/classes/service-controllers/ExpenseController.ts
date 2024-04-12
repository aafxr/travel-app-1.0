import {Expense} from "../store";
import {Context} from "../Context";

export class ExpenseController{
    static async create(ctx: Context, expense: Expense){
        try {

        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, expenseID:string){
        try {

        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...expenseIDs:string[]){
        try {

        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, expense:Expense){
        try {

        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, expense:Expense){
        try {

        }catch (e){
            throw e
        }
    }
}