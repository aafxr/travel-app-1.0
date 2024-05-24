import {Currency} from "./store/Currency";
import {Expense} from "./store";
import {Context} from "./Context";

export class CurrencyConvertor {
    data: Map<string, Currency>;

    constructor(data: Currency[]) {
        this.data = new Map()
        for (const el of data) {
            const key = new Date(el.date).toLocaleDateString()
            this.data.set(key, el)
        }
    }

    convert(ctx: Context, expense: Expense ){
        const user = ctx.user
        if(!user) return

        const uc = user.settings.currency
        const ec = expense.currency

        if(uc === ec) return expense.value

        const dateKey = expense.datetime.toLocaleDateString()
        const c = this.data.get(dateKey)
        if(!c) return

        const uk = c.list.find(e => e.char_code === uc)
        const ek = c.list.find(e => e.char_code === ec)

        if(!uk || !ek) return


        const coef = uk.value / ek.value

        return expense.value * coef
    }
}