import aFetch from "../../axios";

export type APICurrencyType = {
    char_code: string
    num_code: number
    name: string
    value: number
    symbol: string
}

export type APIResponseCurrency = {
    ok: true
    data: Record<string, APICurrencyType[]>
} | {
    ok: false
    message: string
}

export async function fetchCurrency(from?: Date, to?: Date): Promise<APIResponseCurrency | undefined> {
    const payload: any = {}
    if (from) payload.from = from.toISOString()
    if (to) payload.from = to.toISOString()

    const res = await aFetch.post<APIResponseCurrency>(payload)
    if (res.status === 200) {
        return res.data
    }
}
