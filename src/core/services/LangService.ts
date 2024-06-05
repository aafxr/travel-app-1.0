import {defaultLangContextValue} from "../../contexts/LangContextProvider/defaultLangContextValue";
import {LangKeyType, LangValueType} from "../../contexts/LangContextProvider/LangType";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {LangTranslateType} from "../../contexts/LangContextProvider";
import {fetchLangList} from "../../api/fetch";
import {LANG} from "../../constants";
import {DB} from "../db/DB";

export class LangService {
    static async getLangList() {
        let langs: Record<string, LangTranslateType> | undefined
        let codes: LangKeyType[] = []
        let codeDescription: LangValueType[] = []

        try {
            const res = await fetchLangList().catch(defaultHandleError)
            if (res && res.status === 200 && res.data.ok) {
                langs = {}
                const d = res.data.data
                codes = Object.keys(d) as LangKeyType[]
                for (const k of codes) {
                    const {lang, description} = d[k]
                    langs[k] = lang
                    codeDescription.push(description as LangValueType)
                }
                DB.setStoreItem(LANG, langs).catch(defaultHandleError)
            }
        } catch (e) {
            defaultHandleError(e as Error)
        }

        if (!langs) {
            langs = await DB.getStoreItem<Record<string, LangTranslateType>>(LANG)
        }

        if (!langs) {
            langs = {'rus': defaultLangContextValue}
            codes = ['rus']
            codeDescription = ["(rus) Русский"]
        }

        return {langs, codes, descriptions: codeDescription}
    }
}