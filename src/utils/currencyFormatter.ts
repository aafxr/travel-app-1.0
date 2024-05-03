export function currencyFormatter(currency: string = 'RUB'){
    return Intl.NumberFormat('ru-RU', {
        maximumSignificantDigits: 3,
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
        style: "currency",
        currency: currency
    })
}