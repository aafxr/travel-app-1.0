import aFetch from "../../axios";
import {CurrencyType} from "../../types/CurrencyType";

export type APIResponseCurrency = {
    ok: true
    data: Record<string, CurrencyType[]>
} | {
    ok: false
    message: string
}

export async function fetchCurrency(from?: Date, to?: Date): Promise<APIResponseCurrency | undefined> {
    const payload: any = {}
    if (from) payload.from = from.toISOString()
    if (to) payload.to = to.toISOString()

    const res = await aFetch.post<APIResponseCurrency>('/main/currency/getList/',payload)
    if (res.status === 200) {
        return res.data
    }
}
