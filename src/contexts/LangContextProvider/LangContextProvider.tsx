import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {defaultLangContextValue} from "./defaultLangContextValue";
import {useUser} from "../../hooks/redux-hooks";
import {LangKeyType, LangValueType} from "./LangType";
import {LangController} from "../../core/service-controllers/LangController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";

export type LangTranslateType = typeof defaultLangContextValue


export type LangContextType = {
    langs: Partial<Record<LangKeyType, LangTranslateType>>
    codes: LangKeyType[]
    descriptions: LangValueType[]
    loading: boolean
}


const defaultState: LangContextType = {
    langs: {},
    codes: [],
    descriptions: [],
    loading: false
}


export const LangContext = createContext(defaultLangContextValue)


export function LangContextProvider({children}: PropsWithChildren) {
    const {user} = useUser()
    const [state, setState] = useState<LangContextType>(defaultState)
    const [lang, setLang] = useState(defaultLangContextValue)


    useEffect(() => {
        if (!user) return
        console.log(user.settings.lang)
        setState(p => ({...p, loading: true}))
        LangController.getLangList()
            .then((r) => {
                setState({...r, loading: false})
                if (r.langs[user.settings.lang]) {
                    setLang(r.langs[user.settings.lang]!)
                }
            })
            .catch(defaultHandleError)
            .finally(() => setState(p => ({...p, loading: false})))
    }, [user]);

    console.log(lang)
    return (
        <LangContext.Provider value={lang}>
            {children}
        </LangContext.Provider>
    )
}