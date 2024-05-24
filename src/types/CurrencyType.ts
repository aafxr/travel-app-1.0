export type CurrencyType = {
    char_code: keyof typeof CurrencyCodeTOSymbol
    mame: string
    num_code: number
    symbol: string
    value: number
}


export enum CurrencyCodeTOSymbol{
    'RUB' = '₽',
    'USD' = '$',
    'EUR' = '€',
    'CNY' = '¥',
    'KZT' = '₸',
}