import {Action, Context} from "../classes";

export class ActionController{
    static async create<T extends {}>(ctx: Context, expense: Action<T>){
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

    static async update<T extends {}>(ctx: Context, expense:Action<T>){
        try {

        }catch (e){
            throw e
        }
    }

    static async delete<T extends {}>(ctx: Context, expense:Action<T>){
        try {

        }catch (e){
            throw e
        }
    }
}