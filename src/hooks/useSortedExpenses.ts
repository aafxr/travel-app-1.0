import {useMemo} from "react";

import {Expense} from "../core/classes";
import {StoreName} from "../types/StoreName";




export type SortedExpensesType = {
    actual: Record<string, Expense[]>,
    plan: Record<string, Expense[]>
}


export function useSortedExpenses(expenses: Expense[]){
    return useMemo(() => {
        const sorted: SortedExpensesType = {
            actual: {},
            plan: {}
        }

        for(const e of expenses){
            if(e.variant === StoreName.EXPENSES_ACTUAL){
                if(!sorted.actual[e.section_id]) sorted.actual[e.section_id] = []
                sorted.actual[e.section_id].push(e)
            } else{
                if(!sorted.plan[e.section_id]) sorted.plan[e.section_id] = []
                sorted.plan[e.section_id].push(e)
            }
        }
        return sorted
    }, [expenses])
}
