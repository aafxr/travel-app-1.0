import clsx from "clsx";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {ExpenseController, LimitController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, useCurrency} from "../../hooks/redux-hooks";
import {useLimitContext} from "../../contexts/LimitContextProvider";
import {Context, CurrencyConvertor, Expense, Limit, Section} from "../../core/classes";
import {SectionController} from "../../core/service-controllers";
import {useAppContext} from "../../contexts/AppContextProvider";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {removeExpense} from "../../redux/slices/expenses-slice";
import {Currency} from "../../core/classes/store/Currency";
import formatTime from "../../utils/date-utils/formatTime";
import Swipe from "../ui/Swipe/Swipe";
import {TrashIcon} from "../svg";

import './ExpenseSection.css'

export type ExpenseSectionPropsType = {
    sectionID: string
    expenses: Expense[]
    filterType: ExpenseFilterType
}


type SectionState = {
    limit?: Limit
    section?: Section
}


const formatter = Intl.NumberFormat(navigator.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

export function ExpenseSection({
                                   sectionID,
                                   expenses,
                                   filterType
                               }: ExpenseSectionPropsType) {
    const context = useAppContext()
    const {user} = context
    const {convertor} = useCurrency()
    const location = useLocation()
    const navigate = useNavigate()
    const limits = useLimitContext()
    const [state, setState] = useState<SectionState>()
    const dispatch = useAppDispatch()

    const filtered = useMemo(() => filteredExpenses(context, expenses, filterType), [expenses, filterType])
    const total = filtered.reduce((a, el) => a + (convertor.convert(context, el) || el.value), 0)
    const rest = state?.limit?.value ? state.limit.value - total : 0

    let restPercent = 0
    if (state && state.limit && state.limit.value) {
        restPercent = rest >= 0 ? total / state.limit.value : 1
        restPercent = Math.min(restPercent, 1)
    }

    const frontLineStyle = clsx('expense-section-line-front',{
        green: restPercent < 0.5,
        yellow:  0.5 > restPercent && restPercent < 0.8,
        red: restPercent > 0.8,
    })

    const restStyle = clsx('expense-section-rest',{ red: restPercent > 0.8 })


    useEffect(() => {
        const init = async () => {
            const s = await SectionController.read(context, sectionID)
            setState({section: s})
        }
        init().catch(defaultHandleError)
    }, []);


    useEffect(() => {
        const user = context.user
        const travel = context.travel
        if (!user || !travel) return
        const limitID = filterType === "personal"
            ? Limit.getPersonalLimitID(user.id, sectionID, travel.id)
            : Limit.getCommonLimitID(sectionID, travel.id)
        LimitController.read(context, limitID)
            .then(limit => setState(prev => prev ? {...prev, limit} : {limit}))
            .catch(defaultHandleError)
        const l = limits[limitID]
        setState(prev => prev ? {...prev, limit: l} : {limit: l})
    }, [filterType]);


    function handleEditeExpense(expense: Expense) {
        const url = location.pathname + `add/${expense.id}/`
        navigate(url)
    }


    function handleLimitEditeClick() {
        const travel = context.travel
        if (!travel) return
        navigate(`/travel/${travel.id}/limit/add/${sectionID}/`)
    }

    function handleRemoveExpense(e: Expense){
        ExpenseController.delete(context, e)
            .then(() => dispatch(removeExpense(e)))
            .catch(defaultHandleError)
    }


    return (
        <div className='expenses'>
            <div className='expense-section'>
                <div className='expense-section-main' onClick={handleLimitEditeClick}>
                    <div className='expense-section-name'>{state?.section?.title}</div>
                    <div className='expense-section-total'>
                        {state ? `${formatter.format(total)} ${user ? Currency.getSymbolByCode(user.settings.currency) : ''}` : ''}
                    </div>
                </div>
                {state?.limit
                    && <div className='expense-section-line'>
                        <div className={frontLineStyle} style={{width: `calc(${restPercent * 100}%)`}}/>
                    </div>
                }
                {state?.limit && (
                    <div className='expense-section-secondary'>
                        <div className='expense-section-limit'>Лимит:&nbsp;{state.limit.value}</div>
                        <div className={restStyle}>Осталось:&nbsp;{rest}</div>
                    </div>
                )
                }
            </div>
            <div className='expenses-list'>
                {filtered.map(e => (
                    <Swipe key={e.id} rightElement={
                        <div className='h-full center' onClick={() => handleRemoveExpense(e)}>
                            <TrashIcon className='icon'/>
                        </div>}
                    >
                        <div key={e.id} className='expense-item' onClick={() => handleEditeExpense(e)}>
                            <div className='flex-between'>
                                <div className='expense-title'>{e.title}</div>
                                <div className='expense-value'>
                                    <div className='origin'>{`${formatter.format(e.value)} ${Currency.getSymbolByCode(e.currency)}`}</div>
                                    {!!user &&
                                        <div className='converted'>{formatter.format(convertor.convert(context, e))}&nbsp;{Currency.getSymbolByCode(user.settings.currency)}</div>
                                    }
                                </div>
                            </div>
                            <div className='expense-date'>{formatTime('hh:mm DD.MM', e.created_at)}</div>
                        </div>
                    </Swipe>
                ))}
            </div>
        </div>
    )
}


function filteredExpenses(context: Context, expenses: Expense[], type: ExpenseFilterType) {
    if (type === 'all') return expenses

    return expenses.filter(e => {
        if (type === 'common') return Expense.isCommon(e)
        else if (type === 'personal' && context.user) return Expense.isPersonal(e, context.user.id)
        return false
    })
}