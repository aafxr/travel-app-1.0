import {useAppSelector} from "./useAppSelector";
import {loadExpenses, addExpense, removeExpense} from "../../redux/slices/expenses-slice";

export function useExpenses(){
    const {expenses, loading, error} = useAppSelector(state => state.expenses)
    return {expenses, loading, error, actions: loadExpenses, addExpense, removeExpense}
}