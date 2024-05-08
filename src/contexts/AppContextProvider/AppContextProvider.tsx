import {createContext, PropsWithChildren, useContext} from "react";
import {useUser} from "../../hooks/redux-hooks/useUser";
import {useTravel} from "../../hooks/redux-hooks";
import {Context} from "../../core/classes";


type AppContextType = Context

const defaultContext: AppContextType =  new Context()

export const AppContext = createContext<AppContextType>(defaultContext)


export function AppContextProvider({children}: PropsWithChildren) {
    const context = useContext(AppContext)

    const {user} = useUser()
    const {travel} = useTravel()

    context.setUser(user)
    context.setTravel(travel)

    window.context = context

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}
