import {useEffect, useState} from "react";
import {ExpenseFilterType} from "../types/ExpenseFilterType";
import {EXPENSE_FILTER_tYPE} from "../constants";




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