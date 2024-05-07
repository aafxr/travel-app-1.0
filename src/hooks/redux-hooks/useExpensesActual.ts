import {useMemo} from "react";
import {useExpenses} from "./useExpenses";
import {StoreName} from "../../types/StoreName";

export function useExpensesActual(){
    const expenses = useExpenses()
    return useMemo(() => expenses.filter(e => e.variant === StoreName.EXPENSES_ACTUAL), [expenses])
}