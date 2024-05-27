import {CurrencyCodeTOSymbol, CurrencyType} from "../../../types/CurrencyType";
import {CURRENCY_CODE_LIST, CURRENCY_SYMBOL_LIST} from "../../../constants";
import {ValueOfType} from "../../../types/ValueOfType";

export class Currency{
    date: Date
    list: CurrencyType[]

    constructor(c: Currency) {
        this.date = c.date
        this.list = c.list
    }

    static getCurrencySymbolByCode(code: CurrencyType['char_code']){
        const res = CURRENCY_SYMBOL_LIST.find(s => s === CurrencyCodeTOSymbol[code])
        return res ? res : "₽" as ValueOfType<typeof CurrencyCodeTOSymbol>
    }

    static getCurrencyCodeBySymbol(sym: CurrencyType['symbol']){
        // @ts-ignore
        const res = CURRENCY_CODE_LIST.find(c => c === CurrencyCodeTOSymbol[sym])
        return res ? res : "RUB" as CurrencyType['char_code']
    }
}