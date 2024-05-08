import {useExpensesSort} from "./useExpensesSort";
import {useExpensesPlan} from "./useExpensesPlan";

export  function useExpensesPlanSorted(){
    const {expenses, ...rest} = useExpensesPlan()
    const sorted = useExpensesSort(expenses)
    return {...rest, sortedExpenses: sorted }
}