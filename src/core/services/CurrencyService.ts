import {DB} from "../db/DB";
import {Context} from "../classes";
import {StoreName} from "../../types/StoreName";
import {Currency} from "../classes/store/Currency";

export class CurrencyService {
    static async create(ctx: Context, c: Currency) {
        await DB.update<Currency>(StoreName.CURRENCY, c)
        return c
    }


    static async read(ctx: Context, date: Date) {
        const val = await DB.getOne<Currency>(StoreName.CURRENCY, date)
        if(val) return new Currency(val)
    }


    static async readByRange(ctx: Context, from: Date, to: Date) {
        const val = await DB.getMany<Currency>(StoreName.CURRENCY, IDBKeyRange.bound(from, to))
        return val.map(c => new Currency(c))
    }
}