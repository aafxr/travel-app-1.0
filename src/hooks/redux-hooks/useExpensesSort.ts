import {Expense} from "../../core/classes";
import {useMemo} from "react";

export function useExpensesSort(expenses: Expense[]){
    return useMemo(() => {
        const sorted: Record<string, Expense[]> = {}
        expenses.forEach(e => {
            if(!sorted[e.section_id]) sorted[e.section_id] = []
            sorted[e.section_id].push(e)
        })
        return sorted
    }, [expenses])
}