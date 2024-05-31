import {createContext, PropsWithChildren, useContext, useEffect} from "react";
import {defaultLangContextValue} from "./defaultLangContextValue";
import {useUser} from "../../hooks/redux-hooks";

export type LangContextType = typeof defaultLangContextValue

export const LangContext = createContext<LangContextType>(defaultLangContextValue)


export function LangContextProvider({children}: PropsWithChildren){
    const context = useContext(LangContext)
    const {user} = useUser()


    useEffect(() => {
        if(!user) return
        // download localization
    }, [user]);


    return (
        <LangContext.Provider value={context}>
            {children}
        </LangContext.Provider>
    )
}