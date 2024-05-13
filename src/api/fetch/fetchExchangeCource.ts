import aFetch from "../../axios";
import {CurrencyType} from "../../types/CurrencyType";
import {Currency} from "../../core/classes/store/Currency";

type APICurrencyType = {
    ok: true,
    data:{
        [key:string]: CurrencyType[]
    }
} | {
    ok: false
    message: string
}


export async function fetchExchangeCourse(start: Date, end: Date): Promise<Currency[]> {
    const payload = {
        date_start: start.toLocaleDateString(),
        date_end: end.toLocaleDateString()
    }
    const response = await aFetch.post<APICurrencyType>('/main/currency/getList/', payload)
    const responseData = response.data
    if(responseData.ok){
        const data = responseData.data
        return Object.entries(data).map(([key, val]) => {
            const [dd, mm, yy] = key.split('.')
            const date: Date = new Date(+yy, +mm, +dd)
            const list = val
            return new Currency({date, list})
        })
    }
    return []
}