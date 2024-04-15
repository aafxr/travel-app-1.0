import {Subject} from "rxjs";
import {Action, Expense, Hotel, Limit, Member, Place, Travel, User} from "../../core/classes";
import {createContext, PropsWithChildren, useContext} from "react";

type SubjectContextType = {
    s_travel: Subject<Travel>
    s_user: Subject<User>
    s_member: Subject<Member>
    s_expense: Subject<Expense>
    s_limit: Subject<Limit>
    s_action: Subject<Action<any>>
    s_place: Subject<Place>
    s_hotel: Subject<Hotel>
}

const s_defaultSubject: SubjectContextType = {
    s_travel: new Subject(),
    s_user: new Subject(),
    s_member: new Subject(),
    s_expense: new Subject(),
    s_limit: new Subject(),
    s_action: new Subject(),
    s_place: new Subject(),
    s_hotel: new Subject(),
}


export const SubjectContext = createContext<SubjectContextType>(s_defaultSubject)


export function SubjectContextProvider({children}: PropsWithChildren){
    const context = useContext(SubjectContext)

    return (
        <SubjectContext.Provider value={context}>
            {children}
        </SubjectContext.Provider>
    )
}