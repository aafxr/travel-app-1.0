import {useMemo} from "react";
import {useExpenses} from "./useExpenses";
import {StoreName} from "../../types/StoreName";

export function useExpensesPlan() {
    const expenses = useExpenses()
    return useMemo(() => expenses.filter(e => e.variant === StoreName.EXPENSES_PLAN), [expenses])
}