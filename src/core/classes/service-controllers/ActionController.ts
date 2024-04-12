import {Action} from "../store";

export class ActionController{
    static async create<T extends {}>(expense: Action<T>){
        try {

        }catch (e){
            throw e
        }
    }

    static async read(expenseID:string){
        try {

        }catch (e){
            throw e
        }
    }

    static async readAll(...expenseIDs:string[]){
        try {

        }catch (e){
            throw e
        }
    }

    static async update<T extends {}>(expense:Action<T>){
        try {

        }catch (e){
            throw e
        }
    }

    static async delete<T extends {}>(expense:Action<T>){
        try {

        }catch (e){
            throw e
        }
    }
}