import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {SectionController} from "../../core/service-controllers/SectionController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useLimitContext} from "../../contexts/LimitContextProvider";
import {useAppContext} from "../../contexts/AppContextProvider";
import {Expense, Limit, Section} from "../../core/classes";
import formatTime from "../../utils/date-utils/formatTime";
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
    const navigate = useNavigate()
    const location = useLocation()
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


    function handleEditeExpense(expense: Expense){
        const url = location.pathname + `add/${expense.id}/`
        navigate(url)
    }


    console.log(expenses,state, sectionID)
    return (
        <div className='expenses'>
            <div className='expense-section'>
                <div className='expense-section-main'>
                    <div className='expense-section-name'>{state?.section?.title}</div>
                    <div className='expense-section-total'>{state?.total}</div>
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
            <div className='expenses-list'>
                {expenses.map(e => (
                    <div key={e.id} className='expense-item' onClick={() => handleEditeExpense(e)}>
                        <div className='flex-between'>
                            <div className='expense-title'>{e.title}</div>
                            <div className='expense-value'>{e.value}</div>
                        </div>
                        <div className='expense-date'>{formatTime('hh:mm DD.MM',e.created_at)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}