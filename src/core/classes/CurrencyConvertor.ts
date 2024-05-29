import {Currency} from "./store/Currency";
import {Expense} from "./store";
import {Context} from "./Context";
import {CurrencyType} from "../../types/CurrencyType";

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
        if(!user) return 0
        const uc = user.settings.currency
        return this.convertByCode(uc, expense)
    }


    convertByCode(code: CurrencyType['char_code'], expense: Expense){
        if(code === expense.currency) return expense.value
        const dateKey = expense.created_at.toLocaleDateString()
        const c = this.data.get(dateKey)
        if(!c) return 0

        const selectedCode = c.list.find(e => e.char_code === code)
        const expenseCode = c.list.find(e => e.char_code === expense.currency)

        if(!selectedCode || !expenseCode) return expense.value


        const coef = selectedCode.value / expenseCode.value

        return expense.value * coef
    }


}