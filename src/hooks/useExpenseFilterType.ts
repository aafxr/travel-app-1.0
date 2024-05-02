import {useEffect, useState} from "react";
import {ExpenseFilterType} from "../types/ExpenseFilterType";

const EXPENSE_FILTER_tYPE = 'expense_filter_type'


/**
 * фильтр расходов по принадлежности:
 * - персональный
 * - общий
 * - все
 */
export function useExpenseFilterType(){
    const [type, setType] = useState<ExpenseFilterType>('all')


    useEffect(() => {
        const et = localStorage.getItem(EXPENSE_FILTER_tYPE)
        if(et) setType(et as ExpenseFilterType)
    }, [])


    const setExpenseType = (type: ExpenseFilterType) => {
        localStorage.setItem(EXPENSE_FILTER_tYPE, type)
        setType(type)
    }


    return {type, setExpenseType}
}