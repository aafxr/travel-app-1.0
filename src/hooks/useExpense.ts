import {useEffect, useState} from "react";

import defaultHandleError from "../utils/error-handlers/defaultHandleError";
import {ExpenseVariantType} from "../types/ExpenseVariantType";
import {ExpenseController} from "../core/service-controllers";
import {useAppContext} from "../contexts/AppContextProvider";
import {Expense} from "../core/classes";

export function useExpense(travelID: string, type: ExpenseVariantType){
    const context = useAppContext()
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [expensesLoading, setExpensesLoading] = useState(true)


    useEffect(() => {
        ExpenseController.readByTravelID(context, travelID)
            .then(e => setExpenses(e.filter(el => el.variant === type)))
            .catch(defaultHandleError)
            .finally(() => setExpensesLoading(false))
    }, [travelID, type])

    return {expenses, expensesLoading}
}