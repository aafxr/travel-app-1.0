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

    static getSymbolByCode(code: CurrencyType['char_code']){
        const res = CURRENCY_SYMBOL_LIST.find(s => s === CurrencyCodeTOSymbol[code])
        return res ? res : "₽" as ValueOfType<typeof CurrencyCodeTOSymbol>
    }

    static getCodeBySymbol(sym: CurrencyType['symbol']){
        // @ts-ignore
        const idx = CURRENCY_SYMBOL_LIST.findIndex(c => c === sym)
        return idx !== -1 ? CURRENCY_CODE_LIST[idx] : "RUB" as CurrencyType['char_code']
    }
}