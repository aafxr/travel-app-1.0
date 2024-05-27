import {CurrencyType} from "../types/CurrencyType";

export function currencyFormatter(currency: CurrencyType['char_code'] = 'RUB'){
    return Intl.NumberFormat('ru-RU', {
        maximumSignificantDigits: 3,
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
        style: "currency",
        currency: currency
    })
}