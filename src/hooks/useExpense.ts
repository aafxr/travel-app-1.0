import {filter} from "rxjs";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import defaultHandleError from "../utils/error-handlers/defaultHandleError";
import {useExpenseSubject} from "../contexts/SubjectContextProvider";
import {ExpenseController} from "../core/service-controllers";
import {useAppContext} from "../contexts/AppContextProvider";
import {Expense} from "../core/classes";

export function useExpense(travelID: string){
    const {travelCode} = useParams()
    const context = useAppContext()
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expensesLoading, setExpensesLoading] = useState(true)
    const expenseSubject = useExpenseSubject()


    useEffect(() => {
        ExpenseController.readByTravelID(context, travelID)
            .then(setExpenses)
            .catch(defaultHandleError)
            .finally(() => setExpensesLoading(false))
    }, [travelID])


    useEffect(() => {
        const subscription = expenseSubject
            .pipe(filter( e=> e.primary_entity_id === travelCode))
            .subscribe((expense) => {
            const idx = expenses.findIndex(e => e.id  === expense.id)
            if(idx !== -1 ){
                const el = [...expenses]
                el[idx] = expense
                setExpenses(el)
            }else {
                setExpenses([...expenses, expense])
            }
        })
        return () => {subscription.unsubscribe()}
    }, []);


    return {expenses, expensesLoading}
}