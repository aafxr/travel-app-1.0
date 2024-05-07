import {useMemo} from "react";
import {useExpenses} from "./useExpenses";
import {StoreName} from "../../types/StoreName";

export function useExpensesPlan() {
    const {expenses, ...rest} = useExpenses()
    const filtered = useMemo(() => expenses.filter(e => e.variant === StoreName.EXPENSES_PLAN), [expenses])
    return {...rest, expenses: filtered}
}