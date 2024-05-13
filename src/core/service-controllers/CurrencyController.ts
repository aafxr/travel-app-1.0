import {Context} from "../classes";
import {Currency} from "../classes/store/Currency";
import {CurrencyService} from "../services/CurrencyService";

export class CurrencyController{
    static async create(ctx: Context, c: Currency){
        try {
            return await CurrencyService.create(ctx, c)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, date: Date){
        try {
            return await  CurrencyService.read(ctx, date)
        }catch (e){
            throw e
        }
    }

    static async readByRange(ctx: Context, from: Date, to: Date){
        try {
            return await  CurrencyService.readByRange(ctx, from, to)
        }catch (e){
            throw e
        }
    }
}