import {CurrencyType} from "../../../types/CurrencyType";

export class Currency{
    date: Date
    list: CurrencyType[]

    constructor(c: Currency) {
        this.date = c.date
        this.list = c.list
    }
}