import {useMemo} from "react";
import {useExpenses} from "./useExpenses";
import {StoreName} from "../../types/StoreName";

export function useExpensesActual(){
    const {expenses, ...rest} = useExpenses()
    const filtered = useMemo(() => expenses.filter(e => e.variant === StoreName.EXPENSES_ACTUAL), [expenses])
    return {...rest, expenses: filtered}
}