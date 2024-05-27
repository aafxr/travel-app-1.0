import {ValueOfType} from "./ValueOfType";

export enum CurrencyCodeTOSymbol{
    'RUB' = '₽',
    'USD' = '$',
    'EUR' = '€',
    'CNY' = '¥',
    'KZT' = '₸',
}

export type CurrencyType = {
    char_code: keyof typeof CurrencyCodeTOSymbol
    mame: string
    num_code: number
    symbol: ValueOfType<typeof CurrencyCodeTOSymbol>
    value: number
}



