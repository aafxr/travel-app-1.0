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


    useEffect(() => {
        if (!user) return
        setState(p => ({...p, loading: true}))
        LangController.getLangList()
            .then((r) => setState({...r, loading: false}))
            .catch(defaultHandleError)
            .finally(() => setState({...state, loading: false}))
    }, [user]);


    let lang: LangTranslateType = defaultLangContextValue

    return (
        <LangContext.Provider value={state.langs[]}>
            {children}
        </LangContext.Provider>
    )
}