import {useExpensesActual} from "./useExpensesActual";
import {useExpensesSort} from "./useExpensesSort";

export function useExpensesActualSorted(){
    const {expenses, ...rest} = useExpensesActual()
    const sorted = useExpensesSort(expenses)
    return {...rest, sortedExpenses: sorted }
}