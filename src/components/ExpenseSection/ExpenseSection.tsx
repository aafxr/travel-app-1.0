import clsx from "clsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppDispatch, useCurrency, useLimits} from "../../hooks/redux-hooks";
import {Context, Expense, Limit, Section} from "../../core/classes";
import {ExpenseController} from "../../core/service-controllers";
import {SectionController} from "../../core/service-controllers";
import {useAppContext} from "../../contexts/AppContextProvider";
import {ExpenseFilterType} from "../../types/ExpenseFilterType";
import {removeExpense} from "../../redux/slices/expenses-slice";
import {Currency} from "../../core/classes/store/Currency";
import formatTime from "../../utils/date-utils/formatTime";
import Swipe from "../ui/Swipe/Swipe";
import {ChevronRightIcon, TrashIcon} from "../svg";

import './ExpenseSection.css'

export type ExpenseSectionPropsType = {
    sectionID: string
    expenses: Expense[]
    filterType: ExpenseFilterType
}


type SectionState = {
    limit?: Limit
    section?: Section
    total?: number
    rest?: number
    restPercent?: number
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
    const dispatch = useAppDispatch()
    const context = useAppContext()
    const {user} = context
    const {convertor} = useCurrency()
    const location = useLocation()
    const navigate = useNavigate()
    const {limits} = useLimits()
    const [state, setState] = useState<SectionState>({})
    const [collapsed, setCollapsed] = useState(false)
    const expensesListRef = useRef <HTMLDivElement>(null)

    const filtered = useMemo(() => filteredExpenses(context, expenses, filterType), [expenses, filterType])


    useEffect(() => {
        const el = expensesListRef.current
        if(!el) return
        if (collapsed){
            el.style.maxHeight = 0 + 'px'
        }else{
            el.style.maxHeight = el.scrollHeight + 'px'
        }
    }, [])


    useEffect(() => {
        let {total, rest, limit, restPercent} = state
        total = filtered.reduce((a, el) => a + (convertor.convert(context, el) || el.value), 0)
        if (!limit) {
            setState(p => ({...p, total}))
            return
        }
        rest = filtered.reduce((a, el) => a + (convertor.convertByCode(limit!.currency, el)), 0)
        restPercent = 0
        if (rest !== undefined && limit.value) {
            restPercent = rest >= 0 ? rest / limit.value : 1
            restPercent = Math.min(restPercent, 1)
        }
        setState(p => ({...p, total, rest, restPercent}))
    }, [expenses, filterType, limits, convertor]);


    const frontLineStyle = (state.restPercent && filterType !== "all")
        ? clsx('expense-section-line-front', {
            green: state.restPercent < 0.5,
            yellow: 0.5 < state.restPercent && state.restPercent < 0.8,
            red: state.restPercent > 0.8,
        })
        : 'expense-section-line-front'


    const restStyle = filterType !== "all"
        ? clsx('expense-section-rest', {red: (state.restPercent || 0) > 0.8})
        : 'expense-section-rest'


    useEffect(() => {
        const init = async () => {
            const s = await SectionController.read(context, sectionID)
            setState(p => ({...p, section: s}))
        }
        init().catch(defaultHandleError)
    }, []);


    useEffect(() => {
        const user = context.user
        const travel = context.travel
        if (!user || !travel || !limits.length) return
        const limitID = filterType === "personal"
            ? Limit.getPersonalLimitID(user.id, sectionID, travel.id)
            : Limit.getCommonLimitID(sectionID, travel.id)

        const l = limits.find(l => l.id === limitID)
        if (l) setState(prev => prev ? {...prev, limit: l} : {limit: l})
    }, [limits, filterType]);


    function handleEditeExpense(expense: Expense) {
        const url = location.pathname + `add/${expense.id}/`
        navigate(url)
    }


    function handleLimitEditeClick() {
        const travel = context.travel
        if (!travel) return
        navigate(`/travel/${travel.id}/limit/add/${sectionID}/`)
    }


    function handleRemoveExpense(e: Expense) {
        ExpenseController.delete(context, e)
            .then(() => dispatch(removeExpense(e)))
            .catch(defaultHandleError)
    }


    function handleCollapseClick(){
        const el = expensesListRef.current
        if(!el) return
        if (collapsed){
            el.style.maxHeight = el.scrollHeight + 'px'
            setCollapsed(false)
        }else{
            el.style.maxHeight = 0 + 'px'
            setCollapsed(true)
        }
    }


    return (
        <div className='expenses block'>
            <div className='expense-section'>
                <div className='expense-section-main' onClick={handleLimitEditeClick}>
                    <div className='expense-section-name'>{state?.section?.title}</div>
                    <div className='expense-section-total'>
                        {state ? `${formatter.format(state.total || 0)} ${user ? Currency.getSymbolByCode(user.settings.currency) : ''}` : ''}
                    </div>
                </div>
                {state?.limit && (
                    <div className='expense-section-line'>
                        <div className={frontLineStyle} style={{width: `calc(${(state.restPercent || 0) * 100}%)`}}/>
                    </div>
                )}
                {state?.limit && (
                    <div className='expense-section-secondary'>
                        <div
                            className='expense-section-limit'>Лимит:&nbsp;{`${state.limit.value} ${Currency.getSymbolByCode(state.limit.currency)}`}</div>
                        {state.rest !== undefined && (
                            <div
                                className={restStyle}>
                                Осталось:&nbsp;{`${formatter.format(state.limit.value - state.rest)} ${Currency.getSymbolByCode(state.limit.currency)}`}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div ref={expensesListRef} className={'expenses-list'}>
                {filtered.map(e => (
                    <Swipe key={e.id} rightElement={
                        <div className='h-full center' onClick={() => handleRemoveExpense(e)}>
                            <TrashIcon className='icon'/>
                        </div>}
                    >
                        <div key={e.id} className='expense-item' onClick={() => handleEditeExpense(e)}>
                            <div className='flex-between'>
                                <div>
                                    <div className='expense-title'>{e.title}</div>
                                    <div className='expense-date'>{formatTime('hh:mm DD.MM', e.created_at)}</div>
                                </div>
                                <div className='expense-value'>
                                    <div
                                        className='origin'>{`${formatter.format(e.value)} ${Currency.getSymbolByCode(e.currency)}`}</div>
                                    {!!user &&
                                        <div
                                            className='converted'>{formatter.format(convertor.convert(context, e))}&nbsp;{Currency.getSymbolByCode(user.settings.currency)}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Swipe>
                ))}
            </div>
            <div
                className={clsx('collapse-btn', {collapsed})}
                onClick={handleCollapseClick}
            >
                <ChevronRightIcon className='icon' />
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