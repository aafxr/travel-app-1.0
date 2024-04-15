import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Context} from "../../core/classes";


type AppContextType = { context: Context }

const defaultContext: AppContextType = {context: new Context()}

export const AppContext = createContext<AppContextType>(defaultContext)


export function AppContextProvider({children}: PropsWithChildren) {
    const context = useContext(AppContext)
    const [state, setContext] = useState<AppContextType | null>(null)

    useEffect(() => {
        const ctx = new Context()
        const unsubscribe = ctx.subscribe('update', (ctx) => {
            setContext({context:ctx})
        })
        setContext({context: ctx})
        return () => unsubscribe()
    }, [])


    if(state) window.context = state.context

    return (
        <AppContext.Provider value={state || context}>
            {children}
        </AppContext.Provider>
    )
}
