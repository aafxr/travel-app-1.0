import aFetch from "../../axios";
import {Section} from "../../core/classes";

type SectionAPIResponse = {
    ok: boolean
    data: Section[]
}

export async function fetchSections() {
    const response = (await aFetch<SectionAPIResponse>('/expenses/getSections/')).data
    if (response.ok) {
        return response.data.map(s => new Section(s))
    }
    return []
}