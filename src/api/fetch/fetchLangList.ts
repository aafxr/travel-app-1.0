import {LangKeyType} from "../../contexts/LangContextProvider/LangType";
import aFetch from "../../axios";
import axios from "axios";
import {APIResponseType} from "./types/APIResponseType";
import {LangTranslateType} from "../../contexts/LangContextProvider";

export type APILangType = {
    [key: string]:  {
        description: string
        lang: LangTranslateType
    }
}


export async function fetchLangList(code?: LangKeyType){
    if(code){
        return await axios.post<APIResponseType<APILangType>>('/lang/list/', {code})
    }
    return await aFetch.get<APIResponseType<APILangType>>('/lang/list/')
}