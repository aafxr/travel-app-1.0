import {DB} from "../db/DB";
import {Context} from "../classes";
import {StoreName} from "../../types/StoreName";
import {Currency} from "../classes/store/Currency";
import {fetchCurrency} from "../../api/fetch";
import {CurrencyController} from "../service-controllers/CurrencyController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {MS_IN_DAY} from "../../constants";

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
        let val = await DB.getMany<Currency>(StoreName.CURRENCY, IDBKeyRange.bound(from, to))
        const days = Math.floor((to.getTime() - from.getTime() ) / MS_IN_DAY)
        if(!val.length || val.length < days){
            const res = await fetchCurrency(from, to)
            if(res && res.ok){
                const data = res.data
                const entries = Object.entries(data)
                for(const [k,v] of entries) {
                    const d = k.split('.').reverse().join('.')
                    const c = new Currency({
                        date: new Date(d),
                        list: v,
                    })
                    val.push(c)
                }

                await Promise.all(
                    val.map(c => CurrencyController.create(ctx, c).catch(defaultHandleError))
                )
            }
        }
        return val.map(c => new Currency(c))
    }


}