import {useEffect, useState} from "react";

import {SectionController} from "../../core/service-controllers/SectionController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useLimitContext} from "../../contexts/LimitContextProvider";
import {useAppContext} from "../../contexts/AppContextProvider";
import {Expense, Limit, Section} from "../../core/classes";
import {useExpenseFilterType} from "../../hooks";

import './ExpenseSection.css'

export type ExpenseSectionPropsType = {
    sectionID: string
    expenses: Expense[]
}


type SectionState = {
    limit?: Limit
    section?: Section
    total: number
}

export function ExpenseSection({
                                   sectionID,
                                   expenses
                               }: ExpenseSectionPropsType) {
    const context = useAppContext()
    const limits = useLimitContext()
    const [state, setState] = useState<SectionState>()
    const {type} = useExpenseFilterType()


    useEffect(() => {

        const init = async () => {
            const user = context.user
            const travel = context.travel
            if (!user || !travel) return

            const limitID = type === "personal"
                ? Limit.getPersonalLimitID(user.id, sectionID, travel.id)
                : Limit.getCommonLimitID(sectionID, travel.id)
            const l = limits[limitID]
            const s = await SectionController.read(context, sectionID)
            const t = expenses.reduce((a, el) => a + el.value, 0)
            setState({limit: l, section: s, total: t})
        }
        init().catch(defaultHandleError)

    }, []);


    return (
        <div className='expenses'>
            <div className='expense-section'>
                <div className='expense-section-main'>
                    <div className='expense-section-name'>{state?.section?.title}</div>
                    <div className='expense-section-total'>{state?.limit?.value}</div>
                </div>
                {state?.limit && <div className='expense-section-line'/>}
                {state?.limit && (
                    <div className='expense-section-secondary'>
                        <div className='expense-section-limit'>{state.limit.value}</div>
                        <div className='expense-section-rest'>{state.total - state.limit.value}</div>
                    </div>
                )
                }
            </div>
        </div>
    )
}